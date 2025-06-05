import escapeRegExp from "lodash.escaperegexp";
import type { PrismEnv, SyntaxModContext } from "../mod.ts";
import type { SyntaxHighlightModSettings } from "./highlight-settings.ts";
import { type SyntaxModAttributes, getAttributes } from "../parser.ts";
import { newIcon, splitLines, splitList, splitRanges } from "../../utils.ts";

// The text highlight mod must run before highlighting, specifically before the markup mod, which runs on the
// before-highlight hook. Therefore, it runs as a preprocessor that adds `<match>` elements prior to invoking Prism
// highlighting. The markup mod ensures that those elements are not removed after highlighting.
export function preProcessHook(env: PrismEnv, ctx: SyntaxModContext) {
  const settings = ctx.mod.settings as SyntaxHighlightModSettings;
  const source = env.el.innerHTML;

  function getParams(attributes: SyntaxModAttributes) {
    const values: Record<string, { value: RegExp; lines: number[] }[]> = {};

    attributes.forEach((attribute) => {
      const value = attribute.value.match(/^([\d\-,]+)?\/(.+)\/([gdsimy]{0,6}?)$/);
      if (!value) return;
      let pattern = value[2];

      if (settings.options.escape) {
        pattern = pattern
          .replace(/&/g, "(&|&amp;)")
          .replace(/</g, "(<|&lt;)")
          .replace(/>/g, "(>|&gt;)")
          .replace(/"/g, '("|&quot;)')
          .replace(/'/g, "('|&apos;)");
      }

      let regexp;
      try {
        regexp = new RegExp(`(${pattern})`, value[3]);
      } catch (_error) {
        try {
          regexp = new RegExp(`(${escapeRegExp(pattern)})`, value[3]);
        } catch (_error) {
          return;
        }
      }

      const param = splitList(attribute.params || "gray").shift();
      if (!param) return;
      if (!values[param]) values[param] = [];
      values[param].push({ value: regexp, lines: value[1] ? splitRanges(value[1]) : [] });
    });

    return values;
  }

  let matched = false;
  let sourceLines = splitLines(source);

  Object.entries(getParams(getAttributes(env.attributes, ctx.mod))).forEach(([param, patterns]) => {
    patterns.forEach((pattern) => {
      const { value, lines } = pattern;

      sourceLines = sourceLines.map((line, index) => {
        if (lines.length && !lines.includes(index + 1)) return line;
        const [style, icon] = splitList(param, ":");

        // When multiple patterns are defined, there can be intersecting matches. Specifically, a <match> element added
        // early could match later on, which would result in broken HTML. It also does not make sense to support
        // overlapping highlights, as they could cause confusion. For these reasons, and possibly due to unknown edge
        // cases, only one pattern can match the same indices.
        const regexp = new RegExp(`(?<!<match[^>]*?>[^<>]{0,})${value.source}(?![^<>]{0,}</match>)`, value.flags);

        return line.replace(regexp, (value) => {
          matched = true;
          const matchEl = document.createElement("match");
          matchEl.className = `match-${style}`;
          if (icon) matchEl.dataset.icon = icon;
          matchEl.innerHTML = value;
          return matchEl.outerHTML;
        });
      });
    });
  });

  if (matched) env.el.innerHTML = sourceLines.join("\n");
}

export function postProcessHook(env: PrismEnv) {
  env.el.findAll("match[data-icon]").forEach((matchEl) => {
    if (matchEl.dataset.icon) matchEl.innerHTML = `${newIcon(matchEl.dataset.icon).outerHTML}${matchEl.innerHTML}`;
  });
}

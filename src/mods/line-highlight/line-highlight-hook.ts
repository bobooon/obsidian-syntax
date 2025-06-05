import type { PrismEnv, SyntaxModContext } from "../mod.ts";
import { type SyntaxModAttributes, getAttributes } from "../parser.ts";
import { splitList, splitRanges } from "../../utils.ts";
import { addIcon } from "../line/line.ts";

export default function completeHook(env: PrismEnv, ctx: SyntaxModContext) {
  function getParams(attributes: SyntaxModAttributes) {
    const values: Record<string, number[]> = {};

    attributes.forEach((attribute) => {
      if (!attribute.params) attribute.params = "gray";

      splitList(attribute.params).forEach((param) => {
        const ranges = splitRanges(attribute.value);
        if (!ranges.length) return;
        if (!values[param]) values[param] = [];
        values[param].push(...ranges);
      });
    });

    return values;
  }

  Object.entries(getParams(getAttributes(env.attributes, ctx.mod))).forEach(([param, lines]) => {
    const [style, icon] = splitList(param, ":");

    lines.forEach((line) => {
      const lineEl = env.el.find(`.line:nth-child(${line})`);
      if (!lineEl) return;
      lineEl.addClass(`highlight-${style}`);

      // Use one of the built-in styles or any custom combination of color and icon.
      if (["ntc", "wrn", "err"].includes(style)) addIcon(lineEl, "triangle-alert");
      else if (style === "ins") addIcon(lineEl, "diff");
      else if (style === "del") addIcon(lineEl, "x");
      else if (style === "chg") addIcon(lineEl, "pencil");
      else if (icon) addIcon(lineEl, icon);
    });
  });
}

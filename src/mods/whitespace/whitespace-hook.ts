import type { PrismEnv, SyntaxModContext } from "../mod.ts";
import { type SyntaxWhitespaceModSettings } from "./whitespace-settings.ts";

export function beforeHighlightHook(env: PrismEnv, ctx: SyntaxModContext) {
  function processToken(tokens: any, name: any) {
    const value = tokens[name];

    switch (ctx.plugin.prism.util.type(value)) {
      case "Array":
        for (let i = 0; i < value.length; i++) processToken(value, i);
        break;

      case "RegExp":
        tokens[name] = { pattern: value, inside: {} };
        addGrammars(tokens[name].inside);
        break;

      default:
        addGrammars(value.inside || (value.inside = {}));
        break;
    }
  }

  function addGrammars(grammar: any) {
    if (!grammar || grammar.space || grammar.tab) return;

    grammar.space = / /;
    grammar.tab = /\t/;

    Object.keys(grammar).forEach((name) => {
      if (!grammar.hasOwnProperty(name) || ["space", "tab"].includes(name)) return;
      if (name === "rest") addGrammars(grammar.rest);
      else processToken(grammar, name);
    });
  }

  if (env.grammar) addGrammars(env.grammar);
}

export function postProcessHook(env: PrismEnv, ctx: SyntaxModContext) {
  const settings = ctx.mod.settings as SyntaxWhitespaceModSettings;

  const processToken = (el: HTMLElement) => {
    if (el.nodeType !== Node.ELEMENT_NODE || (!el.hasClass("space") && !el.hasClass("tab"))) return false;
    return el.hasClass("space") || el.hasClass("tab");
  };

  env.el.findAll(".line-middle").forEach((lineEl) => {
    for (let i = 0; i <= lineEl.childNodes.length - 1; i++) {
      const tokenEl = lineEl.childNodes[i] as HTMLElement;
      if (!processToken(tokenEl)) break;
      tokenEl.addClass("start");
    }

    for (let i = lineEl.childNodes.length - 1; i >= 0; i--) {
      const tokenEl = lineEl.childNodes[i] as HTMLElement;
      if (!processToken(tokenEl)) break;
      tokenEl.addClass("end");
    }
  });

  const keys: string[] = [];
  if (settings.options.start) keys.push("start");
  if (settings.options.middle) keys.push("middle");
  if (settings.options.end) keys.push("end");
  if (keys.length) env.el.dataset.whitespace = keys.join(",");
}

export function unloadHook(env: PrismEnv) {
  if (env.grammar?.space) delete env.grammar.space;
  if (env.grammar?.tab) delete env.grammar.tab;
}

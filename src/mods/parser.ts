import type { SyntaxMod } from "./mod.ts";
import { mods } from "./manager.ts";
import { splitList } from "../utils.ts";

export type SyntaxModScope = "all" | "block" | "inline";
export type SyntaxModAttributes = { prefix: string; params: string; value: string }[];

export function getScope(el?: HTMLElement) {
  if (el) return el.hasClass("syntax-block") ? "block" : ("inline" as SyntaxModScope);
  return "all" as SyntaxModScope;
}

export function parseAttributes(meta: string, scope: SyntaxModScope) {
  const attributes: SyntaxModAttributes = [];

  if (scope === "inline") {
    if (meta) {
      attributes.push({
        prefix: "inline-code",
        params: "",
        value: splitList(meta, ":").join(":"),
      });
    }
    return attributes;
  }

  const prefixes: string[] = ["mod"];
  mods.forEach((mod) => prefixes.push(...[mod.id, ...mod.aliases]));

  Array.from(meta.matchAll(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g)).forEach((attribute) => {
    let [prefix, value] = attribute[0].split(/=(.+)/);
    let params = "";

    // Separate the prefix name from the parameters enclosed in brackets, leaving the parameters unparsed to allow
    // individual mods to implement their own parsing methods for flexibility.
    const matches = prefix.match(/^([\w-]+)(\[([\w\-!:]+)])$/m);
    if (matches) {
      prefix = String(matches[1]);
      params = String(matches[3]);
    }

    if (!prefixes.includes(prefix) || typeof value === "undefined") return;
    attributes.push({ prefix, params, value });
  });

  return attributes;
}

export function getAttributes(attributes: SyntaxModAttributes, mod: SyntaxMod | string) {
  const prefixes = [...(String.isString(mod) ? [mod] : [mod.id, ...mod.aliases])];
  return attributes.filter((attr) => prefixes.includes(attr.prefix));
}

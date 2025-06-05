import type { PrismEnv, SyntaxModContext } from "../mod.ts";
import type { SyntaxLineModSettings } from "./line-settings.ts";
import { splitLines } from "../../utils.ts";

export function addLine(content: string, cls: string = "") {
  return (
    `<span class="${["line", cls].join(" ").trim()}">` +
    `<span class="line-start"><span class="line-gutter"></span></span>` +
    `<span class="line-middle">${content}</span>` +
    `<span class="line-end"></span>` +
    `</span>`
  );
}
export function completeHook(env: PrismEnv, ctx: SyntaxModContext) {
  const settings = ctx.mod.settings as SyntaxLineModSettings;

  env.el.innerHTML = splitLines(env.el.innerHTML)
    .map((line: string) => addLine(line || " "))
    .join("");

  if (settings.options.sticky) env.el.dataset.lineSticky = "";
}

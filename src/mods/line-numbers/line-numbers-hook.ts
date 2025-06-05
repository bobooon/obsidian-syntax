import type { PrismEnv, SyntaxModContext } from "../mod.ts";
import { type SyntaxLineNumbersModSettings, defaultSettings } from "./line-numbers-settings.ts";

export default function postProcessHook(env: PrismEnv, ctx: SyntaxModContext) {
  const settings = structuredClone(ctx.mod.settings) as SyntaxLineNumbersModSettings;
  if (ctx.force) settings.options = defaultSettings.options;

  if (env.el.findAll(".line").length < settings.options.min) return;
  env.el.dataset.lineNumbers = "";
}

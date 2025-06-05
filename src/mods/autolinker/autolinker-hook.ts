import Autolinker from "autolinker";
import type { PrismEnv, SyntaxModContext } from "../mod.ts";
import { type SyntaxAutolinkerModSettings, defaultSettings } from "./autolinker-settings.ts";

export default function completeHook(env: PrismEnv, ctx: SyntaxModContext) {
  const settings = structuredClone(ctx.mod.settings) as SyntaxAutolinkerModSettings;
  if (ctx.force) settings.options = defaultSettings.options;

  env.el.findAll(".token.comment").forEach((comment: HTMLElement) => {
    comment.innerHTML = Autolinker.link(comment.innerHTML, { ...settings.options, ...{ stripPrefix: false } });
  });
}

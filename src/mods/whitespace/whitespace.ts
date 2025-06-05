import type { SyntaxMod } from "../mod.ts";
import { beforeHighlightHook, postProcessHook, unloadHook } from "./whitespace-hook.ts";
import { defaultCommands as commands } from "../commands.ts";
import settingTab, { defaultSettings as settings } from "./whitespace-settings.ts";
import "./whitespace.scss";

const SyntaxWhitespaceMod: SyntaxMod = {
  id: "whitespace",
  aliases: ["ws"],
  name: "Whitespace",
  description: "Display spaces and tabs as visible characters.",
  info: async () => (await import(`./whitespace.md?raw`)).default,
  scope: "all",
  hooks: ["before-highlight", "post-process"],
  run: (env, ctx) => {
    if (ctx.hook === "before-highlight") beforeHighlightHook(env, ctx);
    else if (ctx.hook === "post-process") postProcessHook(env, ctx);
  },
  commands,
  settings,
  settingTab,
  unload: unloadHook,
};

export default SyntaxWhitespaceMod;

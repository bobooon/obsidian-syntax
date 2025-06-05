import type { SyntaxMod } from "../mod.ts";
import { postProcessHook, preProcessHook } from "./highlight-hook.ts";
import { defaultCommands as commands } from "../commands.ts";
import settingTab, { defaultSettings as settings } from "./highlight-settings.ts";
import "./highlight.scss";

const SyntaxHighlightMod: SyntaxMod = {
  id: "highlight",
  aliases: ["match", "rx"],
  name: "Highlight",
  description: "Apply text highlighting effects using regular expressions.",
  info: async () => (await import(`./highlight.md?raw`)).default,
  scope: "block",
  hooks: ["pre-process", "post-process"],
  run: (env, ctx) => {
    if (ctx.hook === "pre-process") preProcessHook(env, ctx);
    else if (ctx.hook === "post-process") postProcessHook(env);
  },
  commands,
  settings,
  settingTab,
};

export default SyntaxHighlightMod;

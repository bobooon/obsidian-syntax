import type { SyntaxMod } from "../mod.ts";
import postProcessHook from "./line-numbers-hook.ts";
import { defaultCommands as commands } from "../commands.ts";
import settingTab, { defaultSettings as settings } from "./line-numbers-settings.ts";
import "./line-numbers.scss";

const SyntaxLineNumbersMod: SyntaxMod = {
  id: "line-numbers",
  aliases: ["numbers", "ln"],
  name: "Line numbers",
  description: "Display line numbers in code blocks.",
  info: async () => (await import(`./line-numbers.md?raw`)).default,
  scope: "block",
  hooks: ["post-process"],
  run: postProcessHook,
  commands,
  settings,
  settingTab,
};

export default SyntaxLineNumbersMod;

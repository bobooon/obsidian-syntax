import type { SyntaxMod } from "../mod.ts";
import postProcessHook from "./copy-hook.ts";
import { defaultCommands as commands } from "../commands.ts";
import settingTab, { defaultSettings as settings } from "./copy-settings.ts";
import "./copy.scss";

const SyntaxCopyMod: SyntaxMod = {
  id: "copy",
  aliases: [],
  name: "Copy",
  description: "Add the ability to copy code block lines and inline code.",
  scope: "all",
  hooks: ["post-process"],
  run: postProcessHook,
  commands,
  settings,
  settingTab,
};

export default SyntaxCopyMod;

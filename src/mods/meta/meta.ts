import type { SyntaxMod } from "../mod.ts";
import postProcessHook from "./meta-hook.ts";
import { defaultCommands as commands } from "../commands.ts";
import { useToggleSetting as settingTab } from "../settings.ts";
import "./meta.scss";

const SyntaxMetaMod: SyntaxMod = {
  id: "meta",
  aliases: ["mt"],
  name: "Meta",
  description: "Display opening and closing fences in the code block.",
  info: async () => (await import(`./meta.md?raw`)).default,
  scope: "block",
  hooks: ["post-process"],
  run: postProcessHook,
  commands,
  settings: { status: "off" },
  settingTab,
};

export default SyntaxMetaMod;

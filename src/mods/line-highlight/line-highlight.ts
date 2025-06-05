import type { SyntaxMod } from "../mod.ts";
import completeHook from "./line-highlight-hook.ts";
import { defaultCommands as commands } from "../commands.ts";
import { useToggleSetting as settingTab } from "../settings.ts";
import "./line-highlight.scss";

const SyntaxLineHighlightMod: SyntaxMod = {
  id: "line-highlight",
  aliases: ["highlight", "lh"],
  name: "Line highlight",
  description: "Apply highlighting effects to specific lines.",
  info: async () => (await import(`./line-highlight.md?raw`)).default,
  scope: "block",
  hooks: ["complete"],
  run: completeHook,
  commands,
  settings: { status: "on" },
  settingTab,
};

export default SyntaxLineHighlightMod;

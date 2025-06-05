import type { SyntaxMod } from "../mod.ts";
import postProcessHook from "./inline-code-hook.ts";
import { useDefaultSetting as settingTab } from "../settings.ts";
import "./inline-code.scss";

const SyntaxInlineCodeMod: SyntaxMod = {
  id: "inline-code",
  aliases: [],
  name: "Inline code",
  description: "Apply syntax highlighting and effects to inline code.",
  info: async () => (await import(`./inline-code.md?raw`)).default,
  dependent: true,
  scope: "inline",
  hooks: ["post-process"],
  run: postProcessHook,
  settings: { status: "on" },
  settingTab,
};

export default SyntaxInlineCodeMod;

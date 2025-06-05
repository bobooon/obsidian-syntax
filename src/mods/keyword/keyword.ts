import type { SyntaxMod } from "../mod.ts";
import wrapHook from "./keyword-hook.ts";
import { defaultCommands as commands } from "../commands.ts";
import { useToggleSetting as settingTab } from "../settings.ts";

const SyntaxKeywordMod: SyntaxMod = {
  id: "keyword",
  aliases: [],
  name: "Keyword classes",
  description: "Add additional classes to each keyword for greater control over styling.",
  scope: "all",
  hooks: ["wrap"],
  run: wrapHook,
  commands,
  settings: { status: "off" },
  settingTab,
};

export default SyntaxKeywordMod;

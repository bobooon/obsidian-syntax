import type { SyntaxMod } from "../mod.ts";
import postProcessHook from "./wrapper-hook.ts";

const SyntaxWrapperMod: SyntaxMod = {
  id: "wrapper",
  aliases: [],
  name: "Wrapper",
  description: "Adds a wrapper around the code element in a code block.",
  dependent: true,
  scope: "block",
  hooks: ["post-process"],
  run: postProcessHook,
  settings: { status: "on" },
};

export default SyntaxWrapperMod;

import type { SyntaxMod } from "../mod.ts";
import { type PrismMarkupEnv, afterHighlightHook, beforeHighlightHook } from "./markup-hook.ts";

const SyntaxMarkupMod: SyntaxMod = {
  id: "markup",
  aliases: [],
  name: "Markup",
  description: "Retain HTML markup in the highlighted code.",
  dependent: true,
  scope: "block",
  hooks: ["before-highlight", "after-highlight"],
  run: (env, ctx) => {
    if (ctx.hook === "before-highlight") beforeHighlightHook(env as PrismMarkupEnv);
    else if (ctx.hook === "after-highlight") afterHighlightHook(env as PrismMarkupEnv);
  },
  settings: { status: "on" },
};

export default SyntaxMarkupMod;

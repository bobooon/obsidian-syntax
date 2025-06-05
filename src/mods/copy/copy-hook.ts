import { displayTooltip, setIcon, setTooltip } from "obsidian";
import type { PrismEnv, SyntaxModContext } from "../mod.ts";
import type { SyntaxCopyModSettings } from "./copy-settings.ts";
import { addIcon } from "../line/line.ts";

const iconTimeout = 2000;

export default function postProcessHook(env: PrismEnv, ctx: SyntaxModContext) {
  const settings = ctx.mod.settings as SyntaxCopyModSettings;

  function writeText(targetEl: HTMLElement, triggerEl?: HTMLElement) {
    if (!triggerEl) triggerEl = targetEl;
    navigator.clipboard.writeText(targetEl.innerText).then(() => {
      setTimeout(() => displayTooltip(triggerEl, "Copied!"), 100);
    });
  }

  function processBlock(el: HTMLElement) {
    const preEl = el.parentElement as HTMLElement;

    const buttonEl = preEl.createEl("button");
    buttonEl.className = "copy-code-button";
    setIcon(buttonEl, "copy");
    if (settings.options.tooltip) setTooltip(buttonEl, "Copy");

    buttonEl.addEventListener("click", () => {
      writeText(el, buttonEl);
      setIcon(buttonEl, "checkmark");
      setTimeout(() => setIcon(buttonEl, "copy"), iconTimeout);
    });

    preEl.addEventListener("click", () => {
      const embedEl: HTMLElement | null = preEl.closest(".cm-embed-block");
      if (embedEl) embedEl.find(".edit-block-button")?.click();
    });

    if (settings.options.line) processBlockLine(el);
  }

  function processBlockLine(el: HTMLElement) {
    el.findAll(".line").forEach((lineEl: HTMLElement) => {
      if (!lineEl.innerText.trim() || lineEl.hasClass("meta")) return;

      const startEl = lineEl.find(".line-start");
      const iconEl = addIcon(startEl, "clipboard");
      if (settings.options.tooltip) setTooltip(startEl, "Copy Line");

      const copyLine = () => {
        writeText(lineEl, startEl);
        setIcon(iconEl, "checkmark");
        setTimeout(() => setIcon(iconEl, "clipboard"), iconTimeout);
      };

      startEl.addEventListener("click", () => copyLine());

      if (settings.options.keyboard) {
        lineEl.tabIndex = 0;
        lineEl.addEventListener("keydown", (event) => {
          if (["Enter", "Space"].includes(event.code)) {
            event.preventDefault();
            copyLine();
          }
        });
      }
    });
  }

  function processInline(el: HTMLElement) {
    if (!settings.options.inline) return;

    el.addClass("syntax-copy");
    if (settings.options.tooltip) setTooltip(el, "Double-click to copy");

    el.addEventListener("dblclick", () => writeText(el));
    el.addEventListener("mousedown", (event) => {
      if (event.detail === 2) event.preventDefault();
    });
  }

  if (env.scope === "inline") processInline(env.el);
  else processBlock(env.el);
}

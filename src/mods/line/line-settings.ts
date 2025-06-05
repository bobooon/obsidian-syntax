import { type SyntaxModSettingTab, type SyntaxModSettings, useDefaultSetting } from "../settings.ts";
import SyntaxSetting from "../../lib/setting.ts";

export interface SyntaxLineModSettings extends SyntaxModSettings {
  options: { sticky: boolean };
}

export const defaultSettings: SyntaxLineModSettings = {
  status: "on",
  options: { sticky: true },
};

const settingTab: SyntaxModSettingTab = async (ctx) => {
  const { plugin } = ctx.tab;
  const settings = ctx.mod.settings as SyntaxLineModSettings;
  if (!settings.options) settings.options = defaultSettings.options;

  useDefaultSetting(ctx, (modal) => {
    const { contentEl } = modal;
    modal.setTitle(ctx.mod.name);

    new SyntaxSetting(contentEl, plugin)
      .setName("Sticky")
      .setDesc("Keep the line start gutter fixed when scrolling horizontally.")
      .addToggle((cb) => {
        cb.setValue(settings.options.sticky).onChange(async (value) => {
          settings.options.sticky = value;
          await ctx.tab.saveSettings();
        });
      });
  });
};

export default settingTab;

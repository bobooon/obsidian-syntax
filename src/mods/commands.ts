import { type SyntaxModCommands } from "./mod.ts";

const defaultCommands: SyntaxModCommands = (mod, plugin) => {
  const settings = plugin.settings.mods[mod.id];

  plugin.addCommand({
    id: `${mod.id}:toggle`,
    name: `Toggle ${mod.name.toLowerCase()}`,
    callback: async () => {
      settings.status = settings.status === "off" ? "on" : "off";
      await plugin.saveSettings();
    },
  });
};

// eslint-disable-next-line import/prefer-default-export
export { defaultCommands };

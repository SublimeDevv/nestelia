import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
	plugins: [pluginReact()],
	tools: {
		postcss: (_opts, { addPlugins }) => {
			addPlugins(require("@tailwindcss/postcss"));
		},
	},
});

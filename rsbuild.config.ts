import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";

const { publicVars } = loadEnv({ prefixes: ['API_'] });

export default defineConfig({
	plugins: [pluginReact(), pluginNodePolyfill()],
	source: {
		define: publicVars,
	},
	tools: {
		postcss: (_opts, { addPlugins }) => {
			addPlugins(require("@tailwindcss/postcss"));
		},
	},
});

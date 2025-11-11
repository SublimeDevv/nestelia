import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";

const { publicVars } = loadEnv({ prefixes: ["API_"] });

export default defineConfig({
	plugins: [pluginReact(), pluginNodePolyfill()],
	html:  {
		title: "Nestelia",
		favicon: "./src/assets/favicon.webp",
		meta: {
			viewport: "width=device-width, initial-scale=1.0",
			"theme-color": "#4f46e5",
			description: "Nestelia - Wiki y Portal de Información",
		},
		tags: [
			{ tag: "link", attrs: { rel: "manifest", href: "/manifest.json" } },
			{ tag: "meta", attrs: { name: "apple-mobile-web-app-capable", content: "yes" } },
			{ tag: "meta", attrs: { name: "apple-mobile-web-app-status-bar-style", content: "default" } },
			{ tag: "meta", attrs: { name: "apple-mobile-web-app-title", content: "Nestelia" } },
		],
	},
	source: {
		define: publicVars,
	},
	tools: {
		postcss: (_opts, { addPlugins }) => {
			addPlugins(require("@tailwindcss/postcss"));
		},
	},
	output: {
		copy: [
			{ from: "public", to: "" }
		],
	},
});

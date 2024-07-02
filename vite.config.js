import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsConfigPaths from "vite-jsconfig-paths";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		jsConfigPaths(),
		svgr({
			svgrOptions: {
				// svgr options
			},
		}),
	],
	esbuild: {
		jsxInject: `import React from 'react'`,
	},
});

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

/** GitHub Pages URL for this repo; update if you add a custom domain. */
const site = "https://kenigs.dev";

/** Dev server needs relaxed CSP so Vite HMR (eval/WS) keeps working. */
const isDev = process.env.NODE_ENV !== "production";
const contentSecurityPolicy = isDev
	? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' ws: wss:;"
	: "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data: https:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://cloud.umami.is; connect-src 'self' https://cloud.umami.is https://api-gateway.umami.dev https://gateway.umami.is; upgrade-insecure-requests;";

const securityHeaders = {
	"Content-Security-Policy": contentSecurityPolicy,
	"Cross-Origin-Opener-Policy": "same-origin",
	"X-Content-Type-Options": "nosniff",
	"Referrer-Policy": "strict-origin-when-cross-origin",
	"Permissions-Policy": "geolocation=(), microphone=(), camera=(), payment=()",
};

// https://astro.build/config
export default defineConfig({
	site,
	integrations: [sitemap()],
	build: {
		// One small stylesheet: inlining it removes the only render-blocking request.
		inlineStylesheets: "always",
	},
	// Astro generates metric-matched fallback faces, so the swap to the web font doesn't shift layout.
	fonts: [
		{
			name: "Inter",
			cssVariable: "--font-inter",
			provider: fontProviders.fontsource(),
			weights: ["100 900"],
			styles: ["normal"],
			subsets: ["latin"],
			fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
		},
		{
			name: "Space Grotesk",
			cssVariable: "--font-space-grotesk",
			provider: fontProviders.fontsource(),
			weights: ["300 700"],
			styles: ["normal"],
			subsets: ["latin"],
			fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
		},
		{
			name: "JetBrains Mono",
			cssVariable: "--font-jetbrains-mono",
			provider: fontProviders.fontsource(),
			weights: ["100 800"],
			styles: ["normal"],
			subsets: ["latin"],
			fallbacks: ["ui-monospace", "SFMono-Regular", "monospace"],
		},
	],
	vite: {
		plugins: [...tailwindcss()],
		server: {
			headers: securityHeaders,
		},
		preview: {
			headers: securityHeaders,
		},
	},
});

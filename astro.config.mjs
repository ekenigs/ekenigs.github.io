// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

/** Dev server needs relaxed CSP so Vite HMR (eval/WS) keeps working. */
const isDev = process.env.NODE_ENV !== "production";
const contentSecurityPolicy = isDev
	? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' ws: wss:;"
	: "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data: https:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; upgrade-insecure-requests;";

const securityHeaders = {
	"Content-Security-Policy": contentSecurityPolicy,
	"Cross-Origin-Opener-Policy": "same-origin",
	"X-Content-Type-Options": "nosniff",
	"Referrer-Policy": "strict-origin-when-cross-origin",
	"Permissions-Policy": "geolocation=(), microphone=(), camera=(), payment=()",
};

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
		server: {
			headers: securityHeaders,
		},
		preview: {
			headers: securityHeaders,
		},
	},
});

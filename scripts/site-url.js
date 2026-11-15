// The site's public address, shared by the export scripts. Single source:
// lib/site.ts. Override with SITE_URL (e.g. SITE_URL=http://localhost:3000)
// when you want links that work on a local server.
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.resolve(__dirname, "..", "lib", "site.ts"), "utf8");
const fromSite = src.match(/SITE_URL\s*=\s*"([^"]+)"/)?.[1];

module.exports = (process.env.SITE_URL || fromSite || "").replace(/\/$/, "");

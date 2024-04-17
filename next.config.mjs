import { fileURLToPath } from "node:url";
import createJiti from "jiti";

// Use jiti to import typescript files
createJiti(fileURLToPath(import.meta.url))("./src/data/env");

/** @type {import("next").NextConfig} */
const nextConfig = {};

export default nextConfig;

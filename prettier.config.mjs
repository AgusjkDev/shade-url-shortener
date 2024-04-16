/** @type {import("prettier").Config & import("@ianvs/prettier-plugin-sort-imports").PluginConfig} */
const config = {
    arrowParens: "avoid",
    endOfLine: "lf",
    printWidth: 100,
    tabWidth: 4,
    importOrder: [
        "^(react/(.*)$)|^(react$)",
        "^(next/(.*)$)|^(next$)",
        "<THIRD_PARTY_MODULES>",
        "",
        "^@/context/(.*)$",
        "^@/components/ui/(.*)$",
        "^@/components/(.*)$",
        "^@/hooks/(.*)$",
        "^@/lib/(.*)$",
        "^@/(.*)$",
        "^@/styles/(.*)$",
        "",
        "^[./]",
    ],
    importOrderParserPlugins: ["typescript", "jsx"],
    plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
};

export default config;

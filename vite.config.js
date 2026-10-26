import { defineConfig } from "vite";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";

export default defineConfig({
  plugins: [
    {
      name: "lesson-mdx",
      enforce: "pre",
      async transform(source, id) {
        if (!id.endsWith(".mdx")) return null;
        const compiled = await compile(source, { remarkPlugins: [remarkGfm] });
        return { code: String(compiled), map: null };
      },
    },
  ],
});

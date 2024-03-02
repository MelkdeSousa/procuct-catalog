import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts", "src/queue.ts"],
  minify: true,
  clean: true,
});

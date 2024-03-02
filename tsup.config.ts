import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts", "src/queue.ts"],
  //   splitting: false,
  //   sourcemap: true,
  clean: true,
});

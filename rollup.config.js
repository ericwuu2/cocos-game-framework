import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default {
  // 入口文件
  input: "./framework/src/index.ts",
  plugins: [
    // 用于打包typescript
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          // 覆盖tsconfig.json
          "target": "ES5",
          "module": "ESNext",
          // 自动生成声明文件
          "declaration": true,
          "declarationDir": "./framework/dist/types/",
        },
        "include": [
          "framework/**/*",
          "creator.d.ts",
          "game.d.ts",
        ]
      },
    }),
    // 用于压缩js文件，暂时不使用
    // terser(),
  ],
  output: {
    // 输出文件
    file: "./framework/dist/fy-v1.0.0.js",
    // 需要在creator中作为插件脚本使用，因此必须要生成为umd模块
    format: "umd",
    // umd包名。注意此处需要更改生成的index.d.ts声明文件，添加一行：export as namespace {name}
    name: "fy",
  }
};

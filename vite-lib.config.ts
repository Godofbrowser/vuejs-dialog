import { resolve } from 'path';
import { defineConfig } from 'vite';
import viteConfig from "./vite.config";
import {mergeConfig} from "vitest/config";
import dtsPlugin from "vite-plugin-dts";
import pkg from './package.json'

const packageName = pkg.name;
const packageDeclarationName = 'VuejsDialog';

export default mergeConfig(
    viteConfig,
    defineConfig({
        build: {
            copyPublicDir: false,
            outDir: 'dist',
            minify: true,
            lib: {
                // Could also be a dictionary or array of multiple entry points
                entry: resolve(__dirname, 'src/plugin/index.ts'),
                name: packageDeclarationName,
                fileName: (format) => packageName + `.${format}.js`,
                formats: ['es', 'umd'],
            },
            rollupOptions: {
                // make sure to externalize deps that shouldn't be bundled
                // into your library
                external: ['vue'],
                output: {
                    globals: {
                        vue: 'Vue',
                    },
                    assetFileNames: (assetInfo) => {
                        if (assetInfo.name == "style.css") return packageName +".min.css";
                        return assetInfo.name;
                    },
                },
            },
        },
        plugins: [
            dtsPlugin({
                rollupTypes: true,
                copyDtsFiles: true,
            }),
        ]
    }
))

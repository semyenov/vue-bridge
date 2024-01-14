import Components from 'unplugin-vue-components/vite'
import dts from 'vite-plugin-dts'

import type { Plugin, UserConfig } from 'vite'

export interface VueBridgeBuildOptions {
  name: string
  outDir?: string
}

const defaults: Partial<VueBridgeBuildOptions> = {
  outDir: 'dist',
}

const fileExtensionMap = {
  es: 'mjs',
  cjs: 'cjs',
  iife: 'js',
  umd: 'js',
}

export function pluginsConfig(plugins: Plugin[] = []): UserConfig['plugins'] {
  return [
    Components({
      dirs: ['src/components'],
      dts: true,
    }),
    dts(),
    ...plugins,
  ]
}

export function sharedConfig(options = {}): UserConfig {
  return {
    server: {
      watch: {
        followSymlinks: true,
      },
      fs: {
        strict: false,
      },
    },
    // test: {
    //   environment: 'jsdom',
    //   deps: {
    //     inline: true,
    //   },
    // },
    ...options,
  }
}

export function buildConfig(_options: VueBridgeBuildOptions): UserConfig['build'] {
  const options = Object.assign({}, defaults, _options)

  return {
    outDir: options.outDir,

    lib: {
      entry: 'src/main.ts',
      formats: ['es', 'cjs', 'iife'],
      name: options.name, // global variable name for IIFE build

      // @ts-expect-error Not sure why this is invalid.
      fileName: (format: keyof typeof fileExtensionMap) => {
        return `index.${format}.${fileExtensionMap[format]}`
      },
    },

    rollupOptions: {
      output: {
        // this means your main.ts file should only have named exports, and no default export!
        exports: 'named',

        // Add global names for externalized dependencies here.
        // IIFE needs to now how to access external deps like: `window.Vue`
        globals: {
          'vue': 'Vue',
          '@vue-bridge/runtime': 'VueBridge',
        },
      },
      // add any 3rd party packages that you do no want to have bundled in your library
      // this *must* contain 'vue'
      external: ['vue', '@vue-bridge/runtime'],
    },
  }
}

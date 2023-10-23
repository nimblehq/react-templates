import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import path from 'path';
import { readdirSync } from 'fs';

// const absolutePathAliases: { [key: string]: string } = {};
// Root source folder
// const srcPath = path.resolve('src');
// const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map((dirent) => dirent.name.replace(/(\.ts){1}(x?)/, ''));
// srcRootContent.forEach((directory) => {
//   absolutePathAliases[directory] = path.join(srcPath, directory);
// });

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  // root: 'src',
  // resolve: {
  //   alias: {
  //     src: '/'
  //     },
  //   },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  build: {
    outDir: 'build',
  },
  plugins: [
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
})

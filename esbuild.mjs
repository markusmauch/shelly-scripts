import { build } from 'esbuild';

import * as dotenv from 'dotenv';
dotenv.config();

const args = process.argv.slice(2)

const options = {
  entryPoints: [
    "src/Devices/LichtschalterWohnzimmer.js",
    "src/Devices/LichtschalterFlur.js",
  ],
  outdir: 'dist',
  bundle: true,
  minify: false,
  supported: {
    arrow: false,
  },
  // watch: args.includes('--watch'),
  define: {
    'API_KEY': JSON.stringify(process.env.API_KEY)
  },
}

build(options).catch(() => process.exit(1))
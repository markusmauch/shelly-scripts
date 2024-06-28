import { build } from 'esbuild';
import * as FileSystem from 'fs';
import { fileURLToPath } from 'url';
import * as Path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const getJsFiles = (path) => {
  const __dirname = Path.dirname(fileURLToPath(import.meta.url));
  const dirPath = Path.join(__dirname, path);
  console.log(dirPath);
  try
  {
    const files = FileSystem.readdirSync(dirPath);
    return files.filter(file => Path.extname(file) === '.js').map(item => Path.join(dirPath, item));
  }
  catch(err)
  {
    return console.error('Unable to scan directory: ' + err);
  }
};


const args = process.argv.slice(2)
const zt = getJsFiles(Path.join("src", "Devices"));
console.dir(zt);
const options = {
  entryPoints: zt,
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
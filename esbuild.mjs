import { build } from 'esbuild';
import * as FileSystem from 'fs';
import { fileURLToPath } from 'url';
import * as Path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const getSourceFiles = (path) => {
  const __dirname = Path.dirname(fileURLToPath(import.meta.url));
  const dirPath = Path.join(__dirname, path);
  console.log(dirPath);
  try
  {
    const files = FileSystem.readdirSync(dirPath);
    return files.filter(file => Path.extname(file) === '.ts').map(item => Path.join(dirPath, item));
  }
  catch(err)
  {
    return console.error('Unable to scan directory: ' + err);
  }
};

const sourceFiles = getSourceFiles(Path.join("src", "Devices"));

const options = {
  entryPoints: sourceFiles,
  outdir: 'dist',
  bundle: true,
  minify: false,
  tsconfig: 'tsconfig.json',
  supported: {
    arrow: false,
    class: false,
    "template-literal": false,
  },
  target: "ES5",
  define: {
    'API_KEY': JSON.stringify(process.env.API_KEY)
  },
}

build(options).catch(() => process.exit(1))
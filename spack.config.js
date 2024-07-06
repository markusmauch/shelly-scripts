const { config } = require("@swc/core/spack");
const FileSystem = require("fs");
const Path = require("path");

function getSourceFiles(path) {
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


module.exports = config({
    entry: getSourceFiles(Path.join("src", "Devices")),
    output: {
        path: __dirname + "/dist/",
    },
    module: {}
});
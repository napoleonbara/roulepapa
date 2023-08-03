const glob = require('glob');
const fs = require('fs');

const targets = [
  'dist/*',
  'js'
]

for(wc of targets){
  glob(wc, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      console.log(file);
      try {
        fs.rmSync(file, { recursive: true, force: true });
      } catch (e) {
        console.log(`Couldn't delete: ${e}`);
      }
    });
  });
}


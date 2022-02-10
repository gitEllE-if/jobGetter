const fs = require('fs');
const path = require('path');

const SRC_DIR = 'dist';
const DEST_DIR = 'public';

try {
    const files = fs.readdirSync(`${SRC_DIR}`);
    files.forEach((file) => {
        if (path.extname(file) === '.jpg') {
            fs.copyFileSync(path.join(SRC_DIR, path.basename(file)), path.join(DEST_DIR, path.basename(file)));
        }
    })
}
catch(e) {
    console.log(e);
}

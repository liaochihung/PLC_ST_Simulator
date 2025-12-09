const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../src/components/external-editor');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.js')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const files = getAllFiles(targetDir);
let count = 0;

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');

    // Heuristic for JSX: import React or structural tags
    const hasReact = content.includes("import React");
    const hasJSX = /<[A-Z][A-Za-z0-9]+/.test(content) || /<div/.test(content) || /<span/.test(content);

    if (hasReact || hasJSX) {
        const newPath = file.replace(/\.js$/, '.jsx');
        console.log(`Renaming ${path.basename(file)} -> ${path.basename(newPath)}`);
        fs.renameSync(file, newPath);
        count++;
    }
});

console.log(`Renamed ${count} files.`);

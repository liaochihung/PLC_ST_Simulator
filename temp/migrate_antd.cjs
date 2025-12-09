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
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.jsx')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const files = getAllFiles(targetDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Replace Form import
    if (content.includes("from 'antd'") || content.includes('from "antd"')) {
        // Regex to find Form in import
        // Case 1: import { Form, Button } from 'antd';
        // Case 2: import { Form } from 'antd';

        // Strategy: 
        // 1. Check if Form or Icon is imported.
        // 2. If so, remove them from 'antd' import.
        // 3. Add import from '@ant-design/compatible'.

        const hasForm = /import\s+{.*(\bForm\b).*} from ['"]antd['"]/.test(content);
        const hasIcon = /import\s+{.*(\bIcon\b).*} from ['"]antd['"]/.test(content);

        if (hasForm || hasIcon) {
            // Naive approach: string replacement for simple cases. 
            // Complex parsing requires AST but we use regex for speed.

            // Remove 'Form,' or ', Form' or 'Form' from the bracket.
            // This is hard with simple regex. 

            // Alternative: Change the ENTIRE import to @ant-design/compatible if nearly everything is there? 
            // No, Button etc stay in 'antd'.

            // Let's do a smarter replacement:
            // Extract the import line.

            const importRegex = /import\s+{(.*?)}\s+from\s+['"]antd['"];?/g;
            content = content.replace(importRegex, (match, imports) => {
                let parts = imports.split(',').map(s => s.trim()).filter(s => s);
                const kept = [];
                const moved = [];

                parts.forEach(p => {
                    if (p === 'Form' || p === 'Icon') {
                        moved.push(p);
                    } else {
                        kept.push(p);
                    }
                });

                let res = '';
                if (kept.length > 0) {
                    res += `import { ${kept.join(', ')} } from 'antd';\n`;
                }
                if (moved.length > 0) {
                    res += `import { ${moved.join(', ')} } from '@ant-design/compatible';\n`;
                    // Add css import for compatible
                    res += `import '@ant-design/compatible/assets/index.css';\n`;
                }

                if (moved.length > 0) {
                    changed = true;
                    return res.trim();
                }
                return match;
            });
        }
    }

    if (changed) {
        console.log("Modifying: " + file);
        fs.writeFileSync(file, content, 'utf8');
    }
});

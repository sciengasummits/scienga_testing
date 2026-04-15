const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages_orig');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove import usePageSEO...
    content = content.replace(/import\s+usePageSEO\s+from\s+['"].*?usePageSEO['"];?\n?/, '');

    // Remove usePageSEO({...}); block
    const usePageSEORegex = /[ \t]*usePageSEO\(\{\s*pageKey:[\s\S]*?\}\);\n?/g;
    content = content.replace(usePageSEORegex, '');

    // If 'use client' is not present, add it
    if (!content.startsWith("'use client';")) {
        content = "'use client';\n" + content;
    }

    fs.writeFileSync(filePath, content, 'utf8');
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            processFile(fullPath);
        }
    }
}

traverseDir(pagesDir);
console.log('Migration of pages_orig completed!');

import fs from 'fs';
import path from 'path';

// 修复CSS文件末尾的%字符
function fixCssFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    // 移除末尾的%字符
    content = content.replace(/%\s*$/, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error);
  }
}

// 修复所有CSS文件
const cssFiles = [
  path.join(process.cwd(), 'dist', 'cjs', 'index.css'),
  path.join(process.cwd(), 'dist', 'es', 'index.css')
];

cssFiles.forEach(fixCssFile);
console.log('All CSS files fixed!');
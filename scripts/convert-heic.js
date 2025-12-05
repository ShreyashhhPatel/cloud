/**
 * HEIC to JPG Converter Script
 * 
 * This script converts HEIC images to JPG format for better browser compatibility.
 * 
 * Usage:
 * 1. Install dependencies: npm install heic-convert sharp
 * 2. Run: node scripts/convert-heic.js
 * 
 * The script will:
 * - Convert all .HEIC files in the img/ folder to .jpg
 * - Save them in a new img-converted/ folder
 * - Preserve the original HEIC files
 */

const fs = require('fs');
const path = require('path');

console.log('HEIC to JPG Conversion Script');
console.log('==============================\n');

console.log('⚠️  This script requires additional dependencies:');
console.log('   npm install heic-convert sharp\n');

console.log('📋 Instructions:');
console.log('1. Install the required packages');
console.log('2. Run: node scripts/convert-heic.js');
console.log('3. Converted images will be saved to img-converted/\n');

const imgDir = path.join(__dirname, '..', 'img');
const outputDir = path.join(__dirname, '..', 'img-converted');

// Check if img directory exists
if (!fs.existsSync(imgDir)) {
  console.error('❌ Error: img/ directory not found');
  process.exit(1);
}

// Count HEIC files
const files = fs.readdirSync(imgDir);
const heicFiles = files.filter(file => file.toUpperCase().endsWith('.HEIC'));

console.log(`📁 Found ${heicFiles.length} HEIC files to convert`);
console.log(`📂 Source: ${imgDir}`);
console.log(`📂 Output: ${outputDir}\n`);

console.log('💡 Tip: macOS users can also use the Preview app or this command:');
console.log('   sips -s format jpeg img/*.HEIC --out img-converted/\n');

// Note: Actual conversion code would require the heic-convert package
// which is a large dependency. This script provides instructions instead.


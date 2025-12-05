#!/bin/bash

# HEIC to JPG Converter Script for macOS
# This script uses the built-in 'sips' command to convert HEIC images to JPG

echo "🖼️  HEIC to JPG Conversion Script"
echo "=================================="
echo ""

# Check if img directory exists
if [ ! -d "img" ]; then
    echo "❌ Error: img/ directory not found"
    exit 1
fi

# Create output directory
mkdir -p img-converted

# Count HEIC files
HEIC_COUNT=$(find img -type f -iname "*.heic" | wc -l | tr -d ' ')

if [ "$HEIC_COUNT" -eq 0 ]; then
    echo "❌ No HEIC files found in img/ directory"
    exit 1
fi

echo "📁 Found $HEIC_COUNT HEIC files to convert"
echo "📂 Output directory: img-converted/"
echo ""

# Convert each HEIC file to JPG
CONVERTED=0
FAILED=0

for file in img/*.HEIC img/*.heic 2>/dev/null; do
    # Check if file exists (handles the case when no files match)
    [ -e "$file" ] || continue
    
    # Get filename without path and extension
    filename=$(basename "$file")
    name="${filename%.*}"
    
    # Convert using sips (macOS built-in tool)
    echo "Converting: $filename"
    if sips -s format jpeg "$file" --out "img-converted/${name}.jpg" > /dev/null 2>&1; then
        CONVERTED=$((CONVERTED + 1))
    else
        echo "  ⚠️  Failed to convert $filename"
        FAILED=$((FAILED + 1))
    fi
done

echo ""
echo "✅ Conversion complete!"
echo "   Successfully converted: $CONVERTED files"
if [ "$FAILED" -gt 0 ]; then
    echo "   Failed: $FAILED files"
fi
echo ""
echo "📂 Converted images are in: img-converted/"
echo ""
echo "Next steps:"
echo "1. Update src/images.ts to use /img-converted/ paths"
echo "2. Change .HEIC extensions to .jpg"
echo "3. Restart the dev server with: npm run dev"


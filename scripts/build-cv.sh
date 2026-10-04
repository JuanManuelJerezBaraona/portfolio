#!/bin/sh
# Prints the CV in both languages to PDF with headless Chrome:
#   cv/cv.html    → public/CV-Juan-Manuel-Jerez-Baraona.pdf
#   cv/cv.en.html → public/CV-Juan-Manuel-Jerez-Baraona-EN.pdf
# The virtual time budget gives Google Fonts time to load before printing.
set -e
cd "$(dirname "$0")/.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

print() {
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
    --virtual-time-budget=10000 \
    --print-to-pdf="$2" \
    "file://$PWD/$1"
  echo "CV generado en $2"
}

print cv/cv.html public/CV-Juan-Manuel-Jerez-Baraona.pdf
print cv/cv.en.html public/CV-Juan-Manuel-Jerez-Baraona-EN.pdf

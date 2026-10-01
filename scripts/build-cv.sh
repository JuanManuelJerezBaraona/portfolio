#!/bin/sh
# Prints cv/cv.html to public/CV-Juan-Manuel-Jerez-Baraona.pdf with headless Chrome.
# The virtual time budget gives Google Fonts time to load before printing.
set -e
cd "$(dirname "$0")/.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="public/CV-Juan-Manuel-Jerez-Baraona.pdf"

"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=10000 \
  --print-to-pdf="$OUT" \
  "file://$PWD/cv/cv.html"

echo "CV generado en $OUT"

#!/usr/bin/env bash
set -euo pipefail

# Simple ffmpeg helper to generate optimized WebM and MP4 from a source video.
# Usage: ./scripts/optimize_video.sh path/to/source.mp4

INPUT=${1:-public/assets/kiti_flying.mp4}

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Please install ffmpeg to use this script."
  exit 2
fi

DIR=$(dirname "$INPUT")
BASE=$(basename "$INPUT")
NAME="${BASE%.*}"
OUT_WEBM="$DIR/${NAME}.webm"
OUT_MP4="$DIR/${NAME}.mp4"

echo "Optimizing: $INPUT"
echo "  -> WebM: $OUT_WEBM"
echo "  -> MP4 : $OUT_MP4"

echo "Generating WebM (VP9, good quality, slower)..."
ffmpeg -y -i "$INPUT" -c:v libvpx-vp9 -b:v 0 -crf 30 -vf "scale='min(1280,iw)':'min(720,ih)'" -an -threads 0 "$OUT_WEBM"

echo "Generating MP4 (H.264, widely compatible)..."
ffmpeg -y -i "$INPUT" -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart -vf "scale='min(1280,iw)':'min(720,ih)'" -an "$OUT_MP4"

echo "Optimization complete. Files written to:"
echo "  $OUT_WEBM"
echo "  $OUT_MP4"

exit 0

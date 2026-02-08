#!/usr/bin/env bash
set -euo pipefail

# Generate multiple bitrate variants (WEBM fast + HLS) and H.264 MP4s for adaptive streaming
# Usage: ./scripts/optimize_video_variants.sh public/assets/kiti_flying.mp4

INPUT=${1:-public/assets/kiti_flying.mp4}

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Please install ffmpeg to use this script."
  exit 2
fi

DIR=$(dirname "$INPUT")
BASE=$(basename "$INPUT")
NAME="${BASE%.*}"

echo "Input: $INPUT"

# Create output directory for HLS
HLS_DIR="$DIR/hls_${NAME}"
mkdir -p "$HLS_DIR"

echo "Generating webm/mp4 variants (fast VP9 for speed, h264 for compatibility)..."

# 2160p (4K) webm
ffmpeg -y -i "$INPUT" -c:v libvpx-vp9 -speed 1 -b:v 0 -crf 30 -vf "scale='min(3840,iw)':'min(2160,ih)'" -an "$DIR/${NAME}_2160.webm"

# 720p webm (fast encode, reasonable quality)
ffmpeg -y -i "$INPUT" -c:v libvpx-vp9 -speed 4 -b:v 0 -crf 34 -vf "scale='min(1280,iw)':'min(720,ih)'" -an "$DIR/${NAME}_720.webm"

# 480p webm
ffmpeg -y -i "$INPUT" -c:v libvpx-vp9 -speed 4 -b:v 0 -crf 36 -vf "scale='min(854,iw)':'min(480,ih)'" -an "$DIR/${NAME}_480.webm"

# 360p webm (mobile fallback)
ffmpeg -y -i "$INPUT" -c:v libvpx-vp9 -speed 4 -b:v 0 -crf 38 -vf "scale='min(640,iw)':'min(360,ih)'" -an "$DIR/${NAME}_360.webm"

# Also create H.264 mp4 variants (fast presets)
ffmpeg -y -i "$INPUT" -c:v libx264 -preset veryfast -crf 24 -vf "scale='min(3840,iw)':'min(2160,ih)'" -an "$DIR/${NAME}_2160.mp4"
ffmpeg -y -i "$INPUT" -c:v libx264 -preset veryfast -crf 28 -vf "scale='min(1280,iw)':'min(720,ih)'" -an "$DIR/${NAME}_720.mp4"
ffmpeg -y -i "$INPUT" -c:v libx264 -preset veryfast -crf 30 -vf "scale='min(854,iw)':'min(480,ih)'" -an "$DIR/${NAME}_480.mp4"
ffmpeg -y -i "$INPUT" -c:v libx264 -preset veryfast -crf 32 -vf "scale='min(640,iw)':'min(360,ih)'" -an "$DIR/${NAME}_360.mp4"

echo "Generating HLS renditions (2160/720/480/360)"

ffmpeg -y -i "$INPUT" -filter_complex "[0:v]split=4[v1][v2][v3][v4];[v1]scale=w=3840:h=2160[v1out];[v2]scale=w=1280:h=720[v2out];[v3]scale=w=854:h=480[v3out];[v4]scale=w=640:h=360[v4out]" \
  -map "[v1out]" -c:v:0 libx264 -preset veryfast -crf 24 -g 48 -sc_threshold 0 -b:v:0 14000k -maxrate:v:0 15000k -bufsize:v:0 21000k -map 0:a? -c:a:0 aac -b:a:0 192k \
  -map "[v2out]" -c:v:1 libx264 -preset veryfast -crf 28 -g 48 -sc_threshold 0 -b:v:1 2000k -maxrate:v:1 2140k -bufsize:v:1 2800k -map 0:a? -c:a:1 aac -b:a:1 128k \
  -map "[v3out]" -c:v:2 libx264 -preset veryfast -crf 30 -g 48 -sc_threshold 0 -b:v:2 1000k -maxrate:v:2 1070k -bufsize:v:2 1400k -map 0:a? -c:a:2 aac -b:a:2 96k \
  -map "[v4out]" -c:v:3 libx264 -preset veryfast -crf 32 -g 48 -sc_threshold 0 -b:v:3 600k -maxrate:v:3 642k -bufsize:v:3 900k -map 0:a? -c:a:3 aac -b:a:3 96k \
  -f hls -hls_time 6 -hls_playlist_type vod -hls_segment_filename "$HLS_DIR/${NAME}_%v_segment_%03d.ts" \
  -master_pl_name "$HLS_DIR/${NAME}_master.m3u8" "$HLS_DIR/${NAME}_%v.m3u8"

echo "Done. Outputs written to:"
echo "  $DIR/${NAME}_2160.webm"
echo "  $DIR/${NAME}_720.webm"
echo "  $DIR/${NAME}_480.webm"
echo "  $DIR/${NAME}_360.webm"
echo "  $DIR/${NAME}_2160.mp4"
echo "  $DIR/${NAME}_720.mp4"
echo "  $DIR/${NAME}_480.mp4"
echo "  $DIR/${NAME}_360.mp4"
echo "  HLS playlist: $HLS_DIR/${NAME}_master.m3u8"

exit 0

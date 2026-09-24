#!/usr/bin/env bash
# Turn any source video into web-ready background files in public/bg/:
#   background.mp4         desktop, 1920px wide, H.264, no audio, streams while downloading
#   background-mobile.mp4  phone, 720p, smaller
#   background-poster.jpg  first frame, shown while the video loads
#
# Usage: npm run bg:encode -- path/to/video.mp4 [loop|scroll]
#   scroll mode adds frequent keyframes so seeking with the scroll bar stays smooth.
set -euo pipefail

SRC="${1:?Usage: npm run bg:encode -- path/to/video.mp4 [loop|scroll]}"
MODE="${2:-loop}"
OUT="public/bg"
mkdir -p "$OUT"

if [ "$MODE" = "scroll" ]; then GOP=(-g 6 -keyint_min 6 -sc_threshold 0); else GOP=(-g 60); fi

# Nearest-neighbour scaling keeps pixel art crisp instead of smearing it.
SCALE_FLAGS="flags=neighbor"

ffmpeg -y -loglevel error -i "$SRC" -an \
  -vf "scale='min(1920,iw)':-2:${SCALE_FLAGS},format=yuv420p" \
  -c:v libx264 -preset slow -crf 24 "${GOP[@]}" -movflags +faststart \
  "$OUT/background.mp4"

ffmpeg -y -loglevel error -i "$SRC" -an \
  -vf "scale=-2:'min(720,ih)':${SCALE_FLAGS},format=yuv420p" \
  -c:v libx264 -preset slow -crf 30 "${GOP[@]}" -movflags +faststart \
  "$OUT/background-mobile.mp4"

ffmpeg -y -loglevel error -i "$SRC" -frames:v 1 -vf "scale='min(1920,iw)':-2:${SCALE_FLAGS}" -q:v 3 \
  "$OUT/background-poster.jpg"

ls -lh "$OUT"
cat <<MSG

Done. Now set this in src/lib/data.ts:

export const background = {
  video: {
    src: '/bg/background.mp4',
    mobileSrc: '/bg/background-mobile.mp4',
    poster: '/bg/background-poster.jpg',
    mode: '$MODE',
    // credit: { name: '@artist', href: 'https://...' },
  },
};
MSG

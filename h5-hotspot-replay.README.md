# Hotspot Replay / Step Highlight

This increment adds guided review playback for hotspot-based visual questions.

## Added
- hotspot replay config: `h5-mvp-react/src/lib/hotspotPlayback.ts`
- figure renderer review playback with step chips, auto-flash, answer mask toggle
- play page review panel copy for visual replay
- styles for replay states and wrong/correct hotspot overlay

## Current questions with guided replay
- `36Y-4` count gray dots
- `36Y-10` count squares by layer
- `34W-19` patch missing tiles
- `36Y-16` hidden cubes / occlusion

## Review behavior
When a hotspot question is judged wrong and the user opens review:
1. the figure enters review mode
2. correct answer hotspots can be shown as a base mask
3. wrong user selections stay visible in red
4. replay steps flash related hotspots in sequence
5. step chips can be clicked for manual walkthrough

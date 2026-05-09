# PWA Icons

## Required PNG Icons

For full PWA support on Android and iOS, convert the SVG icons to PNG in these sizes:

| Size | File | Purpose |
|------|------|---------|
| 72x72 | `public/icons/icon-72x72.png` | Android |
| 96x96 | `public/icons/icon-96x96.png` | Android, Favicon |
| 128x128 | `public/icons/icon-128x128.png` | Chrome |
| 144x144 | `public/icons/icon-144x144.png` | Android |
| 152x152 | `public/icons/icon-152x152.png` | iPad |
| 192x192 | `public/icons/icon-192x192.png` | Android, iOS |
| 384x384 | `public/icons/icon-384x384.png` | Android |
| 512x512 | `public/icons/icon-512x512.png` | Android, Splash |

## How to Convert

### Option 1: Online Tool (Easiest)
1. Go to [cloudconvert.com/svg-to-png](https://cloudconvert.com/svg-to-png)
2. Upload `public/icons/icon.svg`
3. Set width/height to each size above
4. Download and save to `public/icons/`

### Option 2: Figma (Design Tool)
1. Import `public/icons/icon.svg` into Figma
2. Export at each required size
3. Save to `public/icons/`

### Option 3: macOS/Linux Terminal
```bash
# Install ImageMagick
brew install imagemagick

# Generate all sizes
for size in 72 96 128 144 152 192 384 512; do
  convert public/icons/icon.svg -resize ${size}x${size} public/icons/icon-${size}x${size}.png
done
```

## Splash Screens (iOS)

Generate splash screens for these iPhone/iPad sizes:
- 2048x2732 (iPad Pro 12.9")
- 1668x2388 (iPad Pro 11")
- 1536x2048 (iPad Mini/Air)
- 1170x2532 (iPhone 14/13 Pro)
- 1125x2436 (iPhone X/XS/11 Pro)
- 750x1334 (iPhone SE/8)

Use the same dark background (#0c0a09) with the icon centered.

## Current Status

✅ manifest.json — configured with all icon sizes
✅ service worker — caches static pages for offline
✅ install prompt — Android Chrome install banner
✅ offline banner — shows when connection is lost
✅ Apple meta tags — splash screen, status bar, standalone mode

❌ PNG icons — need to be generated from SVG (see above)
❌ Splash screen images — need to be generated

The app will work as a PWA even without PNG icons, but the install prompt and home screen icon will look better with them.

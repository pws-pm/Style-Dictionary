# Design Tokens and SVG Export Instructions

## Figma: Export Design Tokens

1. **Export JSON with Design Tokens Plugin**: 
   - Plugin link: [Design Tokens](https://www.figma.com/community/plugin/888356646278934516/design-tokens)
   - When exporting to file, exclude:
     - Typography (as it is redundant in font styles)
     - Grids (are used in Figma just as helper for icons etc)

## Project Setup: Install Style Dictionary

1. **Navigate to the Project Folder**
2. **Install Style Dictionary Locally**: 
   - Run `npm install style-dictionary`

## Build with Style Dictionary

1. **Launch Style Dictionary Locally**: 
   - Run `npx style-dictionary build`

## Figma: Export SVGs

1. **Export SVG with Frame Exporter Plugin**:
   - Plugin link: [Frame Exporter](https://www.figma.com/community/plugin/1074101625913782131/frame-exporter)
   - Settings for export:
     - File name format: `$F-$V`
     - Case: Kebab
     - Join variants with: `-`
     - File type: SVG

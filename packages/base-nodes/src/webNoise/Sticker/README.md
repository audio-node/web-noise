# Sticker (Text Annotation)

## Overview

The Sticker node is a visual annotation component that displays formatted text using Markdown syntax. This interface-only node has no audio functionality and is used for adding notes, documentation, labels, and explanations to audio patches, commonly used for documenting complex signal flows, explaining parameter settings, or creating instructional content.

## Usage

The Sticker node provides a rich text display area that supports Markdown formatting. It's purely a visual element with no audio inputs or outputs.

```typescript
// Sticker is configured through the UI or node data
const stickerData = {
  values: {
    text: `# My Synthesizer Patch

This is a **bass synthesizer** with the following features:
- Two oscillators in unison
- Low-pass filter at 500Hz
- ADSR envelope with quick attack

## Usage
1. Connect MIDI keyboard to trigger
2. Adjust filter cutoff for brightness
3. Modify envelope release for sustain`
  },
  config: {
    transparentBackground: false,
    backgroundColor: "#1a1a1a",
    textColor: "#ffffff",
    size: { width: 280, height: 150 }
  }
};

// Stickers are created through the UI
// Double-click to edit the text content
```

## Interface

### Inputs

The Sticker node has no audio inputs. It is a pure visual component.

### Outputs

The Sticker node has no audio outputs. It is a pure visual component.

### Configuration

- **text**: Markdown-formatted text content displayed in the sticker
- **transparentBackground**: Boolean flag to enable/disable transparent background
- **backgroundColor**: Background color for the sticker (when not transparent)
- **textColor**: Text color for the content
- **size**: Dimensions of the sticker (width and height in pixels)

### Methods

The Sticker node is a visual component and has no audio-related methods.

## Implementation

The Sticker node is implemented as a pure React component with no audio processing capabilities. Unlike other nodes in the system, it has `audioNode: false` in its configuration, indicating it does not participate in the Web Audio graph.

The component renders Markdown-formatted text using the `marked` library, allowing for rich text formatting including headings, bold, italic, lists, code blocks, and other Markdown features. The text is displayed in a scrollable container that adapts to the configured size.

The sticker supports customizable styling through its configuration, including background color, text color, and transparency options. When transparent background is enabled, the sticker blends with the canvas background, creating a floating text effect.

Double-clicking the sticker opens an editor where users can modify the text content. The Markdown is parsed and rendered in real-time, providing a live preview of the formatted content. This makes stickers ideal for creating documentation within patches, explaining signal routing, noting parameter values, or providing usage instructions.

Common use cases include documenting patch intent, labeling sections of complex signal flows, providing reminders about parameter ranges, creating tutorials or instructional patches, and adding credits or version information to saved projects.

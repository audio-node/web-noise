# Web-Noise Integration Guide

This guide explains how to integrate Web-Noise components into your React application.

## Installation

```bash
# Install the core package
npm install @web-noise/core

# Install the base nodes package
npm install @web-noise/base-nodes
```

## Basic Integration

Here's a simple example of how to integrate the Web-Noise Editor into your React application:

```jsx
import React from 'react';
import { Editor } from '@web-noise/core';
import { 
  webAudioNodes, 
  webNoiseNodes, 
  patchNodes, 
  scriptNodes 
} from '@web-noise/base-nodes';

const MyWebNoiseApp = () => {
  return (
    <div className="my-app">
      <h1>My Web Noise Application</h1>
      <div style={{ width: '100%', height: '800px' }}>
        <Editor 
          plugins={[webAudioNodes, webNoiseNodes, patchNodes, scriptNodes]} 
        />
      </div>
    </div>
  );
};

export default MyWebNoiseApp;
```

## Selective Node Types

You can choose to include only specific node types:

```jsx
import React from 'react';
import { Editor } from '@web-noise/core';
import { webAudioNodes, webNoiseNodes } from '@web-noise/base-nodes';

const MyWebNoiseApp = () => {
  return (
    <div className="my-app">
      <h1>My Web Noise Application</h1>
      <div style={{ width: '100%', height: '800px' }}>
        <Editor 
          plugins={[webAudioNodes, webNoiseNodes]} 
        />
      </div>
    </div>
  );
};

export default MyWebNoiseApp;
```

## Custom Theme

You can customize the theme:

```jsx
import React from 'react';
import { Editor, theme as defaultTheme } from '@web-noise/core';
import { webAudioNodes } from '@web-noise/base-nodes';

const customTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#ff5500',
    background: '#121212',
  }
};

const MyWebNoiseApp = () => {
  return (
    <Editor 
      plugins={[webAudioNodes]} 
      theme={customTheme}
    />
  );
};

export default MyWebNoiseApp;
```

## Development

To develop both packages simultaneously:

1. Clone the repository
2. Install dependencies: `yarn install`
3. Start the development server: `yarn start`

To build individual packages:

```bash
# Build core package
yarn build:core

# Build base-nodes package
yarn build:base-nodes

# Build all packages
yarn build:packages
```
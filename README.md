<img width="100%" alt="design-system-cover" src="https://github.com/hellojulian/design-system/assets/10652039/fa34ae50-ae9b-4af7-bcce-ca5393f496f0"/>

<ul>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white" />
</ul>

# Welcome to Design System

Design System is a professionally crafted UI Kit for design & development teams, and individuals. We provide core components you would need in every project, focusing on accessibility, development experience and unified designer-developer experience.

We've made sure that Figma variables and CSS variables work together effortlessly. They share the same names, usage and inheritance structure. This isn't just an extra feature, **it's the core approach.**

Each Figma variable has a direct counterpart in CSS, so there's no confusion. The design stays crystal clear as you move into the development phase.

<ul>
  <li>Website: www.design-system.com</li>
  <li>Figma Library: https://www.figma.com/community/file/1338456115232271694</li>
  <li>Storybook: https://hellojulian.github.io/design-system</li>
  <li>Github: www.github.com/hellojulian/design-system</li>
  <li>Npm: www.npmjs.com/package/design-system</li>
</ul>


# Setup
### Install
Install the latest version from NPM.
```
npm install design-system
```

### Setup CSS
Import the design-system CSS file into your project in your css file
```css
@import 'design-system/style';

html {
  ...
```
you can also import the CSS file directly into your main React App file
```js
import React, { Component } from 'react'
import 'design-system/style';

class App extends Component {
  ...
```

### Customizing Theme
You can customize the theme by overriding the CSS variables. You can find the list of variables in the [theme file](https://github.com/hellojulian/design-system/blob/main/src/css/theme-colors.css)
```css
:root {
  --ds-color-brand: var(--ds-color-green-700);
}

[data-theme="dark"],
[data-theme="dark"] * {
  --ds-color-brand: var(--ds-color-green-500);
}
...
```

### Using Components
You can use the components by importing them into your React App file
```js
import React, { Component } from 'react'
import { dsBadge } from 'design-system/ds-badge';

function App() {
  return (
    <div>
      <dsBadge label='label' />
    </div>
  );
}
```

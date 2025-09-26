# Design Token Architecture

This design system uses a **three-tier semantic token architecture** that provides flexibility, maintainability, and automatic theme and state handling across all components.

## Token Structure Overview

```
Primitive Tokens → Semantic Tokens → Contextual Tokens → Components
```

### 1. Primitive Tokens (Foundation Layer)
**File:** `src/css/global-colors.css`

These are the raw color values organized by color family with numeric scales (50-950):

```css
--ds-color-blue-50: #F0F4FF;
--ds-color-blue-500: #6187FA;
--ds-color-blue-900: #1D4BD6;

--ds-color-neutral-50: #f2f2f3;
--ds-color-neutral-500: #676770;
--ds-color-neutral-900: #121214;
```

**Color Families:**
- `neutral` (grayscale)
- `blue` (primary brand colors)
- `purple` (accent colors) 
- `green` (success states)
- `red` (error/danger states)
- `yellow` (attention/warning states)
- `brown` (secondary accent)

### 2. Semantic Tokens (Theme Layer)
**File:** `src/css/theme-colors.css`

These tokens define **what** colors are used for **semantic purposes** and handle light/dark theme switching:

#### Background Tokens
```css
--ds-color-background-base: #ffffff;        /* Main app background */
--ds-color-background-elevated: #ffffff;    /* Cards, modals, popovers */
--ds-color-background-subdued: var(--ds-color-neutral-100); /* Muted backgrounds */
```

#### Foreground Tokens
```css
--ds-color-foreground-default: var(--ds-color-neutral-900);  /* Body text */
--ds-color-foreground-soft: var(--ds-color-neutral-600);     /* Secondary text */
--ds-color-foreground-primary: var(--ds-color-brand);        /* Brand text */
```

#### Status Tokens
```css
--ds-color-status-success: var(--ds-color-green-800);
--ds-color-status-danger: var(--ds-color-red-700);
--ds-color-status-attention: var(--ds-color-brown-600);
```

#### Component-Specific Tokens
```css
--ds-color-badge-blue-bg: var(--ds-color-blue-100);
--ds-color-button-primary-bg-neutral: var(--ds-color-brand);
--ds-color-button-secondary-border-destructive: var(--ds-color-red-50);
```

**Automatic Dark Mode:** All semantic tokens automatically switch values when `[data-theme="dark"]` is applied.

### 3. Contextual Tokens (State Layer)
**File:** `src/css/disableable-colors.css`

These tokens handle **component states** like disabled, focus, and hover automatically:

#### Default State
```css
[class*="ds"] {
  --ds-disableable-color-foreground-default: var(--ds-color-foreground-default);
  --ds-disableable-color-background-base: var(--ds-color-background-base);
  --ds-disableable-color-divider-solid: var(--ds-color-divider-solid);
}
```

#### Disabled State
```css
[class*="ds"].ds-disabled * {
  --ds-disableable-color-foreground-default: var(--ds-color-disabled-text);
  --ds-disableable-color-background-base: var(--ds-color-disabled-bg);
  --ds-disableable-color-state-hover: #FFFFFF00; /* Removes hover effects */
}
```

## Token Usage in Components

Components use **contextual tokens** to automatically inherit correct colors for all states:

```css
/* ❌ Don't use primitive tokens directly */
.ds-button {
  color: var(--ds-color-neutral-900);
}

/* ❌ Don't use semantic tokens in components */
.ds-button {
  color: var(--ds-color-foreground-default);
}

/* ✅ Use contextual tokens */
.ds-button {
  color: var(--ds-disableable-color-foreground-default);
}
```

### Benefits of This Approach

1. **Automatic State Handling**: Components automatically get disabled styling when `.ds-disabled` class is applied
2. **Theme Switching**: All components automatically support light/dark themes
3. **Consistency**: All components using the same semantic token stay consistent
4. **Maintainability**: Change one token to update all components using that semantic meaning

## Token Naming Convention

### Primitive Tokens
```
--ds-color-{family}-{scale}
```
- `family`: blue, neutral, red, green, etc.
- `scale`: 50 (lightest) to 950 (darkest)

### Semantic Tokens
```
--ds-color-{category}-{variant}-{modifier}
```
- `category`: background, foreground, button, badge, status, etc.
- `variant`: default, primary, secondary, success, danger, etc.
- `modifier`: subtle, soft, light, etc. (optional)

### Contextual Tokens
```
--ds-disableable-color-{semantic-token-name}
```
- Mirrors semantic token names but adds automatic state handling

## Usage Examples

### Component CSS
```css
.ds-text-input {
  background: var(--ds-disableable-color-background-base);
  color: var(--ds-disableable-color-foreground-default);
  border: 1px solid var(--ds-disableable-color-divider-solid);
}

.ds-text-input:hover {
  border-color: var(--ds-disableable-color-state-hover);
}
```

### Component States
```jsx
// Disabled state automatically handled by CSS
<DsTextInput disabled={true} />
// When disabled=true, component gets .ds-disabled class
// All --ds-disableable-color-* tokens automatically switch to disabled values
```

### Theme Switching
```jsx
// Theme switching handled by data attribute
<div data-theme="dark">
  <DsButton>Button text</DsButton> {/* Automatically uses dark theme colors */}
</div>
```

## Token Architecture Benefits

### Scalability
- Easy to add new themes (just add new `[data-theme="theme-name"]` rules)
- New components automatically inherit all theme and state handling
- Centralized color management

### Maintainability  
- Single source of truth for colors
- Semantic naming makes intent clear
- Automatic state management reduces CSS complexity

### Consistency
- All components using same semantic tokens stay consistent
- Impossible to accidentally use wrong colors for states
- Theme switching affects entire system uniformly

### Developer Experience
- Clear naming conventions
- Predictable behavior
- Less CSS to write per component
- Automatic accessibility considerations (disabled states, contrast)

## Migration Guide

If converting from direct color usage to this token system:

1. **Replace primitive colors** with semantic tokens
2. **Replace semantic tokens** with disableable tokens in components
3. **Add `.ds-disabled` class handling** to component logic
4. **Test all states** (default, hover, disabled, dark theme)

This token architecture provides a robust foundation for consistent, maintainable, and accessible design systems while minimizing the complexity that component authors need to handle.
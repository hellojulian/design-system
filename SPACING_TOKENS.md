# Spacing Tokens

This design system uses a structured spacing token system that provides consistent layout, sizing, and visual rhythm across all components and layouts.

## Token Categories

### 1. Space Tokens (`--ds-space-*`)
**Purpose:** General spacing for margins, padding, gaps, and layout spacing

### 2. Control Height Tokens (`--ds-control-height-*`) 
**Purpose:** Consistent heights for interactive elements like buttons, inputs, and controls

### 3. Radius Tokens (`--ds-radius-*`)
**Purpose:** Border radius values for consistent corner rounding and visual hierarchy

## Space Tokens

**File:** `src/css/layout.css`

Space tokens follow a progressive scale for consistent spacing relationships:

```css
--ds-space-xxs: 2px;   /* Micro spacing - fine details */
--ds-space-xs: 4px;    /* Tight spacing - related elements */
--ds-space-sm: 6px;    /* Small spacing - component internal spacing */
--ds-space-md: 8px;    /* Medium spacing - default component spacing */
--ds-space-lg: 12px;   /* Large spacing - section spacing */
--ds-space-xlg: 16px;  /* Extra large - major section breaks */
--ds-space-xxlg: 20px; /* Extra extra large - layout spacing */
```

### Usage Guidelines

#### Micro Spacing (`xxs` - 2px)
- Fine-tuning element positioning
- Border offsets
- Icon adjustments
- Minimal visual separations

```css
/* Icon positioning */
.icon-offset {
  transform: translateX(var(--ds-space-xxs));
}
```

#### Tight Spacing (`xs` - 4px)
- Closely related elements
- Icon-to-text spacing
- Badge padding
- Form element internal spacing

```css
/* Icon and text spacing */
.button-content {
  gap: var(--ds-space-xs);
}
```

#### Small Spacing (`sm` - 6px)
- Component internal spacing
- Related form elements
- List item spacing
- Small component padding

```css
/* Component internal spacing */
.ds-option-group {
  gap: var(--ds-space-sm);
}
```

#### Medium Spacing (`md` - 8px)
- Default component spacing
- Standard padding
- Element separation within components
- Default gaps

```css
/* Standard component padding */
.ds-button-medium {
  padding: var(--ds-space-md) var(--ds-space-lg);
}
```

#### Large Spacing (`lg` - 12px)
- Component separation
- Form section spacing  
- Modal content spacing
- Card padding

```css
/* Modal content spacing */
.ds-modal-content {
  gap: var(--ds-space-lg);
}
```

#### Extra Large Spacing (`xlg` - 16px)
- Major section breaks
- Page section spacing
- Large component padding
- Layout spacing

```css
/* Major section spacing */
.page-section + .page-section {
  margin-top: var(--ds-space-xlg);
}
```

#### Extra Extra Large Spacing (`xxlg` - 20px)
- Layout-level spacing
- Page margins
- Major component padding
- Container spacing

```css
/* Container padding */
.ds-modal {
  padding: var(--ds-space-xxlg);
}
```

## Control Height Tokens

Control height tokens ensure consistent sizing for all interactive elements:

```css
--ds-control-height-sm: 28px;  /* Compact controls */
--ds-control-height-md: 40px;  /* Standard controls */
--ds-control-height-lg: 50px;  /* Prominent controls */
```

### Usage Guidelines

#### Small Controls (`sm` - 28px)
- Compact buttons
- Small inputs
- Toolbar controls
- Secondary actions
- Close buttons

```css
/* Close button sizing */
.ds-modal-close {
  width: var(--ds-control-height-sm);
  height: var(--ds-control-height-sm);
}
```

#### Medium Controls (`md` - 40px)
- Default button size
- Standard form inputs  
- Primary controls
- Most interactive elements

```css
/* Standard button height */
.ds-button-medium {
  height: var(--ds-control-height-md);
}
```

#### Large Controls (`lg` - 50px)
- Prominent buttons
- Hero CTAs
- Large touch targets
- Primary form elements
- Mobile-first controls

```css
/* Large touch-friendly button */
.ds-button-large {
  height: var(--ds-control-height-lg);
}
```

## Radius Tokens

Radius tokens create visual hierarchy and consistent corner treatments:

```css
--ds-radius-xs: 2px;     /* Subtle rounding */
--ds-radius-sm: 4px;     /* Small rounding - cards, inputs */  
--ds-radius-md: 6px;     /* Medium rounding - buttons */
--ds-radius-lg: 8px;     /* Large rounding - modals */
--ds-radius-xlg: 16px;   /* Extra large rounding - hero elements */
--ds-radius-xxlg: 24px;  /* Extra extra large - special elements */
--ds-radius-round: 1000px; /* Fully rounded - pills, avatars */
```

### Usage Guidelines

#### Subtle Rounding (`xs` - 2px)
- Minimal visual softening
- Table cells
- Code blocks
- Border details

```css
/* Subtle border rounding */
.code-block {
  border-radius: var(--ds-radius-xs);
}
```

#### Small Rounding (`sm` - 4px)
- Cards and containers
- Form inputs
- Small components
- Content areas

```css
/* Input field rounding */
.ds-text-input-input {
  border-radius: var(--ds-radius-sm);
}
```

#### Medium Rounding (`md` - 6px)
- Buttons
- Navigation elements  
- Interactive components
- Default component rounding

```css
/* Button rounding */
.ds-button {
  border-radius: var(--ds-radius-md);
}
```

#### Large Rounding (`lg` - 8px)
- Modals and dialogs
- Large containers
- Feature cards
- Prominent elements

```css
/* Modal rounding */
.ds-modal {
  border-radius: var(--ds-radius-lg);
}
```

#### Extra Large Rounding (`xlg` - 16px)
- Hero sections
- Large cards
- Special containers
- Brand elements

```css
/* Large feature card */
.hero-card {
  border-radius: var(--ds-radius-xlg);
}
```

#### Extra Extra Large Rounding (`xxlg` - 24px)
- Very large containers
- Special design elements
- Brand-focused components

```css
/* Special brand element */
.brand-container {
  border-radius: var(--ds-radius-xxlg);
}
```

#### Fully Rounded (`round` - 1000px)
- Circular elements
- Pills and badges
- Avatar containers
- Toggle switches

```css
/* Pill-shaped button */
.ds-toggle {
  border-radius: var(--ds-radius-round);
}
```

## Token Relationships

### Mathematical Relationships
The spacing scale follows intentional mathematical relationships:

```
xxs(2) → xs(4) = 2x multiplier
xs(4) → sm(6) = 1.5x multiplier  
sm(6) → md(8) = 1.33x multiplier
md(8) → lg(12) = 1.5x multiplier
lg(12) → xlg(16) = 1.33x multiplier
xlg(16) → xxlg(20) = 1.25x multiplier
```

This creates natural visual rhythm while avoiding overly rigid doubling that can create too much visual jumps.

### Combination Patterns
Common token combinations for specific use cases:

```css
/* Card component */
.card {
  padding: var(--ds-space-lg);           /* Internal spacing */
  border-radius: var(--ds-radius-sm);    /* Corner rounding */
  margin-bottom: var(--ds-space-xlg);    /* Card separation */
}

/* Button component */
.button {
  height: var(--ds-control-height-md);   /* Touch target */
  padding: 0 var(--ds-space-lg);         /* Horizontal padding */
  border-radius: var(--ds-radius-md);    /* Corner rounding */
  gap: var(--ds-space-xs);               /* Icon-text gap */
}

/* Form section */
.form-section {
  margin-bottom: var(--ds-space-xxlg);   /* Section separation */
}

.form-section .field + .field {
  margin-top: var(--ds-space-lg);        /* Field separation */
}
```

## Usage Best Practices

### Do's
- **Use tokens consistently** - Don't mix token values with arbitrary spacing
- **Choose semantic sizes** - Select tokens based on the relationship between elements
- **Maintain hierarchy** - Use larger spacing for more important separations
- **Test on mobile** - Ensure spacing works across all device sizes

### Don'ts
- **Don't use arbitrary values** - Always use spacing tokens
- **Don't skip scale steps** - Use adjacent tokens for related spacing needs
- **Don't mix scales** - Stay consistent within component families
- **Don't ignore touch targets** - Use appropriate control heights for interactive elements

### Examples

```css
/* ✅ Good - Using semantic tokens */
.component {
  padding: var(--ds-space-lg);
  gap: var(--ds-space-md);
  border-radius: var(--ds-radius-sm);
}

/* ❌ Bad - Arbitrary values */
.component {
  padding: 14px;
  gap: 9px;
  border-radius: 3px;
}

/* ✅ Good - Consistent hierarchy */
.card {
  padding: var(--ds-space-lg);        /* Internal spacing */
}
.card + .card {
  margin-top: var(--ds-space-xlg);    /* Larger gap between cards */
}

/* ❌ Bad - Inconsistent relationships */
.card {
  padding: var(--ds-space-xxlg);      /* Too much internal space */
}
.card + .card {
  margin-top: var(--ds-space-xs);     /* Too little separation */
}
```

## Responsive Considerations

While spacing tokens are fixed values, they're designed to work across all screen sizes:

- **Mobile-first design** - All tokens provide adequate touch targets
- **Consistent relationships** - Token relationships maintain visual hierarchy at all sizes  
- **Accessibility** - Control heights meet minimum 44px touch target recommendations
- **Flexibility** - Use CSS techniques like `clamp()` or media queries when responsive spacing is needed

```css
/* Responsive spacing when needed */
.responsive-container {
  padding: clamp(var(--ds-space-md), 4vw, var(--ds-space-xxlg));
}
```

## Component Integration

Spacing tokens integrate seamlessly with the design system's other token layers:

```css
/* Full integration example */
.ds-button {
  /* Spacing tokens */
  height: var(--ds-control-height-md);
  padding: 0 var(--ds-space-lg);
  border-radius: var(--ds-radius-md);
  gap: var(--ds-space-xs);
  
  /* Color tokens */
  background: var(--ds-disableable-color-button-primary-bg-neutral);
  color: var(--ds-disableable-color-foreground-light);
  
  /* Typography tokens */
  font: var(--running-small-bold);
}
```

This spacing token system provides the foundation for consistent, scalable, and maintainable layouts throughout the design system.
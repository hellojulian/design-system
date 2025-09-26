# Accessibility Guidelines

This design system is built with accessibility as a core principle, following **WCAG 2.1 Level AA** standards to ensure inclusive experiences for all users.

## Accessibility Standards

### WCAG 2.1 Level AA Compliance
All components are designed and tested to meet the following success criteria:

**Perceivable**
- 1.4.3 Contrast (Minimum) - 4.5:1 contrast ratio for normal text
- 1.4.6 Contrast (Enhanced) - 7:1 contrast ratio where possible
- 1.4.11 Non-text Contrast - 3:1 contrast for UI components

**Operable** 
- 2.1.1 Keyboard - All functionality available via keyboard
- 2.4.6 Headings and Labels - Descriptive labels and headings
- 2.4.7 Focus Visible - Clear focus indicators

**Understandable**
- 3.2.2 On Input - Predictable functionality
- 3.3.2 Labels or Instructions - Clear form labeling

**Robust**
- 4.1.2 Name, Role, Value - Proper semantic markup and ARIA

## Component Accessibility Features

### Form Components

#### Text Input (`DsTextInput`)
- **Semantic HTML**: Uses `<input>` with proper `type` attributes
- **Labeling**: Supports `label`, `ariaLabel`, and `ariaLabelledBy`
- **State Communication**: `aria-invalid` for error states, `aria-required` for required fields
- **Status Messages**: `aria-describedby` links to status/error messages
- **Focus Management**: Clear focus indicators with `outline` styles

#### Radio Button (`DsRadio`)
- **Semantic HTML**: Uses native `<input type="radio">` elements
- **Grouping**: Proper `name` attribute for radio groups
- **State Communication**: `aria-checked` and `disabled` attributes
- **Focus Management**: Keyboard navigation with Tab/Arrow keys
- **Screen Reader Support**: Hidden native input with custom visual indicator

#### Checkbox (`DsCheckbox`)
- **Semantic HTML**: Uses native `<input type="checkbox">`
- **State Communication**: `aria-checked` for indeterminate states
- **Labeling**: Supports `label` element association
- **Focus Management**: Clear focus indicators

#### Select (`DsSelect`)
- **Semantic HTML**: Uses native `<select>` element
- **Labeling**: Proper `label` association
- **State Communication**: `aria-invalid` for error states
- **Keyboard Navigation**: Standard arrow key navigation

#### Toggle (`DsToggle`)
- **Semantic Structure**: Uses `<fieldset>` and `<legend>` for grouping
- **Radio Group Pattern**: Implements proper radio group with `role="radiogroup"`
- **Keyboard Navigation**: Arrow keys, Home/End for navigation
- **State Management**: `aria-expanded` and `aria-checked` states
- **Focus Management**: Clear focus indicators with outline

### Interactive Components

#### Button (`DsButton`)
- **Semantic HTML**: Uses `<button>` element
- **State Communication**: `aria-pressed` for toggle buttons, `aria-expanded` for menus
- **Disabled State**: Proper `disabled` attribute and visual styling
- **Icon Buttons**: `aria-label` for icon-only buttons
- **Loading State**: `aria-live` announcements for state changes

#### Accordion (`DsAccordion`)
- **Semantic Structure**: Uses `<button>` for headers
- **State Communication**: `aria-expanded` indicates open/closed state
- **Content Association**: `aria-controls` links header to content
- **Keyboard Navigation**: Enter/Space to toggle, Tab for focus
- **Focus Management**: Maintains focus on header after toggle
- **Screen Reader Support**: `aria-hidden` hides collapsed content

#### Modal (`DsModal`)
- **Focus Management**: Traps focus within modal, returns focus on close
- **Keyboard Navigation**: Escape key to close, Tab for internal navigation
- **Screen Reader Support**: `aria-modal`, `aria-labelledby`, `aria-describedby`
- **Background Interaction**: Prevents interaction with background content
- **Semantic Structure**: Uses `<dialog>` element where supported

### Display Components

#### Notification (`DsNotification`)
- **Live Regions**: Uses `aria-live` for dynamic announcements
- **Semantic Structure**: Proper heading hierarchy
- **Dismissible**: Clear close button with accessible name
- **Status Communication**: Role and status attributes for different types

#### Status Message (`DsStatusMessage`)
- **Semantic Meaning**: Uses appropriate `role` attributes
- **Visual Indicators**: Icons combined with text (not color alone)
- **Association**: Links to form fields via `aria-describedby`

## Color and Contrast

### Color Accessibility
- **Never color alone**: All status/state information includes visual indicators beyond color
- **High contrast**: All text meets WCAG AA contrast requirements (4.5:1 minimum)
- **Color blind friendly**: Interface remains functional with color vision deficiencies

### Dark Mode Support
- **Automatic contrast**: Dark theme maintains proper contrast ratios
- **Consistent patterns**: All accessibility features work in both light and dark modes
- **User preference**: Respects `prefers-color-scheme` media query

## Focus Management

### Focus Indicators
```css
.ds-component:focus-visible {
  outline: 2px solid var(--ds-color-state-focus);
  outline-offset: 2px;
}
```

### Focus Patterns
- **Visible focus**: All interactive elements have clear focus indicators
- **Logical order**: Tab order follows visual layout
- **Skip links**: Provided where appropriate for navigation
- **Focus trapping**: Implemented in modals and complex components

## Keyboard Navigation

### Standard Patterns
- **Tab**: Navigate between focusable elements
- **Enter/Space**: Activate buttons and toggle states  
- **Arrow Keys**: Navigate within component groups (radio, select options)
- **Escape**: Close modals, dropdowns, and cancel actions
- **Home/End**: Jump to first/last item in lists

### Component-Specific Navigation
- **Toggle**: Arrow keys navigate between options
- **Modal**: Tab cycles within modal, Escape closes
- **Accordion**: Enter/Space toggles, focus stays on header

## Screen Reader Support

### ARIA Labels and Descriptions
```jsx
// Descriptive labeling
<DsTextInput 
  label="Email Address"
  ariaDescribedBy="email-help"
  status={{ type: "invalid", message: "Please enter a valid email" }}
/>

// Custom accessible names
<DsButton 
  icon={<CloseIcon />}
  ariaLabel="Close notification"
/>
```

### Live Regions
```jsx
// Status announcements
<DsNotification 
  type="success" 
  ariaLive="polite"  // Announced when convenient
/>

<DsNotification 
  type="error" 
  ariaLive="assertive"  // Announced immediately
/>
```

## Testing Accessibility

### Automated Testing
- **axe-core**: Integrated into component tests
- **Storybook a11y addon**: Visual accessibility testing
- **CI/CD pipeline**: Automated accessibility checks

### Manual Testing
- **Keyboard only**: Navigate entire interface using only keyboard
- **Screen reader**: Test with NVDA, JAWS, and VoiceOver
- **High contrast**: Verify visibility in high contrast mode
- **Zoom**: Test at 200% zoom level

### Testing Checklist
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are clearly visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen readers announce content appropriately
- [ ] Error states are communicated to assistive technology
- [ ] Form labels are properly associated
- [ ] Modal focus is managed correctly

## Implementation Guidelines

### For Developers
1. **Use semantic HTML** - Start with proper HTML elements
2. **Progressive enhancement** - Ensure basic functionality without JavaScript
3. **Test early and often** - Include accessibility in development workflow
4. **Provide alternatives** - Audio, visual, and tactile alternatives where needed

### For Designers
1. **Design for keyboard** - Ensure all interactions work without mouse
2. **Consider focus states** - Design clear focus indicators
3. **Use sufficient contrast** - Check contrast ratios in design tools
4. **Design error states** - Show clear error communication patterns

### For Content Authors
1. **Write descriptive labels** - Make button and link text meaningful
2. **Provide context** - Help users understand where they are and what's expected
3. **Use headings properly** - Create logical heading hierarchies
4. **Alt text for images** - Describe images meaningfully or mark decorative

## Resources and Tools

### Testing Tools
- **axe DevTools**: Browser extension for accessibility testing
- **WAVE**: Web accessibility evaluation tool  
- **Color Oracle**: Color blindness simulator
- **Screen readers**: NVDA (Windows), VoiceOver (macOS), Orca (Linux)

### Design Tools
- **Stark**: Figma plugin for contrast checking
- **Color Contrast Analyzer**: Desktop tool for contrast testing
- **WebAIM Contrast Checker**: Online contrast ratio tool

### Guidelines and Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/resources/)

## Continuous Improvement

Accessibility is an ongoing process. We regularly:
- Review and test components with real users
- Update patterns based on new WCAG guidelines
- Gather feedback from accessibility community
- Improve documentation and implementation guides

This design system prioritizes inclusive design, ensuring that all users can effectively interact with digital products regardless of their abilities or the assistive technologies they use.
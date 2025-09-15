import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Smile } from 'lucide-react';

import { DsButton } from './ds-button';

const meta = {
  title: ' Components/Button',
  component: DsButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: "Help people take action by showing how significant they are using: primary, secondary or tertiary hierarchy. You might also need varying button sizes, depending on the interface's complexity. Use actionType to provide feedback about the outcome of actions."
      }
    }
  },
  argTypes: {
    icon: {
      control: 'boolean',
      name: '🔗 icon',
      mapping: {
        false: undefined,
        true: <Smile size={16} />
      }
    },
    iconRight: {
      control: 'boolean',
      name: '🔗 iconRight',
      mapping: {
        false: undefined,
        true: <Smile size={16} />
      }
    },
    label: {
      name: '🔗 label'
    },
    size: {
      name: '🔗 size'
    },
    hierarchy: {
      name: '🔗 hierarchy'
    },
    actionType: {
      name: '🔗 actionType'
    },
    disabled: {
      name: '🔗 disabled'
    },
    isLoading: {
      name: '🔗 isLoading'
    },
    className: {
      control: {
        disable: true
      }
    },
    ariaLabel: {
      control: {
        disable: true
      }
    }
  }
} satisfies Meta<typeof DsButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args: {
    label: 'Button'
  }
};

export const Icon: Story = {
  args: {
    label: 'Button'
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--ds-space-md)', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: 'var(--ds-space-md)' }}>
        <DsButton {...args} hierarchy='primary' size='medium' icon={<Smile size={16} />} />
        <DsButton {...args} hierarchy='primary' size='medium' icon={<Smile size={16} />} iconRight={<Smile size={16} />} />
        <DsButton {...args} hierarchy='primary' size='medium' iconRight={<Smile size={16} />} />
        <DsButton {...args} hierarchy='primary' size='medium' icon={<Smile size={16} />} label={undefined} />
      </div>
      <div style={{ display: 'flex', gap: 'var(--ds-space-md)' }}>
        <DsButton {...args} hierarchy='secondary' size='medium' icon={<Smile size={16} />} />
        <DsButton {...args} hierarchy='secondary' size='medium' icon={<Smile size={16} />} iconRight={<Smile size={16} />} />
        <DsButton {...args} hierarchy='secondary' size='medium' iconRight={<Smile size={16} />} />
        <DsButton {...args} hierarchy='secondary' size='medium' icon={<Smile size={16} />} label={undefined} />
      </div>
      <div style={{ display: 'flex', gap: 'var(--ds-space-lg)' }}>
        <DsButton {...args} hierarchy='tertiary' size='medium' icon={<Smile size={16} />} />
        <DsButton {...args} hierarchy='tertiary' size='medium' icon={<Smile size={16} />} iconRight={<Smile size={16} />} />
        <DsButton {...args} hierarchy='tertiary' size='medium' iconRight={<Smile size={16} />} />
        <DsButton {...args} hierarchy='tertiary' size='medium' icon={<Smile size={16} />} label={undefined} />
      </div>
    </div>
  ),
  name: 'Icon & Icon Right',
  parameters: {
    docs: {
      description: {
        story: 'Pass the `icon` or `iconRight` props to customize your button.'
      }
    }
  },
  argTypes: {
    icon: {
      table: {
        disable: true
      }
    },
    iconRight: {
      table: {
        disable: true
      }
    }
  }
};

export const Size: Story = {
  args: {
    label: 'Button'
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--ds-space-md)', alignItems: 'center' }}>
      <DsButton {...args} size='small' />
      <DsButton {...args} size='medium' />
      <DsButton {...args} size='large' />
    </div>
  ),
  name: 'Button Sizes',
  parameters: {
    docs: {
      description: {
        story: 'Use the `size` prop to change the size of the button.'
      }
    }
  },
  argTypes: {
    size: {
      table: {
        disable: true
      }
    }
  }
};

export const Hierarchy: Story = {
  args: {
    label: 'Button'
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--ds-space-md)' }}>
      <DsButton {...args} hierarchy='primary' />
      <DsButton {...args} hierarchy='secondary' />
      <DsButton {...args} hierarchy='tertiary' />
    </div>
  ),
  name: 'Button Hierarchies',
  parameters: {
    docs: {
      description: {
        story: 'Use the `hierarchy` prop to change the variant of the button.'
      }
    }
  },
  argTypes: {
    hierarchy: {
      table: {
        disable: true
      }
    }
  }
};

export const Type: Story = {
  args: {
    label: 'Button'
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--ds-space-md)', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: 'var(--ds-space-md)' }}>
        <DsButton {...args} hierarchy='primary' actionType='neutral' />
        <DsButton {...args} hierarchy='primary' actionType='success' />
        <DsButton {...args} hierarchy='primary' actionType='destructive' />
      </div>
      <div style={{ display: 'flex', gap: 'var(--ds-space-md)' }}>
        <DsButton {...args} hierarchy='secondary' actionType='neutral' />
        <DsButton {...args} hierarchy='secondary' actionType='success' />
        <DsButton {...args} hierarchy='secondary' actionType='destructive' />
      </div>
      <div style={{ display: 'flex', gap: 'var(--ds-space-lg)' }}>
        <DsButton {...args} hierarchy='tertiary' actionType='neutral' />
        <DsButton {...args} hierarchy='tertiary' actionType='success' />
        <DsButton {...args} hierarchy='tertiary' actionType='destructive' />
      </div>
    </div>
  ),
  name: 'Button Action Types',
  parameters: {
    docs: {
      description: {
        story: 'Use the `actionType` prop to change the color variant of the button.'
      }
    }
  },
  argTypes: {
    actionType: {
      table: {
        disable: true
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--ds-space-md)' }}>
      <DsButton {...args} size='small' />
      <DsButton {...args} size='small' isLoading={true} />
      <DsButton {...args} />
      <DsButton {...args} size='large' />
      <DsButton {...args} hierarchy='tertiary' />
    </div>
  ),
  args: {
    label: 'Button',
    disabled: true
  },
  argTypes: {
    disabled: {
      table: {
        disable: true
      }
    }
  }
};

export const Loading: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--ds-space-md)' }}>
      <DsButton {...args} hierarchy='primary' />
      <DsButton {...args} hierarchy='secondary' />
      <DsButton {...args} hierarchy='tertiary' />
    </div>
  ),
  args: {
    label: 'Button',
    isLoading: true
  },
  argTypes: {
    isLoading: {
      table: {
        disable: true
      }
    }
  }
};

export const Accessibility: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--ds-space-lg)', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: 'var(--ds-space-md)', alignItems: 'center' }}>
        <DsButton label="Standard Button" onClick={() => alert('Button clicked')} />
        <DsButton icon={<Smile size={16} />} ariaLabel="Like this post" onClick={() => alert('Liked')} />
        <DsButton label="Delete Item" actionType="destructive" onClick={() => alert('Item deleted')} />
        <DsButton label="Processing..." isLoading={true} />
        <DsButton label="Disabled Button" disabled={true} />
      </div>
    </div>
  ),
  name: 'Accessibility',
  parameters: {
    docs: {
      description: {
        story: `
## Accessibility Features

This component follows WCAG 2.1 AA guidelines and implements the following accessibility features:

### WCAG Compliance
- **2.1.1 Keyboard**: All buttons are keyboard accessible via Tab and Enter/Space keys
- **2.4.6 Headings and Labels**: Descriptive labels provided via \`label\` or \`ariaLabel\` props
- **3.2.2 On Input**: Button actions are predictable and don't cause unexpected context changes
- **4.1.2 Name, Role, Value**: Proper semantic button element with accessible name and state

### ARIA Attributes
- \`role="button"\` - Implicit from semantic \`<button>\` element
- \`aria-label\` - For icon-only buttons or custom accessible names
- \`aria-disabled\` - Indicates disabled state to screen readers
- \`aria-busy\` - Indicates loading state
- \`aria-live="polite"\` - Announces loading state changes
- \`aria-hidden="true"\` - Hides decorative icons from screen readers

### Keyboard Navigation
- **Tab**: Focus navigation
- **Enter/Space**: Activate button
- **Escape**: Remove focus (browser default)

### Implementation
\`\`\`tsx
// Standard button with text label
<DsButton 
  label="Save Changes" 
  onClick={handleSave} 
/>

// Icon-only button (requires ariaLabel)
<DsButton 
  icon={<SaveIcon />} 
  ariaLabel="Save document" 
  onClick={handleSave} 
/>

// Loading state button
<DsButton 
  label="Saving..." 
  isLoading={true}
  disabled={true}
/>

// Destructive action
<DsButton 
  label="Delete Item" 
  actionType="destructive"
  onClick={handleDelete}
/>
\`\`\`

### Best Practices
- Always provide \`ariaLabel\` for icon-only buttons
- Use descriptive labels that explain the button's action
- Set \`disabled\` and \`isLoading\` states appropriately
- Use \`actionType\` to provide visual context for destructive actions
        `
      }
    }
  },
  argTypes: {
    label: { table: { disable: true } },
    icon: { table: { disable: true } },
    ariaLabel: { table: { disable: true } },
    actionType: { table: { disable: true } },
    isLoading: { table: { disable: true } },
    disabled: { table: { disable: true } }
  }
};

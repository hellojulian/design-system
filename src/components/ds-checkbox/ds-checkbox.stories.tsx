import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { DsCheckbox } from './ds-checkbox';

const meta = {
  title: ' Components/Checkbox',
  component: DsCheckbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Checkboxes allow people to select multiple options or toggle a single choice. For single selections, consider radio buttons or drop-downs. Note that checkboxes require a submission step, while switches offer real-time interaction.'
      }
    }
  },
  argTypes: {
    checked: { name: '🔗 checked' },
    indeterminate: { name: '🔗 indeterminate' },
    disabled: { name: '🔗 disabled' },
    checkLabel: { name: '🔗 checkLabel' },
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
} satisfies Meta<typeof DsCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState<boolean>(!!args.checked);

    React.useEffect(() => {
      setChecked(!!args.checked);
    }, [args.checked]);

    return (
      <DsCheckbox {...args} checked={checked} onToggle={setChecked} />
    );
  },
  args: {
    checkLabel: 'Label'
  },
  name: 'Default'
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-space-md)' }}>
        <DsCheckbox {...args} disabled />
        <DsCheckbox {...args} checked disabled />
        <DsCheckbox {...args} indeterminate disabled />
        <DsCheckbox {...args} checkLabel='Label' disabled />
        <DsCheckbox {...args} checkLabel='Label' checked disabled />
        <DsCheckbox {...args} checkLabel='Label' indeterminate disabled />
      </div>
    );
  },
  args: {
  },
  name: 'Disabled Checkbox',
  argTypes: {
    disabled: {
      table: {
        disable: true
      }
    },
    checked: {
      table: {
        disable: true
      }
    },
    indeterminate: {
      table: {
        disable: true
      }
    }
  }
};

export const Indeterminate: Story = {
  render: (args) => {
    const [checked1, setChecked1] = React.useState<boolean>(true);
    const [checked2, setChecked2] = React.useState<boolean>(false);

    const onToggleMaster = () => {
      if (checked1 && checked2) {
        setChecked1(false);
        setChecked2(false);
      } else {
        setChecked1(true);
        setChecked2(true);
      }
    };

    return (
      <>
        <DsCheckbox {...args} checked={checked1 && checked2} indeterminate={checked1 || checked2} onToggle={onToggleMaster} />
        <div style={{ marginLeft: 'var(--ds-space-xxlg)', display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-md)' }}>
          <DsCheckbox {...args} checked={checked1} onToggle={setChecked1} />
          <DsCheckbox {...args} checked={checked2} onToggle={setChecked2} />
        </div>
      </>
    );
  },
  args: {
  },
  name: 'Indeterminate',
  argTypes: {
    disabled: {
      table: {
        disable: true
      }
    },
    checked: {
      table: {
        disable: true
      }
    },
    indeterminate: {
      table: {
        disable: true
      }
    }
  }
};

export const Accessibility: Story = {
  render: (args) => {
    const [agreement, setAgreement] = React.useState<boolean>(false);
    const [notifications, setNotifications] = React.useState<boolean>(true);
    const [option1, setOption1] = React.useState<boolean>(true);
    const [option2, setOption2] = React.useState<boolean>(false);
    
    const selectAllToggle = () => {
      if (option1 && option2) {
        setOption1(false);
        setOption2(false);
      } else {
        setOption1(true);
        setOption2(true);
      }
    };

    return (
      <div style={{ display: 'flex', gap: 'var(--ds-space-xxlg)', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: 'var(--ds-space-lg)', flexDirection: 'column' }}>
          <h4>Standard Checkboxes</h4>
          <DsCheckbox checkLabel="I agree to the terms and conditions" checked={agreement} onToggle={setAgreement} />
          <DsCheckbox checkLabel="Enable email notifications" checked={notifications} onToggle={setNotifications} />
          <DsCheckbox checkLabel="Disabled checkbox" disabled={true} checked={false} onToggle={() => {}} />
        </div>
        
        <div style={{ display: 'flex', gap: 'var(--ds-space-lg)', flexDirection: 'column' }}>
          <h4>Indeterminate (Select All) Pattern</h4>
          <DsCheckbox 
            checkLabel="Select all options" 
            checked={option1 && option2} 
            indeterminate={(option1 || option2) && !(option1 && option2)}
            onToggle={selectAllToggle} 
          />
          <div style={{ marginLeft: 'var(--ds-space-lg)' }}>
            <DsCheckbox checkLabel="Option 1" checked={option1} onToggle={setOption1} />
            <DsCheckbox checkLabel="Option 2" checked={option2} onToggle={setOption2} />
          </div>
        </div>
      </div>
    );
  },
  name: 'Accessibility',
  parameters: {
    docs: {
      description: {
        story: `
## Accessibility Features

This component follows WCAG 2.1 AA guidelines and implements the checkbox pattern correctly:

### WCAG Compliance
- **2.1.1 Keyboard**: Fully keyboard accessible via Tab and Space keys
- **2.4.6 Headings and Labels**: Clear labeling via \`checkLabel\` or \`ariaLabel\` props
- **3.3.2 Labels or Instructions**: Labels clearly identify the purpose of each checkbox
- **4.1.2 Name, Role, Value**: Proper \`role="checkbox"\` with accessible name and state

### ARIA Attributes
- \`role="checkbox"\` - Identifies the element as a checkbox
- \`aria-checked\` - Indicates checked state (true/false/mixed for indeterminate)
- \`aria-disabled\` - Indicates disabled state to screen readers
- \`aria-label\` - For checkboxes without visible labels
- \`aria-labelledby\` - Associates checkbox with its label
- \`aria-describedby\` - Links to additional descriptive text
- \`aria-hidden="true"\` - Hides decorative icons from screen readers

### Keyboard Navigation
- **Tab**: Focus navigation between checkboxes
- **Space**: Toggle checkbox state
- **Enter**: Also toggles checkbox (alternative to Space)

### States
- **Checked**: \`aria-checked="true"\`
- **Unchecked**: \`aria-checked="false"\`
- **Indeterminate**: \`aria-checked="mixed"\` (for "select all" patterns)
- **Disabled**: \`aria-disabled="true"\` and \`tabindex="-1"\`

### Implementation
\`\`\`tsx
// Standard checkbox with label
<DsCheckbox 
  checkLabel="Enable notifications" 
  checked={isEnabled} 
  onToggle={setIsEnabled} 
/>

// Checkbox without visible label (requires ariaLabel)
<DsCheckbox 
  ariaLabel="Accept privacy policy" 
  checked={acceptedPolicy} 
  onToggle={setAcceptedPolicy} 
/>

// Indeterminate checkbox for "select all" pattern
<DsCheckbox 
  checkLabel="Select all items" 
  checked={allSelected} 
  indeterminate={someSelected}
  onToggle={handleSelectAll} 
/>

// Disabled checkbox
<DsCheckbox 
  checkLabel="Premium feature (requires upgrade)" 
  disabled={true}
  checked={false} 
  onToggle={() => {}} 
/>
\`\`\`

### Best Practices
- Always provide a \`checkLabel\` or \`ariaLabel\` for screen readers
- Use indeterminate state for "select all" functionality when some but not all items are selected
- Group related checkboxes using fieldset and legend elements in your forms
- Provide clear, descriptive labels that explain what will happen when checked
        `
      }
    }
  },
  argTypes: {
    checkLabel: { table: { disable: true } },
    checked: { table: { disable: true } },
    indeterminate: { table: { disable: true } },
    disabled: { table: { disable: true } },
    ariaLabel: { table: { disable: true } }
  }
};

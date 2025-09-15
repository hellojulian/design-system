import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Smile } from 'lucide-react';

import { DsTextInput } from './ds-text-input';

const meta = {
  title: ' Components/TextInput',
  component: DsTextInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Request a small amount of textual information from people, such as a name or an email address. Display a label above the text field to help communicate its purpose. To the extent possible, match the size of a text field to the quantity of anticipated text. Use status to validate fields when it makes sense.'
      }
    }
  },
  argTypes: {
    prefix: {
      name: '🔗 prefix',
      control: 'boolean',
      mapping: {
        false: undefined,
        true: <Smile size={16} />
      }
    },
    suffix: {
      name: '🔗 suffix',
      control: 'boolean',
      mapping: {
        false: undefined,
        true: <Smile size={16} />
      }
    },
    clearable: {
      name: '🔗 clearable'
    },
    disabled: {
      name: '🔗 disabled'
    },
    label: {
      name: '🔗 label'
    },
    placeholder: {
      name: '🔗 placeholder'
    },
    status: {
      name: '🔗 status',
      control: 'boolean',
      mapping: {
        false: undefined,
        true: { type: 'invalid', message: 'Invalid Input' }
      }
    },
    value: {
      name: '🔗 value'
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
} satisfies Meta<typeof DsTextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);

    React.useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    return (
      <DsTextInput {...args} value={value} onChange={setValue} />
    );
  },
  name: 'Default',
  parameters: {
  },
  args: {
    value: '',
    placeholder: 'Placeholder'
  }
};

export const PrefixAndSuffix: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);

    React.useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    return (
      <DsTextInput {...args} value={value} onChange={setValue} />
    );
  },
  argTypes: {
    suffix: {
      table: {
        disable: true
      }
    },
    prefix: {
      table: {
        disable: true
      }
    }
  },
  args: {
    value: '',
    prefix: <Smile size={16} />,
    suffix: <Smile size={16} />
  }
};

export const Clearable: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);

    React.useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    return (
      <DsTextInput {...args} value={value} onChange={setValue} />
    );
  },
  argTypes: {
    clearable: {
      table: {
        disable: true
      }
    }
  },
  args: {
    value: '',
    clearable: true
  }
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);

    React.useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    return (
      <>
        <DsTextInput {...args} value={value} onChange={setValue} />
        <DsTextInput {...args} value={value} onChange={setValue} prefix={<Smile size={16} />} suffix={<Smile size={16} />} />
        <DsTextInput {...args} value={value} onChange={setValue} label='Text' status={{ message: 'This is the message of this status', type: 'success' }} />
      </>
    );
  },
  argTypes: {
    disabled: {
      table: {
        disable: true
      }
    }
  },
  args: {
    value: 'Value',
    disabled: true
  }
};

export const LabelAndStatus: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);

    React.useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    return (
      <DsTextInput {...args} value={value} onChange={setValue} />
    );
  },
  argTypes: {
    label: {
      table: {
        disable: true
      }
    },
    status: {
      table: {
        disable: true
      }
    }
  },
  args: {
    value: '',
    label: 'Input Title',
    status: { type: 'invalid', message: 'Invalid Input' }
  }
};

export const Accessibility: Story = {
  render: (args) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [search, setSearch] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [errorField, setErrorField] = React.useState('invalid@');

    return (
      <div style={{ display: 'flex', gap: 'var(--ds-space-lg)', flexDirection: 'column', maxWidth: '400px' }}>
        <DsTextInput 
          label="Email Address"
          value={email}
          onChange={setEmail}
          placeholder="Enter your email"
        />
        
        <DsTextInput 
          label="Search Products"
          value={search}
          onChange={setSearch}
          placeholder="Search..."
          clearable={true}
          prefix={<Smile size={16} />}
        />
        
        <DsTextInput 
          label="Amount"
          value={amount}
          onChange={setAmount}
          placeholder="0.00"
          prefix={<span>$</span>}
          suffix={<span>USD</span>}
        />
        
        <DsTextInput 
          label="Email (Error State)"
          value={errorField}
          onChange={setErrorField}
          status={{ 
            type: 'invalid', 
            message: 'Please enter a valid email address'
          }}
        />
        
        <DsTextInput 
          label="Disabled Field"
          value="Cannot edit"
          onChange={() => {}}
          disabled={true}
        />
      </div>
    );
  },
  name: 'Accessibility',
  parameters: {
    docs: {
      description: {
        story: `
## Accessibility Features

This component follows WCAG 2.1 AA guidelines and implements proper form input patterns:

### WCAG Compliance
- **2.1.1 Keyboard**: Full keyboard navigation with Tab and standard input keys
- **2.4.6 Headings and Labels**: Clear labeling via \`label\` prop or \`ariaLabel\`
- **3.3.1 Error Identification**: Errors clearly identified via status messages
- **3.3.2 Labels or Instructions**: Labels and placeholders provide clear instructions
- **4.1.2 Name, Role, Value**: Proper input element with accessible name and state

### ARIA Attributes
- \`aria-labelledby\` - Links input to its label element
- \`aria-label\` - For inputs without visible labels
- \`aria-describedby\` - Links to status/help text
- \`aria-invalid\` - Indicates validation state (true for errors)
- \`aria-required\` - Indicates required fields
- \`aria-hidden="true"\` - Hides decorative icons from screen readers

### Form Validation
- **Error State**: \`aria-invalid="true"\` when status type is 'danger'
- **Status Messages**: Linked via \`aria-describedby\` for screen reader announcement
- **Required Fields**: Use \`required\` attribute for form validation

### Keyboard Navigation
- **Tab**: Focus navigation between inputs
- **Arrow Keys**: Navigate within input text
- **Home/End**: Move to beginning/end of input
- **Ctrl+A**: Select all text

### Implementation
\`\`\`tsx
// Standard text input with label
<DsTextInput 
  label="Email Address"
  value={email}
  onChange={setEmail}
  placeholder="Enter your email"
/>

// Input without visible label (requires ariaLabel)
<DsTextInput 
  ariaLabel="Search products"
  value={search}
  onChange={setSearch}
  placeholder="Search..."
/>

// Input with validation error
<DsTextInput 
  label="Email"
  value={email}
  onChange={setEmail}
  status={{
    type: 'invalid',
    message: 'Please enter a valid email address'
  }}
/>

// Input with prefix/suffix
<DsTextInput 
  label="Price"
  value={price}
  onChange={setPrice}
  prefix={<span>$</span>}
  suffix={<span>USD</span>}
/>

// Clearable input
<DsTextInput 
  label="Search"
  value={query}
  onChange={setQuery}
  clearable={true}
/>
\`\`\`

### Best Practices
- Always provide a \`label\` or \`ariaLabel\` for screen readers
- Use clear, descriptive labels that explain the input's purpose
- Provide helpful placeholder text that doesn't replace labels
- Use status messages for validation errors and success states
- Make error messages specific and actionable
- Consider using prefix/suffix for formatting context (currency, units, etc.)
        `
      }
    }
  },
  argTypes: {
    label: { table: { disable: true } },
    value: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    status: { table: { disable: true } },
    clearable: { table: { disable: true } },
    disabled: { table: { disable: true } },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } }
  }
};

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { DsAccordion } from './ds-accordion';

// Status message component for examples
const DsStatusMessage = ({ message = "This is the message of this status", type = "invalid" }: {
  message?: string;
  type?: "invalid" | "attention" | "success";
}) => {
  const getStatusStyles = () => {
    switch (type) {
      case 'invalid':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-400',
          textColor: 'text-red-600',
          iconBg: 'bg-red-50'
        };
      case 'attention':
        return {
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-400',
          textColor: 'text-yellow-600',
          iconBg: 'bg-yellow-50'
        };
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-400',
          textColor: 'text-green-600',
          iconBg: 'bg-green-50'
        };
      default:
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-400',
          textColor: 'text-red-600',
          iconBg: 'bg-red-50'
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className="flex gap-1 items-center">
      <div className={`${styles.iconBg} relative rounded-full w-3.5 h-3.5 border ${styles.borderColor} flex items-center justify-center`}>
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M6 2L2 6M2 2l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.textColor} />
        </svg>
      </div>
      <div className={`text-sm font-medium ${styles.textColor} leading-snug`}>
        {message}
      </div>
    </div>
  );
};

const DsText = ({ text = "Text" }: { text?: string }) => {
  return (
    <div className="flex items-start">
      <div className="text-base font-semibold text-gray-900 leading-relaxed">
        {text}
      </div>
    </div>
  );
};

const meta = {
  title: ' Components/Accordion',
  component: DsAccordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: "Accordions are used to organize content in a collapsible format, allowing users to show and hide sections of related information. They help save space while maintaining easy access to content."
      }
    }
  },
  argTypes: {
    title: {
      name: '🔗 title'
    },
    body: {
      name: '🔗 body'
    },
    disabled: {
      name: '🔗 disabled'
    },
    defaultOpen: {
      name: '🔗 defaultOpen'
    },
    showLabel: {
      name: '🔗 showLabel'
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
    },
    statusMsg: {
      control: {
        disable: true
      }
    },
    label: {
      control: {
        disable: true
      }
    },
    onToggle: {
      control: {
        disable: true
      }
    }
  }
} satisfies Meta<typeof DsAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args: {
    title: 'What is this accordion component?',
    body: 'This is a fully functional accordion component built with React and Tailwind CSS. It supports multiple states including open, closed, and disabled.'
  }
};

export const States: Story = {
  name: 'States',
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--ds-space-lg)', flexDirection: 'column', maxWidth: '500px' }}>
      <DsAccordion 
        title="Closed Accordion"
        body="This accordion starts closed by default. Click to expand and see the smooth animation."
        defaultOpen={false}
      />
      <DsAccordion 
        title="Open Accordion"
        body="This accordion starts open by default. The content is immediately visible and you can see the smooth collapse animation when clicking the header."
        defaultOpen={true}
      />
      <DsAccordion 
        title="Disabled Accordion"
        body="This content won't be shown because the accordion is disabled."
        disabled={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordions can be in different states: closed (default), open (expanded), or disabled (non-interactive).'
      }
    }
  },
  argTypes: {
    defaultOpen: {
      table: {
        disable: true
      }
    },
    disabled: {
      table: {
        disable: true
      }
    }
  }
};


export const WithLabel: Story = {
  name: 'With Label',
  render: (args) => (
    <div style={{ maxWidth: '500px' }}>
      <DsAccordion 
        title="Frequently Asked Questions"
        body="This accordion has a label above it to provide additional context about the content."
        showLabel={true}
        label={<DsText text="FAQ Section" />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use the `showLabel` and `label` props to add a descriptive label above the accordion.'
      }
    }
  },
  argTypes: {
    showLabel: {
      table: {
        disable: true
      }
    },
    label: {
      table: {
        disable: true
      }
    }
  }
};

export const MultipleAccordions: Story = {
  name: 'Multiple Accordions',
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--ds-space-lg)', flexDirection: 'column', maxWidth: '500px' }}>
      <DsAccordion 
        title="What is React?"
        body="React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called components."
      />
      <DsAccordion 
        title="What is TypeScript?"
        body="TypeScript is a programming language developed by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static type checking to the language."
      />
      <DsAccordion 
        title="What is Storybook?"
        body="Storybook is a tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation."
      />
      <DsAccordion 
        title="What is Tailwind CSS?"
        body="Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It provides low-level utility classes to build completely custom designs."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple accordions can be used together to create FAQ sections or organize complex information.'
      }
    }
  }
};


export const Accessibility: Story = {
  name: 'Accessibility',
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--ds-space-lg)', flexDirection: 'column', maxWidth: '500px' }}>
      <DsAccordion 
        title="Standard Accordion"
        body="This accordion follows accessibility best practices with proper ARIA attributes and keyboard navigation."
      />
      <DsAccordion 
        title="Custom Accessible Name"
        body="This accordion has a custom accessible name for screen readers."
        ariaLabel="Important information about accessibility"
      />
      <DsAccordion 
        title="Disabled Accordion"
        body="This accordion is disabled and properly communicates its state to assistive technologies."
        disabled={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## Accessibility Features

This component follows WCAG 2.1 AA guidelines and implements the following accessibility features:

### WCAG Compliance
- **2.1.1 Keyboard**: All accordions are keyboard accessible via Tab and Enter/Space keys
- **2.4.6 Headings and Labels**: Descriptive labels provided via \`title\` or \`ariaLabel\` props
- **3.2.2 On Input**: Accordion actions are predictable and don't cause unexpected context changes
- **4.1.2 Name, Role, Value**: Proper semantic button element with accessible name and state

### ARIA Attributes
- \`role="button"\` - Implicit from semantic \`<button>\` element
- \`aria-expanded\` - Indicates whether the accordion content is expanded
- \`aria-disabled\` - Indicates disabled state to screen readers
- \`aria-label\` - For custom accessible names
- \`aria-hidden\` - Hides collapsed content from screen readers

### Keyboard Navigation
- **Tab**: Focus navigation to accordion headers
- **Enter/Space**: Toggle accordion open/close state
- **Escape**: Remove focus (browser default)

### Implementation
\`\`\`tsx
// Standard accordion
<DsAccordion 
  title="FAQ Item" 
  body="Answer content"
  onToggle={(isOpen) => console.log('Toggled:', isOpen)}
/>

// Custom accessible name
<DsAccordion 
  title="Settings" 
  body="Configuration options"
  ariaLabel="User account settings panel"
/>

// With status message
<DsAccordion 
  title="Form Section" 
  body="Form content"
  statusMsg={<StatusMessage type="invalid" message="Please complete required fields" />}
/>
\`\`\`

        `
      }
    }
  },
  argTypes: {
    title: { table: { disable: true } },
    body: { table: { disable: true } },
    ariaLabel: { table: { disable: true } },
    disabled: { table: { disable: true } }
  }
};
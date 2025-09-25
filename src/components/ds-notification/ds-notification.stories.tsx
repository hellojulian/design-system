import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Smile } from 'lucide-react';

import { DsNotification } from './ds-notification';

const meta = {
  title: ' Components/Notification',
  component: DsNotification,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Confirm actions, update people about timely events and provide status updates for processes. When providing an action, opt for non-destructive actions and clear distinctions for destructive ones. The information in notifications is valuable but not critical, aiming for quick and concise updates that people can grasp at a glance.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      name: '🔗 title'
    },
    type: {
      name: '🔗 type'
    },
    description: {
      name: '🔗 description'
    },
    action: {
      name: '🔗 action',
      control: 'boolean',
      mapping: {
        false: undefined,
        true: { label: 'Action', onClick: () => { }, hierarchy: 'tertiary', size: 'medium' }
      }
    },
    icon: {
      name: '🔗 icon',
      control: 'boolean',
      mapping: {
        false: undefined,
        true: <Smile size={32} />
      }
    },
    className: {
      control: {
        disable: true
      }
    },
    ariaLabel: {
      name: '🔗 ariaLabel',
      control: 'text',
      description: 'Accessible label for the notification'
    },
    dismissible: {
      name: '🔗 dismissible',
      control: 'boolean',
      description: 'Shows dismiss button for user-controlled closure'
    },
    autoClose: {
      name: '🔗 autoClose',
      control: 'boolean',
      description: 'Automatically closes after specified delay'
    },
    live: {
      name: '🔗 live',
      control: 'select',
      options: ['polite', 'assertive'],
      description: 'Controls urgency of screen reader announcements'
    }
  }
} satisfies Meta<typeof DsNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  render: (args) => (
    <div style={{ width: '420px' }}>
      <DsNotification {...args} />
    </div>
  ),
  args: {
    title: 'Notification Title',
    action: { label: 'Action', onClick: () => { }, hierarchy: 'tertiary', size: 'medium' },
    description: 'This is the notification description, I like.',
    type: 'neutral'
  }
};

export const Types: Story = {
  name: 'Notification Types',
  render: (args) => (
    <div style={{ width: '420px', display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-md)' }}>
      {['neutral', 'attention', 'informative', 'dangerous', 'success'].map((type: any) =>
        <DsNotification {...args} type={type} />
      )}
    </div>
  ),
  args: {
    title: 'Notification Title',
    action: { label: 'Action', onClick: () => { }, hierarchy: 'tertiary', size: 'medium' },
    description: 'This is the notification description, I like.'
  },
  argTypes: {
    type: {
      table: {
        disable: true
      }
    }
  }
};

export const AccessibilityDemo: Story = {
  name: 'Accessibility Features',
  render: (args) => (
    <div style={{ width: '420px', display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-md)' }}>
      <DsNotification 
        title="Alert Notification" 
        description="This is an urgent alert that uses assertive live region"
        type="dangerous"
        live="assertive"
        dismissible={true}
      />
      <DsNotification 
        title="Auto-closing Success" 
        description="This notification will close automatically after 3 seconds"
        type="success"
        autoClose={true}
        autoCloseDelay={3000}
      />
      <DsNotification 
        title="Custom ARIA Label" 
        description="This notification has a custom accessibility label"
        type="informative"
        ariaLabel="Important system information notification"
        dismissible={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accessibility features including live regions, auto-close functionality, dismissible notifications, and custom ARIA labels.'
      }
    }
  }
};

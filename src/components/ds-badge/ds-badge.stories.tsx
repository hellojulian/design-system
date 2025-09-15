import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Smile } from 'lucide-react';

import { DsBadge, type dsBadgeProps } from './ds-badge';

const meta = {
  title: ' Components/Badge',
  component: DsBadge as React.FC<dsBadgeProps>,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Assist people to quickly grasp information, status & classification. Provide feedback, and establish trust and security.'
      }
    }
  },
  argTypes: {
    color: { name: '🔗 color' },
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
    label: { name: '🔗 label' },
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
} satisfies Meta<typeof DsBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default',
    color: 'blue'
  },
  name: 'Default'
};

export const Colors: Story = {
  args: {
    label: 'Badge',
    color: 'blue'
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--ds-space-md)' }}>
      {['blue', 'green', 'red', 'purple', 'yellow', 'neutral'].map((color) => (
        <DsBadge key={color} {...args} color={color as DsBadgeProps['color']} />
      ))}
    </div>
  ),
  name: 'Badge Color',
  parameters: {
    docs: {
      description: {
        story: 'Pass the `color` props to customize your badge.'
      }
    }
  },
  argTypes: {
    color: {
      table: {
        disable: true
      }
    }
  }
};

export const Icon: Story = {
  args: {
    label: 'Badge',
    color: 'blue'
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--ds-space-md)' }}>
      <DsBadge {...args} icon={<Smile size={16} />} />
      <DsBadge {...args} iconRight={<Smile size={16} />} />
      <DsBadge {...args} icon={<Smile size={16} />} iconRight={<Smile size={16} />} />
    </div>
  ),
  name: 'Icon & Icon Right',
  parameters: {
    docs: {
      description: {
        story: 'Pass the `icon` or `iconRight` props to customize your badge.'
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

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Smile } from 'lucide-react';
import { DsOptionGroup } from './ds-option-group';

const meta = {
  title: ' Components/OptionGroup',
  component: DsOptionGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Embed this component within other components such as Popover or Select to showcase a configurable grouped list of list items or options. Each option can be individually configured, and the grouping allows for versatile customization.'
      }
    }
  },
  argTypes: {
    options: {
      name: '🔗 options',
      control: {
        disable: true
      }
    },
    className: {
      control: {
        disable: true
      }
    }
  }
} satisfies Meta<typeof DsOptionGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args: {
    options: [
      {
        label: 'Group Title',
        options: [
          { label: 'Option', value: '1' },
          { label: 'Option', value: '2' },
          { label: 'Option', value: '3' }
        ]
      }
    ]
  }
};

export const CustomOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'You can customize your options by passing in a `prefix` (on single select) or `suffix` (on single or multi select).'
      }
    }
  },
  args: {
    options: [
      { label: 'Option 1', value: '1', prefix: <Smile size={16} />, suffix: <Smile size={16} /> },
      { label: 'Option 2', value: '2', prefix: <Smile size={16} />, suffix: <Smile size={16} /> },
      { label: 'Option 3', value: '3', prefix: <Smile size={16} />, suffix: <Smile size={16} /> }
    ]
  }
};

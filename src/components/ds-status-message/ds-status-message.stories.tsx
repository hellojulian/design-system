import type { Meta, StoryObj } from '@storybook/react';

import { DsStatusMessage } from './ds-status-message';

const meta = {
  title: ' Components/StatusMessage',
  component: DsStatusMessage,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Offer inline feedback for one of three status types. It is most effective in compact spaces, alongside form controls, or within inline text.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['invalid', 'attention', 'success'],
      name: '🔗 type'
    },
    message: {
      name: '🔗 message'
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
} satisfies Meta<typeof DsStatusMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    message: "You're doing something right!"
  },
};

export const Invalid: Story = {
  args: {
    type: 'invalid',
    message: 'Something is clearly wrong here'
  },
};

export const Attention: Story = {
  args: {
    type: 'attention',
    message: 'This requires your attention'
  },
};

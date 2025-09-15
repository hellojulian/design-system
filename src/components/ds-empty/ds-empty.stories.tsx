import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { DsEmpty } from './ds-empty';
import { DsIllustration } from '../ds-illustration/ds-illustration';

const meta = {
  title: ' Components/Empty',
  component: DsEmpty,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Guide people in the absence of content, reducing confusion, encouraging actions, reinforcing branding, and offering friendly tips or tutorials to help people navigate new situations or create content when no data is available.'
      }
    }
  },
  argTypes: {
    title: {
      name: '🔗 title'
    },
    description: {
      name: '🔗 description'
    },
    action: {
      name: '🔗 action',
      control: 'boolean',
      mapping: {
        false: undefined,
        true: { label: 'Try This', hierarchy: 'tertiary' }
      }
    },
    illustration: {
      name: '🔗 illustration',
      control: 'boolean',
      mapping: {
        false: undefined,
        true: <DsIllustration name="Book" />
      }
    },
    className: {
      control: {
        disable: true
      }
    }
  }
} satisfies Meta<typeof DsEmpty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args: {
    title: 'This is empty',
    description: 'Add content and bring this space to life!'
  }
};

export const WithActionAndIllustration: Story = {
  args: {
    title: 'This is empty',
    description: 'Add content and bring this space to life!',
    action: { label: 'Try This', onClick: () => { console.log('Clicked empty state action'); }, hierarchy: 'tertiary', size: 'medium', actionType: 'neutral' },
    illustration: <DsIllustration name="Book" />
  }
};

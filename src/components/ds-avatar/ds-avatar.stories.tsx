import type { Meta, StoryObj } from '@storybook/react';
import { DsAvatar } from './ds-avatar';

const meta = {
  title: 'Components/Avatar',
  component: DsAvatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar component for displaying user profile images in various sizes and variants. Use avatars to represent users in profiles, comments, and user lists throughout your application.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['52px', '80px', '120px']
    },
    variant: {
      control: { type: 'select' },
      options: ['Male 1', 'Male 2', 'Female 1', 'Female 2']
    },
    alt: {
      control: { type: 'text' }
    },
    className: {
      control: { disable: true }
    }
  }
} satisfies Meta<typeof DsAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  parameters: {
  },
  args: {
    size: '80px',
    variant: 'Male 1'
  }
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-space-lg)', alignItems: 'center' }}>
      <DsAvatar size="52px" variant="Female 1" />
      <DsAvatar size="80px" variant="Female 1" />
      <DsAvatar size="120px" variant="Female 1" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar component in different sizes: 52px, 80px, and 120px.'
      }
    }
  }
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-space-lg)', alignItems: 'center' }}>
      <DsAvatar variant="Male 1" />
      <DsAvatar variant="Male 2" />
      <DsAvatar variant="Female 1" />
      <DsAvatar variant="Female 2" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different avatar variants available.'
      }
    }
  }
};
import type { Meta, StoryObj } from '@storybook/react';
import { DsIllustration } from './ds-illustration';

const meta = {
  title: 'Components/Illustration',
  component: DsIllustration,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Illustration component for displaying various illustrations in different sizes. Use illustrations to add visual interest and context to empty states, onboarding flows, and feature explanations.'
      }
    }
  },
  argTypes: {
    name: {
      control: { type: 'text' }
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    alt: {
      control: { type: 'text' }
    },
    className: {
      control: { disable: true }
    }
  }
} satisfies Meta<typeof DsIllustration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  parameters: {
  },
  args: {
    name: 'Book',
    size: 'medium'
  }
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-space-lg)', alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--ds-space-xs)' }}>
        <DsIllustration name="Coffee" size="small" />
        <span style={{ fontSize: '12px', color: 'var(--ds-color-foreground-soft)', fontFamily: 'var(--ds-font-family)' }}>small</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--ds-space-xs)' }}>
        <DsIllustration name="Coffee" size="medium" />
        <span style={{ fontSize: '12px', color: 'var(--ds-color-foreground-soft)', fontFamily: 'var(--ds-font-family)' }}>medium</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--ds-space-xs)' }}>
        <DsIllustration name="Coffee" size="large" />
        <span style={{ fontSize: '12px', color: 'var(--ds-color-foreground-soft)', fontFamily: 'var(--ds-font-family)' }}>large</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Illustration component in different sizes: small, medium, and large.'
      }
    }
  }
};

export const Gallery: Story = {
  name: 'Illustration Gallery',
  render: () => {
    const illustrations = [
      'Apple_Vision', 'Apple_Watch', 'Asteriks', 'Backpack', 'Beanbag', 'Book', 'Bottle', 'Brain_Black', 'Brain_Pink',
      'Cactus', 'Canister', 'Cap', 'Chair', 'Chains', 'Clock', 'Cloud', 'Cluster', 'Coffee', 'Computer', 'Connected',
      'Cursor', 'Diary', 'Enter', 'Eyes', 'Fat_Cursor', 'Figma_Shirt', 'Flower', 'Flower_Painting', 'Folder', 'Fuzzy',
      'Glasses', 'Glisten', 'Goo', 'Gradient', 'Hash', 'Headphones', 'Heart', 'Hoodie', 'iPod', 'iPods', 'Ink',
      'Kaws', 'Keyboard', 'Lego', 'Love', 'Love_Gun', 'Mac', 'O', 'Ottoman', 'Painting', 'Palette', 'Pen', 'Pens',
      'Phone', 'Pill', 'Pink_Ball', 'Pink_Shape', 'Ring', 'Rock', 'S', 'Scooter', 'Settings', 'Shoes', 'Smiley',
      'Speaker', 'Starfish', 'Starfish_2', 'Staute', 'Suitcase', 'Tag', 'Tote', 'Twizzler', 'Void', 'Weirdo', 'Wifi', 'X'
    ];

    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)', 
        gap: '16px',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px'
      }}>
        {illustrations.map((name) => (
          <div key={name} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '8px',
            padding: '12px',
            border: '1px solid var(--ds-color-divider-soft)',
            borderRadius: '8px',
            backgroundColor: 'var(--ds-color-background-elevated)'
          }}>
            <DsIllustration name={name} size="small" />
            <span style={{ 
              fontSize: '11px', 
              color: 'var(--ds-color-foreground-soft)', 
              textAlign: 'center',
              fontFamily: 'var(--ds-font-family)',
              fontWeight: '500',
              lineHeight: '1.2',
              maxWidth: '80px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive gallery of all available illustrations in the design system. Each illustration can be used by passing the `name` prop to the DsIllustration component. All illustrations are displayed at small size for overview purposes.'
      }
    }
  }
};
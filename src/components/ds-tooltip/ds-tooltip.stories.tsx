import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { DsTooltip, type DsTooltipProps } from './ds-tooltip';
import { DsRadio } from '../ds-radio/ds-radio';
import { DsButton } from '../ds-button/ds-button';

const meta = {
  title: ' Components/Tooltip',
  component: DsTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Offer concise feedback to inform people about the outcomes of actions or provide brief information about interface components when their cursor interacts with them. Prioritize the specific control, use action-oriented language, and keep the messages brief. Tooltips visually stand out by using contrasting colors with the theme interface.'
      }
    }
  },
  argTypes: {
    tooltipBody: {
      control: 'text',
      name: '🔗 tooltipBody'
    },
    children: {
      control: {
        disable: 'true'
      }
    },
    ariaLabel: {
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
} satisfies Meta<typeof DsTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 50 }}>
        <DsTooltip {...args} />
      </div>
    );
  },
  name: 'Default',
  args: {
    tooltipBody: 'Tooltip text',
    children: <DsButton hierarchy='tertiary' label='Hover me' />
  }
};

export const Placement: Story = {
  render: (args) => {
    const [placement, setPlacement] = React.useState<DsTooltipProps['placement']>('top');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 50, gap: 'var(--ds-space-xlg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--ds-space-lg)' }}>
          <DsRadio label="top" onClick={() => { setPlacement('top'); }} checked={placement === 'top'} />
          <DsRadio label="bottom" onClick={() => { setPlacement('bottom'); }} checked={placement === 'bottom'} />
          <DsRadio label="left" onClick={() => { setPlacement('left'); }} checked={placement === 'left'} />
          <DsRadio label="right" onClick={() => { setPlacement('right'); }} checked={placement === 'right'} />
        </div>
        <DsTooltip {...args} placement={placement} />
      </div>
    );
  },
  argTypes: {
    placement: {
      table: {
        disable: true
      }
    }
  },
  args: {
    tooltipBody: 'hello there you handsome',
    children: <DsButton hierarchy='tertiary' label='Hover me' />
  }
};

export const OpenAndCloseDelay: Story = {
  render: (args) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 50 }}>
        <DsTooltip {...args} />
      </div>
    );
  },
  argTypes: {
    closeDelay: {
      table: {
        disable: true
      }
    },
    openDelay: {
      table: {
        disable: true
      }
    }
  },
  args: {
    tooltipBody: 'hello there you handsome',
    children: <DsButton hierarchy='tertiary' label='Hover me' />,
    closeDelay: 500,
    openDelay: 500
  }
};

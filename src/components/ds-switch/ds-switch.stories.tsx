import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { DsSwitch } from './ds-switch';

const meta = {
  title: ' Components/Switch',
  component: DsSwitch,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Help people choose between two opposing values. Use for options with immediate effects with clear identification through context or labels if needed. Switch has more visual weight than a checkbox, so it looks better when it controls more functionality, so avoid employing it for minor settings.'
      }
    }
  },
  argTypes: {
    on: {
      name: '🔗 on'
    },
    size: {
      name: '🔗 size',
      control: 'select'
    },
    disabled: {
      name: '🔗 disabled'
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
} satisfies Meta<typeof DsSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [on, setOn] = React.useState(args.on);

    React.useEffect(() => {
      setOn(args.on);
    }, [args.on]);

    return (
      <>
        <DsSwitch {...args} on={on} onChange={setOn} />
      </>
    );
  },
  name: 'Default',
  args: {
    on: false
  }
};

export const SwitchSizes: Story = {
  render: (args) => {
    const [on, setOn] = React.useState(args.on);

    React.useEffect(() => {
      setOn(args.on);
    }, [args.on]);

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-space-lg)' }}>
        <DsSwitch {...args} on={on} onChange={setOn} size='small' />
        <DsSwitch {...args} on={on} onChange={setOn} size='medium' />
      </div>
    );
  },
  argTypes: {
    size: {
      table: {
        disable: true
      }
    }
  },
  args: {
    on: true
  }
};


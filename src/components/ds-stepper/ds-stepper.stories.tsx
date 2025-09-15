import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { DsStepper, DsStepperDisabled } from './ds-stepper';

const meta = {
  title: ' Components/Stepper',
  component: DsStepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Help people make small numeric changes by pressing buttons or typing numbers. The input is also editable for larger value changes since people can directly edit the input field.'
      }
    }
  },
  argTypes: {
    disabled: {
      name: '🔗 disabled',
      control: 'select',
      options: [undefined, 'minus', 'plus', 'all']
    },
    status: {
      name: '🔗 status',
      control: 'boolean',
      mapping: {
        false: undefined,
        true: { type: 'invalid', message: 'Invalid Input' }
      }
    },
    value: {
      name: '🔗 value'
    },
    label: {
      name: '🔗 label'
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
} satisfies Meta<typeof DsStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    React.useEffect(() => {
      setValue(args.value);
    }, [args.value]);
    return (
      <DsStepper {...args} value={value} onChange={setValue} />
    );
  },
  name: 'Default',
  args: {
    value: 0
  }
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    React.useEffect(() => {
      setValue(args.value);
    }, [args.value]);
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-space-md)' }}>
        <DsStepper {...args} value={value} onChange={setValue} disabled={DsStepperDisabled.Minus} />
        <DsStepper {...args} value={value} onChange={setValue} disabled={DsStepperDisabled.Plus} />
        <DsStepper {...args} value={value} onChange={setValue} disabled={DsStepperDisabled.All} />
      </div>
    );
  },
  argTypes: {
    disabled: {
      table: {
        disable: true
      }
    }
  },
  args: {
    value: 0
  }
};

export const StatusMessage: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    React.useEffect(() => {
      setValue(args.value);
    }, [args.value]);
    return (
      <DsStepper {...args} value={value} onChange={setValue} />
    );
  },
  argTypes: {
    label: {
      table: {
        disable: true
      }
    },
    status: {
      table: {
        disable: true
      }
    }
  },
  args: {
    value: 0,
    label: 'Input Field',
    status: { type: 'invalid', message: 'Invalid Value' }
  }
};

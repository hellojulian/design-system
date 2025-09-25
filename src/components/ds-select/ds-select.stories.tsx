import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Smile } from 'lucide-react';
import { DsSelect } from './ds-select';
import { Clearable } from '../ds-text-input/ds-text-input.stories';

const meta = {
  title: ' Components/Select',
  component: DsSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Help people choose single or multiple values from a set of options. Consider select when you have 5 or more options. As an alternative, radio buttons or checkboxes can make the interface cleaner and more accessible.'
      }
    }
  },
  argTypes: {
    disabled: {
      name: '🔗 disabled'
    },
    type: {
      name: '🔗 type'
    },
    label: {
      name: '🔗 label'
    },
    placeholder: {
      name: '🔗 placeholder'
    },
    clearable: {
      name: '🔗 clearable'
    },
    statusMsg: {
      control: 'boolean',
      name: '🔗 statusMsg',
      mapping: {
        false: undefined,
        true: { message: 'This is the message of this status', type: 'invalid' }
      }
    },
    fixedHeight: {
      name: '🔗 fixedHeight'
    },
    value: {
      name: '🔗 value',
      control: {
        disable: true
      }
    },
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
    },
    ariaLabel: {
      control: {
        disable: true
      }
    }
  }
} satisfies Meta<typeof DsSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<any>(args.value?.toString());
    const [multiValue, setMultiValue] = React.useState<any>([args.value?.toString()]);

    return (
      <div style={{ width: '300px' }}>
        <DsSelect {...args} onChange={args.type === 'multi-value' ? setMultiValue : setValue} value={args.type === 'multi-value' ? multiValue : value} />
      </div>
    );
  },
  name: 'Default',
  args: {
    type: 'single-value',
    placeholder: 'Select option',
    clearable: true,
    value: '',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' }
    ]
  }
};

export const NativeSelect: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<any>(args.value?.toString());

    return (
      <div style={{ width: '300px' }}>
        <DsSelect {...args} onChange={setValue} value={value} />
      </div>
    );
  },
  argTypes: {
    type: {
      table: {
        disable: true
      }
    },
    placeholder: {
      table: {
        disable: true
      }
    }
  },
  args: {
    type: 'native',
    value: '1',
    options: [
      { label: 'Group', options: [{ label: 'Option 1', value: '1' }] },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' }
    ]
  }
};

export const SingleSelectGrouped: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<any>(args.value?.toString());

    return (
      <div style={{ width: '300px' }}>
        <DsSelect {...args} onChange={setValue} value={value} />
      </div>
    );
  },
  argTypes: {
    type: {
      table: {
        disable: true
      }
    }
  },
  args: {
    type: 'single-value',
    placeholder: 'Select an option',
    value: '1',
    options: [
      { label: 'Group A', options: [{ label: 'Option 1', value: '1a' }, { label: 'Option 2', value: '2a' }, { label: 'Option 3', value: '3a' }] },
      { label: 'Group B', options: [{ label: 'Option 1', value: '1b' }, { label: 'Option 2', value: '2b' }, { label: 'Option 3', value: '3b' }] }
    ]
  }
};

export const MultiSelectGrouped: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<any>(args.value);

    return (
      <div style={{ width: '300px' }}>
        <DsSelect {...args} onChange={setValue} value={value} />
      </div>
    );
  },
  argTypes: {
    type: {
      table: {
        disable: true
      }
    }
  },
  args: {
    type: 'multi-value',
    placeholder: 'Select option',
    value: ['1'],
    options: [
      { label: 'Group A', options: [{ label: 'Option 1', value: '1a' }, { label: 'Option 2', value: '2a' }, { label: 'Option 3', value: '3a' }] },
      { label: 'Group B', options: [{ label: 'Option 1', value: '1b' }, { label: 'Option 2', value: '2b' }, { label: 'Option 3', value: '3b' }] },
      { label: 'Option X', value: 'X' },
      { label: 'Option Y', value: 'Y' }
    ]
  }
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<any>(args.value?.toString());
    const [multiValue, setMultiValue] = React.useState<any>([args.value?.toString()]);

    return (
      <div style={{ width: '300px' }}>
        <DsSelect {...args} onChange={args.type === 'multi-value' ? setMultiValue : setValue} value={args.type === 'multi-value' ? multiValue : value} />
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
    type: 'native',
    value: '1',
    disabled: true,
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' }
    ]
  }
};

export const CustomOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'You can customize your options by passing in a `prefix` (on single select) or `suffix` (on single or multi select).\nYou can also use the `groupLabel` prop to group your options.'
      }
    }
  },
  render: (args) => {
    const [value, setValue] = React.useState<any>(args.value?.toString());
    const [multiValue, setMultiValue] = React.useState<any>([args.value?.toString()]);

    return (
      <div style={{ width: '300px' }}>
        <DsSelect {...args} onChange={args.type === 'multi-value' ? setMultiValue : setValue} value={args.type === 'multi-value' ? multiValue : value} />
      </div>
    );
  },
  argTypes: {
    options: {
      table: {
        disable: true
      }
    }
  },
  args: {
    type: 'single-value',
    value: '1',
    options: [
      { label: 'Option 1', value: '1', prefix: <Smile size={16} />, suffix: <Smile size={16} /> },
      { label: 'Option 2', value: '2', prefix: <Smile size={16} />, suffix: <Smile size={16} /> },
      { label: 'Option 3', value: '3', prefix: <Smile size={16} />, suffix: <Smile size={16} /> }
    ]
  }
};

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Smile } from 'lucide-react';

import { DsToggle } from './ds-toggle';

const meta = {
  title: ' Components/Toggle',
  component: DsToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/zHutj6e9DcPngHZTDtAL1u/design-system?type=design&node-id=2541-41544&mode=design&t=jq0JgMhh6dwhuYIm-4'
    },
    docs: {
      description: {
        component: 'Help people navigate between mutually exclusive panes of content in the same view or toggle between two or more configurations.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      name: '🔗 size'
    },
    disabled: {
      name: '🔗 disabled'
    },
    options: {
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
    },
    value: {
      control: {
        disable: true
      }
    }
  }
} satisfies Meta<typeof DsToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    return (
      <>
        <DsToggle {...args} value={value} onChange={setValue} />
      </>
    );
  },
  name: 'Basic',
  args: {
    options: [
      { label: 'Label', value: '1' },
      { label: 'Label', value: '2' },
      { label: 'Label', value: '3' }
    ],
    value: '1'
  }
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    return (
      <>
        <DsToggle {...args} value={value} onChange={setValue} />
        <DsToggle {...args} value={value} onChange={setValue} disabled={false} />
      </>
    );
  },
  argTypes: {
    disabled: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/zHutj6e9DcPngHZTDtAL1u/design-system?type=design&node-id=2541-43091&mode=design&t=jq0JgMhh6dwhuYIm-4'
    }
  },
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2', disabled: true },
      { label: 'Option 3', value: '3', disabled: true },
      { label: 'Option 4', value: '4' }
    ],
    disabled: true,
    value: '1'
  }
};

export const ToggleSizes: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-space-lg)' }}>
        <DsToggle {...args} value={value} onChange={setValue} size='medium' />
        <DsToggle {...args} value={value} onChange={setValue} size='large' />
      </div>
    );
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/zHutj6e9DcPngHZTDtAL1u/design-system?type=design&node-id=2541-41547&mode=design&t=jq0JgMhh6dwhuYIm-4'
    }
  },
  argTypes: {
    size: {
      table: {
        disable: true
      }
    }
  },
  args: {
    options: [
      { label: 'Label', value: '7' },
      { label: 'Label', value: '8' },
      { label: 'Label', value: '9' }
    ],
    value: '7'
  }
};

export const PrefixAndSuffix: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    return (
      <>
        <DsToggle {...args} value={value} onChange={setValue} />
      </>
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
    options: [
      { label: 'Label', value: '4', prefix: <Smile size={16} />, suffix: <Smile size={16} /> },
      { label: 'Label', value: '5', prefix: <Smile size={16} />, suffix: <Smile size={16} />, disabled: true },
      { label: 'Label', value: '6', prefix: <Smile size={16} />, suffix: <Smile size={16} /> }
    ],
    value: '4'
  }
};

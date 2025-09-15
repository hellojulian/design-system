import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { DsRadio } from './ds-radio';

const meta = {
  title: ' Components/Radio',
  component: DsRadio,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/zHutj6e9DcPngHZTDtAL1u/Functional-UI-Kit?type=design&node-id=2511-73454&mode=design&t=jq0JgMhh6dwhuYIm-4'
    },
    docs: {
      description: {
        component: 'Radio groups are best for selecting a single option from a short list, while Selects are less efficient due to multiple interactions and hidden options. Radio buttons are preferable for lists of around ten or fewer options, as they require just one quick interaction and ensure all choices are visible and easily comparable. If there isn’t enough space, try a a select instead.'
      }
    }
  },
  argTypes: {
    checked: {
      name: '🔗 checked'
    },
    disabled: {
      name: '🔗 disabled'
    },
    label: {
      name: '🔗 label'
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
} satisfies Meta<typeof DsRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    const [checked, setChecked] = React.useState(false);

    React.useEffect(() => {
      setChecked(!!props.checked);
    }, [props.checked]);

    return (
      <div style={{ padding: '20px' }}>
        <DsRadio
          {...props}
          checked={checked}
          onClick={() => { setChecked(!checked); }}
        />
      </div>
    );
  },
  args: {
  },
  name: 'Basic',
  parameters: {
    layout: 'padded'
  }
};

export const Disabled: Story = {
  render: (props) => {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{display:'flex', gap: 'var(--ds-space-md)'}}>
          <DsRadio
            {...props}
            disabled={true}
            />
          <DsRadio
            {...props}
            disabled={true}
            checked={true}
          />
          <DsRadio
            {...props}
            label='Label'
            disabled={true}
            />
          <DsRadio
            {...props}
            label='Label'
            disabled={true}
            checked={true}
          />
        </div>
      </div>
    );
  },
  args: {
  },
  parameters: {
    layout: 'padded'
  }
};

export const Group: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-space-md)' }}>
          <DsRadio onClick={() => { setValue(0); }} checked={value === 0} label='Red' />
          <DsRadio onClick={() => { setValue(1); }} checked={value === 1} label='Green' />
          <DsRadio onClick={() => { setValue(2); }} checked={value === 2} label='Blue' />
          <DsRadio disabled={true} onClick={() => { setValue(3); }} checked={value === 3} label='Yellow' />
        </div>
      </div>
    );
  },
  args: {
  },
  parameters: {
    layout: 'padded'
  }
};

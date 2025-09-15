import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { DsPopover, type DsPopoverProps } from './ds-popover';
import { DsButton } from '../ds-button/ds-button';
import { DsIllustration } from '../ds-illustration/ds-illustration';
import { DsRadio } from '../ds-radio/ds-radio';
import { DsEmpty } from '../ds-empty/ds-empty';

const meta = {
  title: ' Components/Popover',
  component: DsPopover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Help people conveniently access functionality or info. Popover is a modular element that appears above other content when triggered. Should ideally not obstruct the element that triggered them or essential content. Including a Close button is recommended for clarity, but a Popover often closes by clicking outside or selecting an item within. Should not be obscured by other elements, except for alerts. Avoid making a Popover too big.'
      }
    }
  },
  argTypes: {
    header: {
      name: '🔗 header',
      control: 'text'
    },
    body: {
      name: '🔗 body',
      control: {
        disable: true
      }
    },
    footer: {
      name: '🔗 footer',
      control: {
        disable: true
      }
    },
    children: {
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
} satisfies Meta<typeof DsPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(true);

    React.useEffect(() => {
      setOpen(args.isOpen);
    }, [args.isOpen]);

    const body = (
      <div style={{ padding: getComputedStyle(document.documentElement).getPropertyValue('--ds-space-xlg') }}>
        <DsEmpty title='This is empty' description='Add content and bring this space to life!' illustration={<DsIllustration name="Book" />} />
      </div>
    );

    const toggleOpen = () => {
      setOpen(open => !open);
    };

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DsPopover
          {...args}
          isOpen={open}
          placement={'bottom'}
          onClickOutside={() => { setOpen(false); }}
          body={body}
        >
          <div >
            <DsButton onClick={toggleOpen} label='Open Popover' />
          </div>
        </DsPopover>
      </div>
    );
  },
  name: 'Default',
  args: {
    body: <div />,
    children: <div />,
    isOpen: false
  }
};

export const DismissibleWithTitle: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      setOpen(args.isOpen);
    }, [args.isOpen]);

    const body = (
      <div style={{ padding: '16px' }}>
        <DsEmpty title='This is empty' description='Add content and bring this space to life!' illustration={<DsIllustration name="Book" />} />
      </div>
    );

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DsPopover
          {...args}
          isOpen={open}
          placement={'bottom'}
          onClickOutside={() => { setOpen(false); }}
          body={body}
          header={{ titleText: 'Popover Title', dismissible: true, onDismiss: () => { setOpen(false); } }}
        >
          <div>
            <DsButton onClick={() => { setOpen(!open); }} label='Open Popover' />
          </div>
        </DsPopover>
      </div >
    );
  },
  args: {
    body: <div />,
    children: <div />,
    isOpen: false
  }
};

export const Position: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    const [position, setPosition] = React.useState<DsPopoverProps['placement']>('bottom');

    React.useEffect(() => {
      setOpen(args.isOpen);
    }, [args.isOpen]);

    const body = (
      <div style={{ padding: '16px' }}>
        <DsEmpty title='This is empty' description='Add content and bring this space to life!' illustration={<DsIllustration name="Book" />} />
      </div>
    );

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 'var(--ds-space-lg)', marginTop: '80px', marginBottom: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'var(--ds-space-lg)' }}>
          <DsRadio checked={position?.includes('bottom')} onClick={() => { setPosition('bottom'); }} label='Bottom' />
          <DsRadio checked={position?.includes('left')} onClick={() => { setPosition('left'); }} label='Left' />
          <DsRadio checked={position?.includes('right')} onClick={() => { setPosition('right'); }} label='Right' />
          <DsRadio checked={position?.includes('top')} onClick={() => { setPosition('top'); }} label='Top' />
        </div>
        <DsPopover
          {...args}
          isOpen={open}
          header={{ titleText: 'Popover Title', dismissible: true, onDismiss: () => { setOpen(false); } }}
          placement={position}
          onClickOutside={() => { setOpen(false); }}
          body={body}
        >
          <div>
            <DsButton onClick={() => { setOpen(!open); }} label='Open Popover' />
          </div>
        </DsPopover>
      </div>
    );
  },
  name: 'Change Popover Position',
  args: {
    body: <div />,
    children: <div />,
    isOpen: false
  }
};

export const Actions: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      setOpen(args.isOpen);
    }, [args.isOpen]);

    const body = (
      <div style={{ padding: '16px' }}>
        <DsEmpty title='This is empty' description='Add content and bring this space to life!' illustration={<DsIllustration name="Book" />} />
      </div>
    );

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DsPopover
          {...args}
          isOpen={open}
          header={{ titleText: 'Popover Title', dismissible: true, onDismiss: () => { setOpen(false); } }}
          onClickOutside={() => { setOpen(false); }}
          placement={'bottom'}
          body={body}
          footer={{ primaryAction: { label: 'Submit', actionType: 'neutral', hierarchy: 'primary', size: 'medium', onClick: () => { setOpen(false); } }, secondaryAction: { label: 'Cancel', actionType: 'neutral', hierarchy: 'tertiary', size: 'medium', onClick: () => { setOpen(false); } } }}
        >
          <div>
            <DsButton onClick={() => { setOpen(!open); }} label='Open Popover' />
          </div>
        </DsPopover>
      </div>
    );
  },
  name: 'Footer Actions',
  args: {
    body: <div />,
    children: <div />,
    isOpen: false
  }
};

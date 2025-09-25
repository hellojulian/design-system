import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Smile } from 'lucide-react';

import { DsModal } from './ds-modal';
import { DsButton } from '../ds-button/ds-button';
import { DsEmpty } from '../ds-empty/ds-empty';
import { DsIllustration } from '../ds-illustration/ds-illustration';
import { DsBadge } from '../ds-badge/ds-badge';

const meta = {
  title: ' Components/Modal',
  component: DsModal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Present content in a distinct, focused mode, keeping people from interacting with the main view until they intentionally dismiss the modal. Modals can help people to: Receive critical information and, if necessary, act on it. Provide options to confirm or modify their most recent action. Perform a distinct, narrowly scoped task without losing track of their previous context. Focus on a complex task.'
      }
    }
  },
  argTypes: {
    modalHeader: {
      name: '🔗 modalHeader',
      control: 'select',
      options: ['none', 'horizontal', 'vertical'],
      mapping: {
        none: undefined,
        horizontal: {
          modalTitle: 'Modal Title',
          modalSubtitle: 'This is an optional subtitle',
          layout: 'horizontal',
          icon: <Smile size={32} />
        },
        vertical: {
          modalTitle: 'Modal Title',
          modalSubtitle: 'This is an optional subtitle',
          layout: 'vertical',
          icon: <Smile size={32} />
        }
      }
    },
    modalBody: {
      name: '🔗 modalBody',
      control: {
        disable: true
      }
    },
    divided: {
      name: '🔗 divided'
    },
    modalFooter: {
      name: '🔗 modalFooter',
      control: 'select',
      options: ['none', 'horizontal', 'vertical'],
      mapping: {
        none: undefined,
        horizontal: {
          primaryAction: {
            label: 'Save',
            hierarchy: 'primary',
            actionType: 'neutral',
            size: 'medium'
          },
          secondaryAction: {
            label: 'Cancel',
            hierarchy: 'secondary',
            actionType: 'neutral',
            size: 'medium'
          },
          footerContent: 'Really?',
          layout: 'horizontal'
        },
        vertical: {
          primaryAction: {
            label: 'Save',
            hierarchy: 'primary',
            actionType: 'neutral',
            size: 'medium'
          },
          secondaryAction: {
            label: 'Cancel',
            hierarchy: 'secondary',
            actionType: 'neutral',
            size: 'medium'
          },
          footerContent: 'Really?',
          layout: 'vertical'
        }
      }
    },
    showDismiss: {
      name: '🔗 showDismiss'
    },
    ariaLabel: {
      name: '🔗 ariaLabel',
      control: 'text',
      description: 'Accessible label for the modal when no header is present'
    },
    className: {
      control: {
        disable: true
      }
    }
  }
} satisfies Meta<typeof DsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      setOpen(args.open);
    }, [args.open]);

    return (
      <>
        <DsModal {...args} open={open} onOpenChange={setOpen} />
        <DsButton onClick={() => { setOpen(true); }} label='Open Modal' />
      </>
    );
  },
  name: 'Default',
  args: {
    open: false,
    modalHeader: {
      modalTitle: 'Modal Title',
      modalSubtitle: 'This is an optional subtitle',
      layout: 'vertical',
      icon: <Smile size={32} />
    },
    showDismiss: true,
    modalBody: <div style={{ padding: '0 var(--ds-space-xxlg) var(--ds-space-xxlg) var(--ds-space-xxlg)', width: 360 }}><DsEmpty title='Empty State' description='Modal Empty State' illustration={<DsIllustration name="Flower" />} /></div>
  }
};

export const Divided: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      setOpen(args.open);
    }, [args.open]);

    return (
      <>
        <DsModal {...args} open={open} onOpenChange={setOpen} />
        <DsButton onClick={() => { setOpen(true); }} label='Open Modal' />
      </>
    );
  },
  argTypes: {
    modalHeader: {
      table: {
        disable: true
      }
    },
    modalFooter: {
      table: {
        disable: true
      }
    }
  },
  args: {
    open: false,
    showDismiss: true,
    modalBody: <div style={{ padding: '0 var(--ds-space-xxlg)', width: 360 }}><DsEmpty title='Empty State' description='Modal Empty State' illustration={<DsIllustration name="Flower" />} /></div>,
    divided: true,
    modalHeader: {
      modalTitle: 'Modal Header'
    },
    modalFooter: {
      primaryAction: { label: 'Button', hierarchy: 'primary', actionType: 'neutral', size: 'medium' },
      secondaryAction: { label: 'Button', hierarchy: 'secondary', actionType: 'neutral', size: 'medium' }
    }
  }
};

export const Header: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      setOpen(args.open);
    }, [args.open]);

    return (
      <>
        <DsModal {...args} open={open} onOpenChange={setOpen} />
        <DsButton onClick={() => { setOpen(true); }} label='Open Modal' />
      </>
    );
  },
  argTypes: {
    modalHeader: {
      table: {
        disable: true
      }
    },
    modalFooter: {
      table: {
        disable: true
      }
    }
  },
  args: {
    open: false,
    showDismiss: true,
    modalBody: <div style={{ padding: '0 var(--ds-space-xxlg)', width: 360 }}><DsEmpty title='Empty State' description='Modal Empty State' illustration={<DsIllustration name="Flower" />} /></div>,
    modalHeader: {
      modalTitle: 'Modal Header',
      modalSubtitle: 'This is an optional subtitle',
      icon: <Smile size={32} />
    }
  }
};

export const Footer: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      setOpen(args.open);
    }, [args.open]);

    return (
      <>
        <DsModal {...args} open={open} onOpenChange={setOpen} />
        <DsButton onClick={() => { setOpen(true); }} label='Open Modal' />
      </>
    );
  },
  argTypes: {
    modalHeader: {
      table: {
        disable: true
      }
    },
    modalFooter: {
      table: {
        disable: true
      }
    }
  },
  args: {
    open: false,
    showDismiss: true,
    modalBody: <div style={{ padding: '0 var(--ds-space-xxlg)', width: 360 }}><DsEmpty title='Empty State' description='Modal Empty State' illustration={<DsIllustration name="Flower" />} /></div>,
    modalFooter: {
      primaryAction: { label: 'Button', hierarchy: 'primary', actionType: 'neutral', size: 'medium' },
      secondaryAction: { label: 'Button', hierarchy: 'secondary', actionType: 'neutral', size: 'medium' },
      footerContent: 'Really?'
    },
    modalHeader: {
      modalTitle: 'Modal Header',
      modalSubtitle: 'This is an optional subtitle',
      icon: <Smile size={32} />
    }
  }
};


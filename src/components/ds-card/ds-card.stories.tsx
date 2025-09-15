import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DsCard1 } from './ds-card';
import { DsButton } from '../ds-button/ds-button';

const meta = {
  title: ' Components/Cards',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A collection of card components built using existing design system components like DsPopover, DsTextInput, DsCheckbox, and DsButton. These cards provide structured layouts for different use cases including search and selection, simple content display, form inputs, and status messaging.'
      }
    }
  }
} satisfies Meta;

export default meta;

export const Card: StoryObj<typeof DsCard1> = {
  name: 'Card',
  render: () => (
    <div style={{ 
      padding: '40px',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '600px'
    }}>
      <DsCard1
        title="Add toppings"
        searchPlaceholder="Search for your fav topping"
        options={[
          { label: "Pepperoni", value: "pepperoni", checked: true },
          { label: "Mushrooms", value: "mushrooms", checked: false },
          { label: "Sausage", value: "sausage", checked: false },
          { label: "Onions", value: "onions", checked: false },
          { label: "Bell Peppers", value: "bell-peppers", checked: false },
          { label: "Extra Cheese", value: "extra-cheese", checked: false },
        ]}
        primaryAction={{
          label: "Add toppings",
          onClick: () => console.log('Add toppings clicked')
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: () => console.log('Cancel clicked')
        }}
        onClose={() => console.log('Close clicked')}
        onSearchChange={(value) => console.log('Search:', value)}
        onOptionToggle={(value, checked) => console.log('Option toggled:', value, checked)}
        isOpen={true}
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'A clean, focused modal card implementation with search functionality and custom checkboxes. Uses design system tokens with Tailwind utilities and proper 521px width from Figma.'
      }
    }
  },
  decorators: [
    (Story) => {
      React.useEffect(() => {
        // Override the fixed positioning and body scroll lock for Storybook
        const style = document.createElement('style');
        style.textContent = `
          .sb-show-main [role="dialog"] {
            position: static !important;
            background-color: transparent !important;
            padding: 0 !important;
          }
          body {
            overflow: auto !important;
          }
        `;
        document.head.appendChild(style);
        
        // Force body overflow to be auto and prevent component from changing it
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'auto';
        
        // Watch for changes and reset
        const observer = new MutationObserver(() => {
          if (document.body.style.overflow !== 'auto') {
            document.body.style.overflow = 'auto';
          }
        });
        
        observer.observe(document.body, {
          attributes: true,
          attributeFilter: ['style']
        });
        
        return () => {
          document.head.removeChild(style);
          observer.disconnect();
          document.body.style.overflow = originalOverflow;
        };
      }, []);
      
      return <Story />;
    }
  ]
};


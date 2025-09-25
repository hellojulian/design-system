import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: '  Foundations/Colors',
  parameters: {
    docs: {
      description: {
        component: 'Our design system uses a comprehensive color palette that supports both light and dark themes. Colors are organized into primitive values and semantic tokens that ensure consistency across all components.'
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ColorCell = ({ name, token, hex }: { name: string; token: string; hex: string }) => (
  <div style={{
    borderRadius: '6px',
    border: '1px solid var(--ds-color-divider-soft)',
    overflow: 'hidden',
    backgroundColor: 'var(--ds-color-background-elevated)',
    width: '100%',
    minHeight: '80px'
  }}>
    <div style={{
      height: '40px',
      width: '100%',
      backgroundColor: hex
    }} />
    <div style={{
      padding: '8px'
    }}>
      <p style={{
        fontSize: '12px',
        fontWeight: '600',
        margin: '0 0 2px 0',
        color: 'var(--ds-color-foreground-default)',
        fontFamily: 'Inter Tight, var(--ds-font-family)',
        lineHeight: '1.2'
      }}>{name}</p>
      <p style={{
        fontSize: '10px',
        fontFamily: 'Inter Tight, Monaco, Consolas, monospace',
        color: 'var(--ds-color-foreground-soft)',
        margin: '0 0 2px 0',
        lineHeight: '1.2'
      }}>{token}</p>
      <p style={{
        fontSize: '10px',
        fontFamily: 'Inter Tight, Monaco, Consolas, monospace',
        color: 'var(--ds-color-foreground-softest)',
        margin: '0',
        lineHeight: '1.2'
      }}>{hex}</p>
    </div>
  </div>
);

const ColorColumn = ({ title, colors }: { title: string; colors: Array<{name: string, token: string, hex: string}> }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    minWidth: '120px',
    maxWidth: '140px'
  }}>
    <h3 style={{
      fontSize: '14px',
      fontWeight: '600',
      margin: '0 0 8px 0',
      paddingBottom: '4px',
      borderBottom: '1px solid var(--ds-color-divider-solid)',
      color: 'var(--ds-color-foreground-default)',
      fontFamily: 'Inter Tight, var(--ds-font-family)',
      width: '100%',
      textAlign: 'center'
    }}>{title}</h3>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: '100%'
    }}>
      {colors.map((color, index) => (
        <ColorCell key={index} name={color.name} token={color.token} hex={color.hex} />
      ))}
    </div>
  </div>
);

const neutralColors = [
  { name: 'Neutral 50', token: '--ds-color-neutral-50', hex: '#f2f2f3' },
  { name: 'Neutral 100', token: '--ds-color-neutral-100', hex: '#efefef' },
  { name: 'Neutral 200', token: '--ds-color-neutral-200', hex: '#bdbdc2' },
  { name: 'Neutral 300', token: '--ds-color-neutral-300', hex: '#a2a2a9' },
  { name: 'Neutral 400', token: '--ds-color-neutral-400', hex: '#878791' },
  { name: 'Neutral 500', token: '--ds-color-neutral-500', hex: '#676770' },
  { name: 'Neutral 600', token: '--ds-color-neutral-600', hex: '#434349' },
  { name: 'Neutral 700', token: '--ds-color-neutral-700', hex: '#2b2b2e' },
  { name: 'Neutral 800', token: '--ds-color-neutral-800', hex: '#1f1f21' },
  { name: 'Neutral 900', token: '--ds-color-neutral-900', hex: '#121214' },
  { name: 'Neutral 950', token: '--ds-color-neutral-950', hex: '#060607' }
];

const blueColors = [
  { name: 'Blue 50', token: '--ds-color-blue-50', hex: '#f0f4ff' },
  { name: 'Blue 100', token: '--ds-color-blue-100', hex: '#e5ebfe' },
  { name: 'Blue 200', token: '--ds-color-blue-200', hex: '#cdd9fe' },
  { name: 'Blue 300', token: '--ds-color-blue-300', hex: '#91acfd' },
  { name: 'Blue 400', token: '--ds-color-blue-400', hex: '#7593fb' },
  { name: 'Blue 500', token: '--ds-color-blue-500', hex: '#6187fa' },
  { name: 'Blue 600', token: '--ds-color-blue-600', hex: '#4d73f6' },
  { name: 'Blue 700', token: '--ds-color-blue-700', hex: '#3d69f2' },
  { name: 'Blue 800', token: '--ds-color-blue-800', hex: '#2856e0' },
  { name: 'Blue 900', token: '--ds-color-blue-900', hex: '#1d4bd6' },
  { name: 'Blue 950', token: '--ds-color-blue-950', hex: '#152e7a' }
];

const purpleColors = [
  { name: 'Purple 50', token: '--ds-color-purple-50', hex: '#f7f5ff' },
  { name: 'Purple 100', token: '--ds-color-purple-100', hex: '#ede7fe' },
  { name: 'Purple 200', token: '--ds-color-purple-200', hex: '#e1d7fe' },
  { name: 'Purple 300', token: '--ds-color-purple-300', hex: '#c6b4fd' },
  { name: 'Purple 400', token: '--ds-color-purple-400', hex: '#b69efb' },
  { name: 'Purple 500', token: '--ds-color-purple-500', hex: '#a689fa' },
  { name: 'Purple 600', token: '--ds-color-purple-600', hex: '#9673f8' },
  { name: 'Purple 700', token: '--ds-color-purple-700', hex: '#855ef6' },
  { name: 'Purple 800', token: '--ds-color-purple-800', hex: '#714ce0' },
  { name: 'Purple 900', token: '--ds-color-purple-900', hex: '#4621b5' },
  { name: 'Purple 950', token: '--ds-color-purple-950', hex: '#3b1d95' }
];

const greenColors = [
  { name: 'Green 50', token: '--ds-color-green-50', hex: '#edfdf6' },
  { name: 'Green 100', token: '--ds-color-green-100', hex: '#d1fae9' },
  { name: 'Green 200', token: '--ds-color-green-200', hex: '#a5f3d2' },
  { name: 'Green 300', token: '--ds-color-green-300', hex: '#6ee7b5' },
  { name: 'Green 400', token: '--ds-color-green-400', hex: '#52dda3' },
  { name: 'Green 500', token: '--ds-color-green-500', hex: '#36d392' },
  { name: 'Green 600', token: '--ds-color-green-600', hex: '#1fbf7b' },
  { name: 'Green 700', token: '--ds-color-green-700', hex: '#08a464' },
  { name: 'Green 800', token: '--ds-color-green-800', hex: '#088752' },
  { name: 'Green 900', token: '--ds-color-green-900', hex: '#06603a' },
  { name: 'Green 950', token: '--ds-color-green-950', hex: '#064c2f' }
];

const yellowColors = [
  { name: 'Yellow 50', token: '--ds-color-yellow-50', hex: '#fffaeb' },
  { name: 'Yellow 100', token: '--ds-color-yellow-100', hex: '#fff5d6' },
  { name: 'Yellow 200', token: '--ds-color-yellow-200', hex: '#fee9a9' },
  { name: 'Yellow 300', token: '--ds-color-yellow-300', hex: '#fdda72' },
  { name: 'Yellow 400', token: '--ds-color-yellow-400', hex: '#fcd354' },
  { name: 'Yellow 500', token: '--ds-color-yellow-500', hex: '#fbcb3c' },
  { name: 'Yellow 600', token: '--ds-color-yellow-600', hex: '#f5bd1f' },
  { name: 'Yellow 700', token: '--ds-color-yellow-700', hex: '#e5a80b' },
  { name: 'Yellow 800', token: '--ds-color-yellow-800', hex: '#b8870a' },
  { name: 'Yellow 900', token: '--ds-color-yellow-900', hex: '#8b6708' },
  { name: 'Yellow 950', token: '--ds-color-yellow-950', hex: '#5e4506' }
];

const brownColors = [
  { name: 'Brown 50', token: '--ds-color-brown-50', hex: '#fdf7f0' },
  { name: 'Brown 100', token: '--ds-color-brown-100', hex: '#faede1' },
  { name: 'Brown 200', token: '--ds-color-brown-200', hex: '#f4d5b7' },
  { name: 'Brown 300', token: '--ds-color-brown-300', hex: '#edbf8e' },
  { name: 'Brown 400', token: '--ds-color-brown-400', hex: '#e5a564' },
  { name: 'Brown 500', token: '--ds-color-brown-500', hex: '#dd8e3a' },
  { name: 'Brown 600', token: '--ds-color-brown-600', hex: '#d4771f' },
  { name: 'Brown 700', token: '--ds-color-brown-700', hex: '#db850b' },
  { name: 'Brown 800', token: '--ds-color-brown-800', hex: '#b26c09' },
  { name: 'Brown 900', token: '--ds-color-brown-900', hex: '#80500d' },
  { name: 'Brown 950', token: '--ds-color-brown-950', hex: '#66420f' }
];

const redColors = [
  { name: 'Red 50', token: '--ds-color-red-50', hex: '#fef1f1' },
  { name: 'Red 100', token: '--ds-color-red-100', hex: '#fee1e1' },
  { name: 'Red 200', token: '--ds-color-red-200', hex: '#fec8c8' },
  { name: 'Red 300', token: '--ds-color-red-300', hex: '#fca6a6' },
  { name: 'Red 400', token: '--ds-color-red-400', hex: '#fa8c8c' },
  { name: 'Red 500', token: '--ds-color-red-500', hex: '#f87272' },
  { name: 'Red 600', token: '--ds-color-red-600', hex: '#f55858' },
  { name: 'Red 700', token: '--ds-color-red-700', hex: '#ef4343' },
  { name: 'Red 800', token: '--ds-color-red-800', hex: '#e02d3c' },
  { name: 'Red 900', token: '--ds-color-red-900', hex: '#981b25' },
  { name: 'Red 950', token: '--ds-color-red-950', hex: '#680d14' }
];

export const ColorPalette: Story = {
  render: () => (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'var(--ds-color-background-default)',
      padding: '20px',
      boxSizing: 'border-box',
      overflow: 'auto'
    }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: '16px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <ColorColumn title="Neutral" colors={neutralColors} />
        <ColorColumn title="Blue" colors={blueColors} />
        <ColorColumn title="Purple" colors={purpleColors} />
        <ColorColumn title="Green" colors={greenColors} />
        <ColorColumn title="Yellow" colors={yellowColors} />
        <ColorColumn title="Brown" colors={brownColors} />
        <ColorColumn title="Red" colors={redColors} />
      </div>
    </div>
  ),
  name: 'Color Palette',
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive'
    },
    controls: { disable: true },
    docs: {
      description: {
        story: 'Complete color palette showing all available color tokens with visual swatches, token names, and hex values. This matches the design system structure with 7 color families and usage guidelines.'
      },
      canvas: {
        sourceState: 'shown'
      }
    }
  },
  argTypes: {},
  args: {}
};
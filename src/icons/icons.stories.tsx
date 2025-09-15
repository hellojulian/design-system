import React from 'react';
import type { StoryObj } from '@storybook/react';
import { 
  Home, 
  User, 
  Settings, 
  Bell, 
  Mail, 
  Search, 
  Heart, 
  Star, 
  Download, 
  Upload, 
  Edit, 
  Trash2, 
  Plus, 
  Minus, 
  Check, 
  X, 
  ChevronDown, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Info,
  Calendar,
  Clock,
  File,
  Folder,
  Image,
  Video,
  Music,
  Camera,
  Phone,
  MessageCircle
} from 'lucide-react';

const meta = {
  title: ' Components/Icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A showcase of commonly used Lucide React icons from the Lucide React library. These icons provide consistent styling and sizing for the design system. Use them directly in your components by importing from "lucide-react".'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const IconItem = ({ icon: Icon, name, size = 24 }: { icon: any; name: string; size?: number }) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    gap: '8px',
    padding: '12px',
    border: '1px solid var(--ds-color-divider-soft)',
    borderRadius: '8px',
    backgroundColor: 'var(--ds-color-background-elevated)',
    minHeight: '80px',
    justifyContent: 'center'
  }}>
    <Icon size={size} color="var(--ds-color-icon)" />
    <span style={{ 
      fontSize: '12px',
      color: 'var(--ds-color-foreground-soft)', 
      fontFamily: 'var(--ds-font-family)',
      textAlign: 'center',
      lineHeight: '1.2'
    }}>
      {name}
    </span>
  </div>
);

export const LucideIcons: Story = {
  name: 'Lucide React Icons',
  render: () => {
    const icons = [
      { icon: Home, name: 'Home' },
      { icon: User, name: 'User' },
      { icon: Settings, name: 'Settings' },
      { icon: Search, name: 'Search' },
      { icon: Bell, name: 'Bell' },
      { icon: Mail, name: 'Mail' },
      { icon: Calendar, name: 'Calendar' },
      { icon: Clock, name: 'Clock' },
      { icon: Plus, name: 'Plus' },
      { icon: Minus, name: 'Minus' },
      { icon: Edit, name: 'Edit' },
      { icon: Trash2, name: 'Trash' },
      { icon: Download, name: 'Download' },
      { icon: Upload, name: 'Upload' },
      { icon: Check, name: 'Check' },
      { icon: X, name: 'Close' },
      { icon: ChevronDown, name: 'Chevron Down' },
      { icon: ChevronRight, name: 'Chevron Right' },
      { icon: ArrowLeft, name: 'Arrow Left' },
      { icon: ArrowRight, name: 'Arrow Right' },
      { icon: AlertCircle, name: 'Alert' },
      { icon: CheckCircle, name: 'Success' },
      { icon: Info, name: 'Info' },
      { icon: Heart, name: 'Heart' },
      { icon: Star, name: 'Star' },
      { icon: File, name: 'File' },
      { icon: Folder, name: 'Folder' },
      { icon: Image, name: 'Image' },
      { icon: Video, name: 'Video' },
      { icon: Music, name: 'Music' },
      { icon: Camera, name: 'Camera' },
      { icon: Phone, name: 'Phone' },
      { icon: MessageCircle, name: 'Message' }
    ];

    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
        gap: '16px',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px'
      }}>
        {icons.map(({ icon, name }) => (
          <IconItem key={name} icon={icon} name={name} />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive gallery of commonly used Lucide React icons organized by category. These icons are commonly used throughout the design system components and applications. Import any of these icons directly from "lucide-react" package.'
      }
    }
  }
};

export const IconSizes: Story = {
  name: 'Icon Sizes',
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '16px', 
      alignItems: 'flex-end',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Heart size={16} color="var(--ds-color-icon)" />
        <span style={{ fontSize: '12px', color: 'var(--ds-color-foreground-soft)', fontFamily: 'var(--ds-font-family)' }}>16px</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Heart size={20} color="var(--ds-color-icon)" />
        <span style={{ fontSize: '12px', color: 'var(--ds-color-foreground-soft)', fontFamily: 'var(--ds-font-family)' }}>20px</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Heart size={24} color="var(--ds-color-icon)" />
        <span style={{ fontSize: '12px', color: 'var(--ds-color-foreground-soft)', fontFamily: 'var(--ds-font-family)' }}>24px (default)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Heart size={32} color="var(--ds-color-icon)" />
        <span style={{ fontSize: '12px', color: 'var(--ds-color-foreground-soft)', fontFamily: 'var(--ds-font-family)' }}>32px</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Heart size={48} color="var(--ds-color-icon)" />
        <span style={{ fontSize: '12px', color: 'var(--ds-color-foreground-soft)', fontFamily: 'var(--ds-font-family)' }}>48px</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icons can be displayed at different sizes using the `size` prop. The default size is 24px, but you can use any size that fits your design needs. Common sizes include 16px, 20px, 24px, 32px, and 48px.'
      }
    }
  }
};
import React, { useState, useEffect, useRef } from 'react';
import { Search, CircleX } from 'lucide-react';
import { DsButton } from '../ds-button/ds-button';
import { DsOptionGroup, type Option } from '../ds-option-group/ds-option-group';
import { DsCheckbox } from '../ds-checkbox/ds-checkbox';

interface ToppingOption {
  id: string;
  name: string;
  checked: boolean;
}

export interface DsCard1Props {
  title?: string;
  searchPlaceholder?: string;
  options?: Array<{
    label: string;
    value: string;
    checked?: boolean;
  }>;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  onSearchChange?: (value: string) => void;
  onOptionToggle?: (value: string, checked: boolean) => void;
  isOpen?: boolean;
  children?: React.ReactNode;
}

export const DsCard1 = ({
  title = "Add toppings",
  searchPlaceholder = "Search for your fav topping",
  options = [
    { label: "Pepperoni", value: "pepperoni", checked: true },
    { label: "Mushrooms", value: "mushrooms", checked: false },
    { label: "Sausage", value: "sausage", checked: false },
    { label: "Onions", value: "onions", checked: false },
  ],
  primaryAction = { label: "Add toppings", onClick: () => {} },
  secondaryAction = { label: "Cancel", onClick: () => {} },
  onClose,
  onSearchChange,
  onOptionToggle,
  isOpen = true,
}: DsCard1Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [toppings, setToppings] = useState<ToppingOption[]>(
    options.map(opt => ({
      id: opt.value,
      name: opt.label,
      checked: opt.checked || false
    }))
  );

  // Accessibility refs and IDs
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = `ds-card1-title-${Math.random().toString(36).substring(7)}`;
  const searchId = `ds-card1-search-${Math.random().toString(36).substring(7)}`;
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Store the last focused element when modal opens
  useEffect(() => {
    if (isOpen) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      // Focus the modal container
      modalRef.current?.focus();
    } else {
      // Return focus when modal closes
      lastFocusedElement.current?.focus();
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent background scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus trap logic
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  const filteredToppings = toppings.filter(topping =>
    topping.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTopping = (id: string) => {
    setToppings(prev =>
      prev.map(topping =>
        topping.id === id ? { ...topping, checked: !topping.checked } : topping
      )
    );
    const topping = toppings.find(t => t.id === id);
    if (topping) {
      onOptionToggle?.(id, !topping.checked);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const handleAddToppings = () => {
    const selectedToppings = toppings.filter(t => t.checked).map(t => t.name);
    primaryAction.onClick();
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        zIndex: 50
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        style={{
          width: '100%',
          maxWidth: '521px',
          minWidth: '320px',
          backgroundColor: 'var(--ds-color-background-base)',
          borderRadius: 'var(--ds-radius-xxlg)',
          border: '1px solid var(--ds-color-divider-soft)',
          boxShadow: '0 0 10px -2px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 'var(--ds-space-xlg)',
          borderBottom: '1px solid var(--ds-color-divider-soft)',
          backgroundColor: 'var(--ds-color-background-base)',
          borderRadius: 'var(--ds-radius-xxlg) var(--ds-radius-xxlg) 0 0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--ds-space-lg)'
          }}>
            <h2 
              id={titleId}
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'var(--ds-color-foreground-default)',
                lineHeight: '26px',
                margin: 0,
                paddingRight: 'var(--ds-space-md)',
                fontFamily: 'var(--ds-font-family)'
              }}
            >
              {title}
            </h2>
            {onClose && (
              <button
                onClick={onClose}
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--ds-radius-sm)',
                  cursor: 'pointer'
                }}
                aria-label="Close modal"
              >
                <CircleX style={{ width: '32px', height: '32px', color: 'black' }} />
              </button>
            )}
          </div>
          
          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-space-xs)',
              height: 'var(--ds-control-height-md)',
              padding: '0 var(--ds-space-md)',
              border: '1px solid var(--ds-color-divider-soft)',
              borderRadius: 'var(--ds-radius-lg)',
              backgroundColor: 'var(--ds-color-background-base)'
            }}>
              <Search style={{ 
                width: '16px', 
                height: '16px', 
                color: 'var(--ds-color-foreground-soft)', 
                marginLeft: 'var(--ds-space-xs)',
                flexShrink: 0 
              }} />
              <input
                id={searchId}
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                aria-label="Search toppings"
                role="searchbox"
                aria-expanded={filteredToppings.length > 0}
                aria-haspopup="listbox"
                style={{
                  flex: 1,
                  height: '32px',
                  padding: '0 var(--ds-space-md)',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--ds-color-foreground-default)',
                  backgroundColor: 'var(--ds-color-background-base)',
                  border: 'none',
                  outline: 'none',
                  minWidth: 0,
                  fontFamily: 'var(--ds-font-family)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Body - Toppings List */}
        <div style={{
          padding: 'var(--ds-space-lg) var(--ds-space-xlg)',
          backgroundColor: 'var(--ds-color-background-elevated)',
          height: '160px', // Fixed height to match Figma design
          overflowY: 'auto'
        }}>
          <div style={{
            // Override dsOptionGroup default styles to match card design
            border: 'none',
            background: 'transparent',
            padding: '0'
          }}>
            <DsOptionGroup
              options={filteredToppings.map(topping => ({
                label: topping.name,
                value: topping.id,
                prefix: (
                  <DsCheckbox
                    checked={topping.checked}
                    onToggle={(checked) => toggleTopping(topping.id)}
                    ariaLabel={`Select ${topping.name}`}
                  />
                )
              }))}
              className="ds-card-option-group"
              role="listbox"
              ariaLabel="Select toppings"
              onSelect={(value) => toggleTopping(value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 'var(--ds-space-lg)',
          padding: 'var(--ds-space-xlg)',
          borderTop: '1px solid var(--ds-color-divider-soft)',
          backgroundColor: 'var(--ds-color-background-base)',
          borderRadius: '0 0 var(--ds-radius-xxlg) var(--ds-radius-xxlg)'
        }}>
          {secondaryAction && (
            <div style={{ display: 'contents' }}>
              <DsButton
                onClick={() => { secondaryAction.onClick(); onClose?.(); }}
                label={secondaryAction.label}
                hierarchy="secondary"
                actionType="neutral"
                size="medium"
              />
            </div>
          )}
          <div style={{ display: 'contents' }}>
            <DsButton
              onClick={handleAddToppings}
              label={primaryAction.label}
              hierarchy="primary"
              actionType="neutral"
              size="medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
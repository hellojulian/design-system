import React, { useState, useEffect, useRef } from 'react';
import { DsButton } from '../ds-button/ds-button';
import DsIconX12x12 from '../../icons/ds-icon-x-16x16';
import bgImage from '../../img/bg.png';

export interface DsCard2Props {
  title?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  isOpen?: boolean;
  children?: React.ReactNode;
}

export const DsCard2 = ({
  title = "Card with image",
  primaryAction = { label: "Card with image", onClick: () => {} },
  secondaryAction = { label: "Cancel", onClick: () => {} },
  onClose,
  isOpen = true,
}: DsCard2Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = `ds-card2-title-${Math.random().toString(36).substring(7)}`;
  const bodyId = `ds-card2-body-${Math.random().toString(36).substring(7)}`;
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

  const handlePrimaryAction = () => {
    primaryAction.onClick();
    onClose?.();
  };

  const handleSecondaryAction = () => {
    secondaryAction.onClick();
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
      aria-describedby={bodyId}
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
        className="ds-card"
        style={{
          width: '100%',
          maxWidth: '321px',
          minWidth: '320px',
          backgroundColor: 'var(--ds-color-background-base)',
          borderRadius: 'var(--ds-radius-xxlg)',
          border: '1px solid var(--ds-color-divider-soft)',
          boxShadow: '0 0 10px -2px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          position: 'relative'
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
            justifyContent: 'space-between'
          }}>
            <h2 
              id={titleId}
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'var(--ds-color-foreground-default)',
                lineHeight: '26px',
                margin: 0,
                fontFamily: 'var(--ds-font-family)'
              }}
            >
              {title}
            </h2>
            {onClose && (
              <DsButton 
                onClick={onClose}
                hierarchy="tertiary"
                icon={<DsIconX12x12 />}
                aria-label="Close modal"
                style={{
                  width: '28px',
                  height: '28px',
                  minWidth: '28px',
                  padding: '4px'
                }}
              />
            )}
          </div>
        </div>

        {/* Body - Image Area */}
        <div 
          id={bodyId}
          style={{
            padding: 'var(--ds-space-xxlg)',
            backgroundColor: 'var(--ds-color-background-elevated)',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{
            width: '100%',
            height: '200px',
            borderRadius: 'var(--ds-radius-xlg)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <img
              src={bgImage}
              alt="Colorful abstract shapes"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
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
                onClick={handleSecondaryAction}
                label={secondaryAction.label}
                hierarchy="secondary"
                actionType="neutral"
                size="medium"
              />
            </div>
          )}
          <div style={{ display: 'contents' }}>
            <DsButton
              onClick={handlePrimaryAction}
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
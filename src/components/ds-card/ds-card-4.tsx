import React, { useState } from 'react';
import { DsPopover } from '../ds-popover/ds-popover';
import { DsButton } from '../ds-button/ds-button';
import { DsCheckbox } from '../ds-checkbox/ds-checkbox';
import { Heart } from 'lucide-react';
import { prefix } from '../prefix';
import WelcomeImage from '../../img/bg.png';

const compPrefix = `${prefix}-card`;

export interface DsCard4Props {
  title?: string;
  message?: string;
  illustration?: string;
  skipForNow?: boolean;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  onSkipToggle?: (checked: boolean) => void;
  isOpen?: boolean;
  children: React.ReactNode;
}

export const DsCard4 = ({
  title = "Welcome to the Design System",
  message = "Happy you're here!",
  illustration = WelcomeImage,
  skipForNow = false,
  primaryAction = { label: "Continue", onClick: () => {} },
  secondaryAction = { label: "Skip welcome", onClick: () => {} },
  onClose,
  onSkipToggle,
  isOpen = true,
  children
}: DsCard4Props) => {
  const [skipChecked, setSkipChecked] = useState(skipForNow);

  const handleSkipToggle = () => {
    const newValue = !skipChecked;
    setSkipChecked(newValue);
    onSkipToggle?.(newValue);
  };

  const popoverBody = (
    <div className={`${compPrefix}-4-body`}>
      <div className={`${compPrefix}-4-header`}>
        <div className={`${compPrefix}-4-icon`}>
          <Heart size={24} />
        </div>
        <div className={`${compPrefix}-4-content`}>
          <h3 className={`${compPrefix}-4-title`}>{title}</h3>
          <p className={`${compPrefix}-4-message`}>{message}</p>
        </div>
      </div>
      
      <div className={`${compPrefix}-4-illustration`}>
        <img src={illustration} alt="Welcome illustration" />
      </div>
      
      <div className={`${compPrefix}-4-skip-option`}>
        <DsCheckbox
          checked={skipChecked}
          onToggle={handleSkipToggle}
          checkLabel="Skip for now"
        />
      </div>
    </div>
  );

  return (
    <DsPopover
      isOpen={isOpen}
      header={{
        titleText: title,
        dismissible: !!onClose,
        onDismiss: onClose
      }}
      body={popoverBody}
      footer={{
        primaryAction: {
          label: primaryAction.label,
          onClick: primaryAction.onClick,
          hierarchy: 'primary',
          actionType: 'neutral',
          size: 'medium'
        },
        secondaryAction: secondaryAction ? {
          label: secondaryAction.label,
          onClick: secondaryAction.onClick,
          hierarchy: 'secondary',
          actionType: 'neutral',
          size: 'medium'
        } : undefined
      }}
      onClickOutside={onClose}
    >
      {children}
    </DsPopover>
  );
};
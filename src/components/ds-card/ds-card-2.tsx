import React, { useState } from 'react';
import { DsPopover } from '../ds-popover/ds-popover';
import { DsTextInput } from '../ds-text-input/ds-text-input';
import { DsButton } from '../ds-button/ds-button';
import { prefix } from '../prefix';

const compPrefix = `${prefix}-card`;

export interface DsCard2Props {
  title?: string;
  description?: string;
  emailPlaceholder?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  onEmailChange?: (value: string) => void;
  isOpen?: boolean;
  children: React.ReactNode;
}

export const DsCard2 = ({
  title = "Sign Up",
  description = "Create an account to start",
  emailPlaceholder = "your@email.com",
  primaryAction = { label: "Continue", onClick: () => {} },
  secondaryAction = { label: "Cancel", onClick: () => {} },
  onEmailChange,
  isOpen = true,
  children
}: DsCard2Props) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (value: string) => {
    setEmail(value);
    onEmailChange?.(value);
  };

  const popoverBody = (
    <div className={`${compPrefix}-2-body`}>
      <div className={`${compPrefix}-2-content`}>
        <h3 className={`${compPrefix}-2-title`}>{title}</h3>
        <p className={`${compPrefix}-2-description`}>{description}</p>
      </div>
      <div className={`${compPrefix}-2-form`}>
        <DsTextInput
          placeholder={emailPlaceholder}
          value={email}
          onChange={handleEmailChange}
        />
      </div>
    </div>
  );

  return (
    <DsPopover
      isOpen={isOpen}
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
    >
      {children}
    </DsPopover>
  );
};
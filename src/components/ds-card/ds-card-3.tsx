import React, { useState } from 'react';
import { DsPopover } from '../ds-popover/ds-popover';
import { DsTextInput } from '../ds-text-input/ds-text-input';
import { DsButton } from '../ds-button/ds-button';
import { DsStepper } from '../ds-stepper/ds-stepper';
import { DsSelect } from '../ds-select/ds-select';
import { DsCheckbox } from '../ds-checkbox/ds-checkbox';
import { Home, AlertTriangle } from 'lucide-react';
import { prefix } from '../prefix';

const compPrefix = `${prefix}-card`;

export interface DsCard3Props {
  title?: string;
  description?: string;
  homeName?: string;
  roomCount?: number;
  selectedUsers?: string[];
  availableUsers?: Array<{
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
  onHomeNameChange?: (value: string) => void;
  onRoomCountChange?: (value: number) => void;
  onUserToggle?: (value: string, checked: boolean) => void;
  isOpen?: boolean;
  children: React.ReactNode;
}

export const DsCard3 = ({
  title = "New Home",
  description = "Configure settings for your new home",
  homeName = "",
  roomCount = 3,
  selectedUsers = ["Alex", "Ben"],
  availableUsers = [
    { label: "Alex", value: "alex", checked: true },
    { label: "Ben", value: "ben", checked: true },
    { label: "John", value: "john", checked: false },
  ],
  primaryAction = { label: "Create Home", onClick: () => {} },
  secondaryAction = { label: "Cancel", onClick: () => {} },
  onClose,
  onHomeNameChange,
  onRoomCountChange,
  onUserToggle,
  isOpen = true,
  children
}: DsCard3Props) => {
  const [homeNameValue, setHomeNameValue] = useState(homeName);
  const [roomCountValue, setRoomCountValue] = useState(roomCount);
  const [userStates, setUserStates] = useState(
    availableUsers.reduce((acc, user) => ({
      ...acc,
      [user.value]: user.checked || false
    }), {} as Record<string, boolean>)
  );
  const [shareWith, setShareWith] = useState(selectedUsers);

  const handleHomeNameChange = (value: string) => {
    setHomeNameValue(value);
    onHomeNameChange?.(value);
  };

  const handleRoomCountChange = (value: number) => {
    setRoomCountValue(value);
    onRoomCountChange?.(value);
  };

  const handleUserToggle = (value: string) => {
    const newChecked = !userStates[value];
    setUserStates(prev => ({ ...prev, [value]: newChecked }));
    onUserToggle?.(value, newChecked);
  };

  const popoverBody = (
    <div className={`${compPrefix}-3-body`}>
      <div className={`${compPrefix}-3-header`}>
        <div className={`${compPrefix}-3-icon`}>
          <Home size={24} />
        </div>
        <div className={`${compPrefix}-3-content`}>
          <h3 className={`${compPrefix}-3-title`}>{title}</h3>
          <p className={`${compPrefix}-3-description`}>{description}</p>
        </div>
      </div>
      
      <div className={`${compPrefix}-3-fields`}>
        <div className={`${compPrefix}-3-field-row`}>
          <div className={`${compPrefix}-3-field`}>
            <label className={`${compPrefix}-3-label`}>Home name</label>
            <DsTextInput
              placeholder="ex. Vacation Home"
              value={homeNameValue}
              onChange={handleHomeNameChange}
            />
          </div>
          <div className={`${compPrefix}-3-field`}>
            <label className={`${compPrefix}-3-label`}>Number of rooms</label>
            <DsStepper
              value={roomCountValue}
              onChange={handleRoomCountChange}
            />
          </div>
        </div>
        
        <div className={`${compPrefix}-3-field`}>
          <label className={`${compPrefix}-3-label`}>Share home with</label>
          <DsSelect
            type="multi-value"
            value={shareWith}
            onChange={setShareWith}
            options={availableUsers.map(user => ({ label: user.label, value: user.value }))}
            placeholder="Select users"
            fixedHeight={false}
          />
          
          <div className={`${compPrefix}-3-user-options`}>
            {availableUsers.map((user) => (
              <div key={user.value} className={`${compPrefix}-3-user-option`}>
                <DsCheckbox
                  checked={userStates[user.value]}
                  onToggle={() => handleUserToggle(user.value)}
                  checkLabel={user.label}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className={`${compPrefix}-3-warning`}>
        <AlertTriangle size={16} />
        <span>Permissions for this home will be shared</span>
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
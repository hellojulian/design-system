import React from 'react';
import { prefix } from '../prefix';
import DsIconCheck12X12 from '../../icons/ds-icon-check-12x12';
import classnames from 'classnames';
import DsIconIndeterminateLine2x10 from '../../icons/ds-icon-indeterminate-line-2x10';

const compPrefix = `${prefix}-checkbox`;

export interface dsCheckboxProps {
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  onToggle: (isChecked: boolean) => void
  checkLabel?: string

  ariaLabel?: string
  ariaDescribedBy?: string
  id?: string
  className?: string
}

export const DsCheckbox = (props: dsCheckboxProps) => {
  const checkboxId = React.useMemo(() => props.id || `${compPrefix}-${Math.random().toString(36).substring(7)}`, [props.id]);
  const labelId = React.useMemo(() => `${checkboxId}-label`, [checkboxId]);
  
  const classNames = classnames(
    `${compPrefix}-wrapper`,
    props.disabled ? `${prefix}-disabled` : `${prefix}-interactable`,
    props.className,
    (props.checked || props.indeterminate) ? 'checked' : ''
  );

  const handleToggle = () => {
    if (!props.disabled) {
      props.onToggle(!props.checked);
    }
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleToggle();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  const getAriaChecked = () => {
    if (props.indeterminate) return 'mixed';
    return props.checked || false;
  };

  return (
    <div className={classNames} onClick={onClick}>
      <div 
        id={checkboxId}
        role='checkbox'
        className={compPrefix}
        tabIndex={props.disabled ? -1 : 0}
        onKeyDown={onKeyDown}
        aria-checked={getAriaChecked()}
        aria-disabled={props.disabled}
        aria-label={props.ariaLabel}
        aria-describedby={props.ariaDescribedBy || (props.checkLabel ? labelId : undefined)}
        aria-labelledby={props.checkLabel && !props.ariaLabel ? labelId : undefined}
      >
        {props.checked ? <DsIconCheck12X12 aria-hidden="true" /> : props.indeterminate ? <DsIconIndeterminateLine2x10 aria-hidden="true" /> : null}
      </div>
      {props.checkLabel && <label id={labelId} htmlFor={checkboxId} className={`${compPrefix}-label`}>{props.checkLabel}</label>}
    </div>
  );
};

// Backward compatibility
export const dsCheckbox = DsCheckbox;

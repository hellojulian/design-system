import React from 'react';
import { prefix } from '../prefix';
import classnames from 'classnames';

const compPrefix = `${prefix}-button`;

export interface Option {
  label: string
  value: string
}

export interface dsButtonProps {
  size?: 'small' | 'medium' | 'large'
  hierarchy?: 'primary' | 'secondary' | 'tertiary'
  actionType?: 'neutral' | 'success' | 'destructive'
  disabled?: boolean
  label?: string
  icon?: JSX.Element
  iconRight?: JSX.Element
  isLoading?: boolean
  onClick?: () => void

  ariaLabel?: string
  className?: string
}

export const DsButton = (props: dsButtonProps) => {
  const size = props.size || 'medium';
  const hierarchy = props.hierarchy || 'primary';
  const actionType = props.actionType || 'neutral';

  const classNames = classnames(
    `${compPrefix}`,
    `${compPrefix}--size-${hierarchy === 'tertiary' ? 'medium' : size}`,
    `${compPrefix}--hierarchy-${hierarchy}`,
    `${compPrefix}--action-${actionType}`,
    props.disabled ? `${prefix}-disabled` : `${prefix}-interactable`,
    props.className
  );

  // Generate accessible label
  const getAccessibleLabel = () => {
    if (props.ariaLabel) return props.ariaLabel;
    if (props.label) return props.label;
    // For icon-only buttons, require ariaLabel
    if (props.icon && !props.label) {
      console.warn('DsButton: Icon-only buttons require ariaLabel prop for accessibility');
    }
    return undefined;
  };

  return (
    <button
      type="button"
      className={classNames}
      aria-disabled={props.disabled}
      disabled={props.disabled}
      onClick={props.disabled ? undefined : props.onClick}
      aria-label={getAccessibleLabel()}
      aria-busy={props.isLoading}
      aria-live={props.isLoading ? "polite" : undefined}
    >
      {props.icon ? <span className={`${compPrefix}-icon`} aria-hidden="true">{props.icon}</span> : null}
      {props.label ? <div className={`${compPrefix}-label-container`}><span className={`${compPrefix}-label`}>{props.label}</span></div> : null}
      {props.iconRight ? <span className={`${compPrefix}-icon-right`} aria-hidden="true">{props.iconRight}</span> : null}
      {props.isLoading && <div className={`${compPrefix}__loader`} aria-hidden="true"></div>}
      {props.isLoading && <span className="sr-only">Loading...</span>}
    </button>
  );
};

// Backward compatibility export
export const dsButton = DsButton;

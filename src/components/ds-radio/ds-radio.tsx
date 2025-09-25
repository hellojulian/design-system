import React from 'react';
import { prefix } from '../prefix';
import classnames from 'classnames';

export interface dsRadioProps {
  checked?: boolean
  disabled?: boolean
  label?: string
  onClick: () => void
  name?: string
  value?: string

  ariaLabel?: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
  className?: string
}

const compPrefix = `${prefix}-radio`;

export const DsRadio = (props: dsRadioProps) => {
  const [focused, setFocused] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);
  const inputId = React.useMemo(() => `${compPrefix}-input-${Math.random().toString(36).substring(7)}`, []);
  const labelId = React.useMemo(() => `${compPrefix}-label-${Math.random().toString(36).substring(7)}`, []);

  const indicatorClassNames = classnames(
    `${compPrefix}-indicator`,
    props.className,
    props.checked ? 'checked' : '',
  );

  const classNames = classnames(
    compPrefix,
    {
      [`${prefix}-interactable`]: !props.disabled,
      [`${prefix}-disabled`]: props.disabled,
      [`${prefix}-focused`]: focused
    }
  );

  const onClick = () => {
    if (props.disabled) return;
    props.onClick();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
      if (!props.disabled) {
        props.onClick();
      }
    }
  };

  // Determine ARIA labeling
  const getAriaLabel = () => {
    if (props.ariaLabel) return props.ariaLabel;
    if (props.label) return undefined; // Use label element
    return undefined;
  };

  const getAriaLabelledBy = () => {
    if (props.ariaLabelledBy) return props.ariaLabelledBy;
    if (props.label) return labelId; // Use label element
    return undefined;
  };

  return (
    <div className={classNames} onClick={onClick}>
      <input 
        id={inputId}
        ref={ref}
        type="radio"
        name={props.name}
        value={props.value}
        checked={props.checked || false}
        disabled={props.disabled || false}
        onChange={props.onClick}
        onKeyDown={onKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={getAriaLabel()}
        aria-labelledby={getAriaLabelledBy()}
        aria-describedby={props.ariaDescribedBy}
        className={`${compPrefix}-input`}
      />
      <div className={indicatorClassNames} aria-hidden="true" />
      {props.label && (
        <label 
          id={labelId} 
          htmlFor={inputId} 
          className={`${compPrefix}-label`}
        >
          {props.label}
        </label>
      )}
    </div>
  );
};

export const dsRadio = DsRadio;

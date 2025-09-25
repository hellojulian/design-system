import React from 'react';
import { prefix } from '../prefix';
import DsIconX12x12 from '../../icons/ds-icon-x-12x12';
import { DsButton } from '../ds-button/ds-button';
import { DsStatusMessage, type DsStatusMessageProps } from '../ds-status-message/ds-status-message';
import classnames from 'classnames';

const compPrefix = `${prefix}-text-input`;

export interface DsTextInputProps {
  value: string
  onChange: (value: string) => void

  clearable?: boolean
  disabled?: boolean
  label?: string
  placeholder?: string
  status?: DsStatusMessageProps
  prefix?: JSX.Element
  suffix?: JSX.Element
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'
  required?: boolean
  autoComplete?: string
  maxLength?: number
  minLength?: number
  pattern?: string

  ariaLabel?: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
  className?: string
  id?: string
}

export const DsTextInput = (props: DsTextInputProps) => {
  const [isActive, setIsActive] = React.useState(false);
  const inputId = props.id || React.useMemo(() => `${compPrefix}-input-${Math.random().toString(36).substring(7)}`, []);
  const labelId = React.useMemo(() => `${compPrefix}-label-${Math.random().toString(36).substring(7)}`, []);
  const statusId = React.useMemo(() => `${compPrefix}-status-${Math.random().toString(36).substring(7)}`, []);
  const clearButtonId = React.useMemo(() => `${compPrefix}-clear-${Math.random().toString(36).substring(7)}`, []);

  const clearValue = React.useCallback(() => {
    props.onChange('');
  }, [props.onChange]);

  const inputContainerClassNames = classnames(
    `${compPrefix}-input-container`,
    {
      [`${prefix}-disabled`]: props.disabled,
      [`${prefix}-interactable`]: !props.disabled && !isActive,
      'has-prefix': !!props.prefix,
      'has-suffix': !!props.suffix
    }
  );

  // Determine ARIA labeling
  const getAriaLabelledBy = () => {
    if (props.ariaLabelledBy) return props.ariaLabelledBy;
    if (props.label) return labelId;
    return undefined;
  };

  // Build aria-describedby list
  const getAriaDescribedBy = () => {
    const describedByIds = [];
    if (props.ariaDescribedBy) describedByIds.push(props.ariaDescribedBy);
    if (props.status) describedByIds.push(statusId);
    return describedByIds.length > 0 ? describedByIds.join(' ') : undefined;
  };

  // Determine if input is invalid
  const isInvalid = props.status?.type === 'invalid';

  return (
    <div className={`${compPrefix}-wrapper ${props.className || ''}`}>
      {props.label && (
        <label id={labelId} htmlFor={inputId} className={`${compPrefix}-label`}>
          {props.label}
        </label>
      )}
      {props.status && (
        <div id={statusId}>
          <DsStatusMessage {...props.status} />
        </div>
      )}
      <div className={`${compPrefix}-container ${props.disabled ? `${prefix}-disabled` : ''}`}>
        {props.prefix && (
          <div className={`${compPrefix}-prefix`} aria-hidden="true">
            {props.prefix}
          </div>
        )}
        <div className={inputContainerClassNames}>
          <input
            id={inputId}
            type={props.type || 'text'}
            value={props.value}
            onChange={(e) => { props.onChange(e.target.value); }}
            placeholder={props.placeholder}
            disabled={props.disabled}
            required={props.required}
            autoComplete={props.autoComplete}
            maxLength={props.maxLength}
            minLength={props.minLength}
            pattern={props.pattern}
            className={`${compPrefix}-input`}
            onFocus={() => { setIsActive(true); }}
            onBlur={() => { setIsActive(false); }}
            aria-label={props.ariaLabel}
            aria-labelledby={getAriaLabelledBy()}
            aria-describedby={getAriaDescribedBy()}
            aria-invalid={isInvalid ? 'true' : 'false'}
            aria-required={props.required ? 'true' : undefined}
          />
        </div>
        {props.clearable && props.value && !props.disabled && (
          <DsButton 
            id={clearButtonId}
            disabled={props.disabled} 
            onClick={clearValue} 
            actionType='neutral' 
            hierarchy='tertiary' 
            size='medium' 
            icon={<DsIconX12x12 />} 
            ariaLabel={`Clear ${props.label || 'input'}`}
            className={`${compPrefix}-clearable-icon-container`} 
          />
        )}
        {props.suffix && (
          <div className={`${compPrefix}-suffix`} aria-hidden="true">
            {props.suffix}
          </div>
        )}
      </div>
    </div >
  );
};

// Backward compatibility export
export const dsTextInput = DsTextInput;
export type dsTextInputProps = DsTextInputProps;

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

  ariaLabel?: string
  className?: string
}

export const DsTextInput = (props: DsTextInputProps) => {
  const [isActive, setIsActive] = React.useState(false);
  const inputId = React.useMemo(() => `${compPrefix}-input-${Math.random().toString(36).substring(7)}`, []);
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

  // Build aria-describedby list
  const getAriaDescribedBy = () => {
    const describedByIds = [];
    if (props.status) describedByIds.push(statusId);
    return describedByIds.length > 0 ? describedByIds.join(' ') : undefined;
  };

  return (
    <div className={`${compPrefix}-wrapper ${props.className || ''}`}>
      {props.label ? <label id={labelId} htmlFor={inputId} className={`${compPrefix}-label`}>{props.label}</label> : null}
      {props.status ? <div id={statusId}><DsStatusMessage {...props.status} /></div> : null}
      <div className={`${compPrefix}-container ${props.disabled ? `${prefix}-disabled` : ''}`}>
        {props.prefix ? <div className={`${compPrefix}-prefix`}>{props.prefix}</div> : null}
        <div className={inputContainerClassNames}>
          <input
            id={inputId}
            aria-labelledby={props.label ? labelId : undefined}
            aria-label={props.ariaLabel}
            aria-describedby={getAriaDescribedBy()}
            aria-invalid={props.status?.variant === 'danger' ? 'true' : undefined}
            type="text"
            value={props.value}
            onChange={(e) => { props.onChange(e.target.value); }}
            placeholder={props.placeholder}
            disabled={props.disabled}
            className={`${compPrefix}-input`}
            onFocus={() => { setIsActive(true); }}
            onBlur={() => { setIsActive(false); }}
            required={props.status?.variant === 'danger' ? true : undefined}
          />
        </div>
        {props.clearable ? (
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
        ) : null}
        {props.suffix ? <div className={`${compPrefix}-suffix`}>{props.suffix}</div> : null}
      </div>
    </div >
  );
};

// Backward compatibility export
export const dsTextInput = DsTextInput;
export type dsTextInputProps = DsTextInputProps;

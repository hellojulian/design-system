import React from 'react';
import { prefix } from '../prefix';
import { DsStatusMessage, type DsStatusMessageProps } from '../ds-status-message/ds-status-message';
import DsIconMinus12x12 from '../../icons/ds-icon-minus-12x12';
import DsIconPlus12x12 from '../../icons/ds-icon-plus-12x12';
import classnames from 'classnames';

const compPrefix = `${prefix}-stepper`;

export enum DsStepperDisabled {
  Minus = 'minus',
  Plus = 'plus',
  All = 'all',
};

export interface DsStepperProps {
  value: number
  onChange: (value: number) => void
  disabled?: DsStepperDisabled
  label?: string
  status?: DsStatusMessageProps
  min?: number
  max?: number
  step?: number

  className?: string
  ariaLabel?: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
}

export const DsStepper = (props: DsStepperProps) => {
  const inputId = React.useMemo(() => `${compPrefix}-input-${Math.random().toString(36).substring(7)}`, []);
  const labelId = React.useMemo(() => `${compPrefix}-label-${Math.random().toString(36).substring(7)}`, []);
  const statusId = React.useMemo(() => `${compPrefix}-status-${Math.random().toString(36).substring(7)}`, []);
  const minusButtonId = React.useMemo(() => `${compPrefix}-minus-${Math.random().toString(36).substring(7)}`, []);
  const plusButtonId = React.useMemo(() => `${compPrefix}-plus-${Math.random().toString(36).substring(7)}`, []);

  const step = props.step || 1;
  const min = props.min ?? -Infinity;
  const max = props.max ?? Infinity;

  const isIncDisabled = React.useMemo(() => {
    const disabledByProp = props.disabled && [DsStepperDisabled.All, DsStepperDisabled.Plus].includes(props.disabled);
    const disabledByMax = props.value >= max;
    return disabledByProp || disabledByMax;
  }, [props.disabled, props.value, max]);

  const isDecDisabled = React.useMemo(() => {
    const disabledByProp = props.disabled && [DsStepperDisabled.All, DsStepperDisabled.Minus].includes(props.disabled);
    const disabledByMin = props.value <= min;
    return disabledByProp || disabledByMin;
  }, [props.disabled, props.value, min]);

  const isAllDisabled = React.useMemo(() => {
    return props.disabled && [DsStepperDisabled.All].includes(props.disabled);
  }, [props.disabled]);

  const inc = React.useCallback(() => {
    if (isIncDisabled) return;
    const newValue = Math.min(props.value + step, max);
    props.onChange(newValue);
  }, [props.value, props.onChange, step, max, isIncDisabled]);

  const dec = React.useCallback(() => {
    if (isDecDisabled) return;
    const newValue = Math.max(props.value - step, min);
    props.onChange(newValue);
  }, [props.value, props.onChange, step, min, isDecDisabled]);

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      const clampedValue = Math.max(min, Math.min(max, newValue));
      props.onChange(clampedValue);
    }
  }, [props.onChange, min, max]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        inc();
        break;
      case 'ArrowDown':
        e.preventDefault();
        dec();
        break;
      case 'Home':
        e.preventDefault();
        if (min !== -Infinity) {
          props.onChange(min);
        }
        break;
      case 'End':
        e.preventDefault();
        if (max !== Infinity) {
          props.onChange(max);
        }
        break;
    }
  }, [inc, dec, min, max, props.onChange]);

  const classNames = classnames(
    `${compPrefix}-wrapper`,
    props.className
  );

  const minusButtonClassNames = classnames(
    `${compPrefix}-minus-container`,
    isDecDisabled ? `${prefix}-disabled` : `${prefix}-interactable`
  );

  const plusButtonClassNames = classnames(
    `${compPrefix}-plus-container`,
    isIncDisabled ? `${prefix}-disabled` : `${prefix}-interactable`
  );

  const valueContainerClassNames = classnames(
    `${compPrefix}-value-container`,
    isAllDisabled ? `${prefix}-disabled` : ''
  );

  const containerStyle = React.useMemo(() => {
    return { width: 102 + ((props.value.toString().length - 1) * 10) };
  }, [props.value]);

  // Determine ARIA labeling
  const getAriaLabelledBy = () => {
    if (props.ariaLabelledBy) return props.ariaLabelledBy;
    if (props.label) return labelId;
    return undefined;
  };

  const getAriaDescribedBy = () => {
    const parts = [];
    if (props.ariaDescribedBy) parts.push(props.ariaDescribedBy);
    if (props.status) parts.push(statusId);
    return parts.length > 0 ? parts.join(' ') : undefined;
  };

  return (
    <div className={classNames}>
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
      <div className={`${compPrefix}-container`} style={containerStyle} role="group" aria-labelledby={getAriaLabelledBy()}>
        <button 
          id={minusButtonId}
          onClick={dec} 
          className={minusButtonClassNames} 
          disabled={isDecDisabled}
          aria-label={`Decrease value by ${step}`}
          aria-controls={inputId}
          tabIndex={isDecDisabled ? -1 : 0}
        >
          <DsIconMinus12x12 aria-hidden="true" />
        </button>
        <div className={valueContainerClassNames}>
          <input 
            id={inputId}
            type="number"
            className={`${compPrefix}-input`}
            value={props.value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isAllDisabled}
            min={min !== -Infinity ? min : undefined}
            max={max !== Infinity ? max : undefined}
            step={step}
            role="spinbutton"
            aria-label={props.ariaLabel}
            aria-labelledby={getAriaLabelledBy()}
            aria-describedby={getAriaDescribedBy()}
            aria-valuenow={props.value}
            aria-valuemin={min !== -Infinity ? min : undefined}
            aria-valuemax={max !== Infinity ? max : undefined}
          />
        </div>
        <button 
          id={plusButtonId}
          onClick={inc} 
          className={plusButtonClassNames} 
          disabled={isIncDisabled}
          aria-label={`Increase value by ${step}`}
          aria-controls={inputId}
          tabIndex={isIncDisabled ? -1 : 0}
        >
          <DsIconPlus12x12 aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

// Backward compatibility exports
export const dsStepper = DsStepper;
export const dsStepperDisabled = DsStepperDisabled;
export type dsStepperProps = DsStepperProps;

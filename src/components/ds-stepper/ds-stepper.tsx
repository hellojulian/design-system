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

  className?: string
  ariaLabel?: string
}

export const DsStepper = (props: DsStepperProps) => {
  const inputId = React.useMemo(() => `${compPrefix}-input-${Math.random().toString(36).substring(7)}`, []);
  const labelId = React.useMemo(() => `${compPrefix}-label-${Math.random().toString(36).substring(7)}`, []);

  const isIncDisabled = React.useMemo(() => {
    return props.disabled && [DsStepperDisabled.All, DsStepperDisabled.Plus].includes(props.disabled);
  }, [props.disabled]);

  const isDecDisabled = React.useMemo(() => {
    return props.disabled && [DsStepperDisabled.All, DsStepperDisabled.Minus].includes(props.disabled);
  }, [props.disabled]);

  const isAllDisabled = React.useMemo(() => {
    return props.disabled && [DsStepperDisabled.All].includes(props.disabled);
  }, [props.disabled]);

  const inc = React.useCallback(() => {
    if (isIncDisabled) return;
    props.onChange(props.value + 1);
  }, [props.value, props.onChange, props.disabled]);

  const dec = React.useCallback(() => {
    if (isDecDisabled) return;
    props.onChange(props.value - 1);
  }, [props.value, props.onChange, props.disabled]);

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

  return (
    <div className={classNames}>
      {props.label && <label id={labelId} htmlFor={inputId} className={`${compPrefix}-label`}>{props.label}</label>}
      {props.status && <DsStatusMessage {...props.status} />}
      <div className={`${compPrefix}-container`} style={containerStyle}>
        <button onClick={dec} className={minusButtonClassNames} disabled={isDecDisabled}>
          <DsIconMinus12x12 />
        </button>
        <div className={valueContainerClassNames}>
          <input id={inputId} aria-labelledby={labelId} type="number" className={`${compPrefix}-input`} value={props.value} onChange={(e) => { props.onChange(Number(e.target.value)); }} disabled={isAllDisabled} />
        </div>
        <button onClick={inc} className={plusButtonClassNames} disabled={isIncDisabled}>
          <DsIconPlus12x12 />
        </button>
      </div>
    </div>
  );
};

// Backward compatibility exports
export const dsStepper = DsStepper;
export const dsStepperDisabled = DsStepperDisabled;
export type dsStepperProps = DsStepperProps;

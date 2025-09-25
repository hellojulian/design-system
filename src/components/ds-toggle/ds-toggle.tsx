import React, { useLayoutEffect, useRef, useState } from 'react';
import { prefix } from '../prefix';
import classnames from 'classnames';

const compPrefix = `${prefix}-toggle`;

export interface ToggleSegment {
  label: string
  value: string
  disabled?: boolean
  prefix?: JSX.Element
  suffix?: JSX.Element
}

export interface DsToggleProps {
  size?: 'large' | 'medium'
  options: ToggleSegment[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  legend?: string

  className?: string
  ariaLabel?: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
  id?: string
}

export const DsToggle = ({ size = 'medium', ...props }: DsToggleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [activeTabLeftLocation, setActiveTabLeftLocation] = useState(0);
  const [activeTabWidth, setactiveTabWidth] = useState(0);
  const groupId = props.id || React.useMemo(() => `${compPrefix}-${Math.random().toString(36).substring(7)}`, []);
  const legendId = React.useMemo(() => `${compPrefix}-legend-${Math.random().toString(36).substring(7)}`, []);

  useLayoutEffect(() => {
    if (ref.current) {
      setactiveTabWidth(ref.current.offsetWidth);
      setActiveTabLeftLocation(ref.current.offsetLeft);
    }
  }, [props.value, size]);

  // Handle keyboard navigation for radio group
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    const enabledOptions = props.options.filter(option => !option.disabled && !props.disabled);
    const currentIndex = enabledOptions.findIndex(option => option.value === props.value);
    
    let nextIndex = currentIndex;
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (currentIndex + 1) % enabledOptions.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = currentIndex === 0 ? enabledOptions.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = enabledOptions.length - 1;
        break;
      default:
        return;
    }
    
    if (nextIndex !== currentIndex && enabledOptions[nextIndex]) {
      props.onChange(enabledOptions[nextIndex].value);
    }
  }, [props.options, props.value, props.onChange, props.disabled]);

  const classNames = classnames(
    compPrefix,
    `${compPrefix}-size-${size}`,
    props.disabled ? `${prefix}-disabled` : '',
    props.className
  );

  // Determine ARIA attributes
  const getFieldsetProps = () => {
    const baseProps = {
      id: groupId,
      className: classNames,
      onKeyDown: handleKeyDown
    };

    // If we have a legend, use aria-labelledby, otherwise use aria-label
    if (props.legend) {
      return {
        ...baseProps,
        'aria-labelledby': props.ariaLabelledBy || legendId,
        'aria-describedby': props.ariaDescribedBy
      };
    } else {
      return {
        ...baseProps,
        'aria-label': props.ariaLabel || 'Toggle options',
        'aria-labelledby': props.ariaLabelledBy,
        'aria-describedby': props.ariaDescribedBy
      };
    }
  };

  return (
    <fieldset {...getFieldsetProps()}>
      {props.legend && (
        <legend id={legendId} className={`${compPrefix}-legend`}>
          {props.legend}
        </legend>
      )}
      <div className={`${compPrefix}-active-bg`} style={{ width: `${activeTabWidth}px`, left: `${activeTabLeftLocation}px` }} />
      {props.options.map((option, index) => {
        const onChange = () => {
          if (props.disabled || option.disabled) return;
          props.onChange(option.value);
        };
        
        const checked = option.value === props.value;
        const isDisabled = props.disabled || option.disabled;
        const optionId = `${groupId}-option-${index}`;

        return (
          <div ref={checked ? ref : null} key={option.value} className={`${compPrefix}-option-wrapper ${isDisabled ? `${prefix}-disabled` : ''}`}>
            <input
              id={optionId}
              className={`${compPrefix}-input`}
              type="radio"
              name={groupId}
              value={option.value}
              checked={checked}
              disabled={isDisabled}
              onChange={onChange}
              aria-describedby={props.ariaDescribedBy}
            />
            <label 
              htmlFor={optionId} 
              className={`${compPrefix}-option ${checked ? 'checked' : ''} ${!isDisabled ? `${prefix}-interactable` : ''}`}
            >
              {option.prefix && (
                <span className={`${compPrefix}-prefix`} aria-hidden="true">
                  {option.prefix}
                </span>
              )}
              <span className={`${compPrefix}-label`}>{option.label}</span>
              {option.suffix && (
                <span className={`${compPrefix}-suffix`} aria-hidden="true">
                  {option.suffix}
                </span>
              )}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
};

// Backward compatibility export
export const dsToggle = DsToggle;
export type dsToggleProps = DsToggleProps;

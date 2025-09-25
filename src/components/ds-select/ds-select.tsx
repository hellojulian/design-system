import React from 'react';
import { prefix } from '../prefix';
import DsIconChevronDown12X12 from '../../icons/ds-icon-chevron-down-12x12';
import DsIconX12x12 from '../../icons/ds-icon-x-12x12';
import { DsPopover } from '../ds-popover/ds-popover';
import { DsCheckbox } from '../ds-checkbox/ds-checkbox';
import classnames from 'classnames';
import { DsStatusMessage, DsStatusMessageProps } from '../ds-status-message/ds-status-message';

const compPrefix = `${prefix}-select`;

export interface Option {
  label: string
  value: string
  prefix?: JSX.Element
  suffix?: JSX.Element
}

export interface OptionGroup {
  label: string
  options: Option[]
}

export interface DsNativeSelectProps {
  type: 'native'
  value?: string
  options: (Option | OptionGroup)[]
  onChange: (value: string) => void
  disabled?: boolean
  label?: string
  statusMsg?: DsStatusMessageProps

  ariaLabel?: string
  className?: string
}

export interface DsSingleSelectProps {
  type: 'single-value'
  value?: string
  options: (Option | OptionGroup)[]
  onChange: (value?: string) => void
  disabled?: boolean
  label?: string
  statusMsg?: DsStatusMessageProps
  placeholder?: string
  clearable?: boolean

  ariaLabel?: string
  className?: string
}

export interface DsMultiSelectProps {
  type: 'multi-value'
  value: string[]
  options: (Option | OptionGroup)[]
  onChange: (value: string[]) => void
  disabled?: boolean
  label?: string
  statusMsg?: DsStatusMessageProps
  placeholder?: string
  fixedHeight?: boolean

  ariaLabel?: string
  className?: string
}

const isOptionGroup = (option: Option | OptionGroup): option is OptionGroup => {
  return (option as OptionGroup).options !== undefined;
};

const DsNativeSelect = (props: DsNativeSelectProps) => {
  const selectId = React.useMemo(() => `${compPrefix}-${Math.random().toString(36).substring(7)}`, []);
  const labelId = React.useMemo(() => `${compPrefix}-label-${Math.random().toString(36).substring(7)}`, []);
  const statusId = React.useMemo(() => `${compPrefix}-status-${Math.random().toString(36).substring(7)}`, []);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.value);
  };

  const renderOptions = (options: (Option | OptionGroup)[]) => {
    return options.map((option, index) => {
      if (isOptionGroup(option)) {
        return (
          <optgroup key={index} label={option.label}>
            {renderOptions(option.options)}
          </optgroup>
        );
      }
      return (
        <option key={index} value={option.value}>{option.label}</option>
      );
    });
  }

  const classNames = classnames(
    compPrefix,
    props.className,
  );

  const containerClassNames = classnames(
    `${compPrefix}-container`,
    props.disabled ? `${prefix}-disabled` : `${prefix}-interactable`,
  );

  return (
    <div className={classNames}>
      {props.label && <label className={`${compPrefix}-label`}>{props.label}</label>}
      {props.statusMsg && <DsStatusMessage {...props.statusMsg} />}
      <div className={containerClassNames}>
        <select className={`${compPrefix}-native-element`} disabled={props.disabled} value={props.value} onChange={onChange}>
          {renderOptions(props.options)}
        </select>
        <div className={`${compPrefix}-chevron-container`}>
          <DsIconChevronDown12X12 />
        </div>
      </div>
    </div>
  );
};

const DsCustomSelect = (props: DsSingleSelectProps) => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const renderOptions = (options: (Option | OptionGroup)[]) => {
    return options.map((option, index) => {
      if (isOptionGroup(option)) {
        return (
          <optgroup key={index} label={option.label}>
            {renderOptions(option.options)}
          </optgroup>
        );
      }
      return (
        <option key={index} value={option.value}>{option.label}</option>
      );
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLSelectElement | HTMLDivElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      setMenuOpen(state => !state);
    }
  };

  const onKeyDownClear = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      setMenuOpen(false);
      props.onChange(undefined);
    }
  };

  const onClear = (e?: React.MouseEvent<HTMLDivElement>) => {
    e?.stopPropagation();
    if (!props.disabled) {
      props.onChange(undefined);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    if (!props.disabled) {
      setMenuOpen(state => !state);
    }
  };

  const selectWrapperClassNames = classnames(
    `${compPrefix}-wrapper`,
    props.disabled ? `${prefix}-disabled` : `${prefix}-interactable`
  );

  const containerClassNames = classnames(
    `${compPrefix}-container`,
    {
      [`${prefix}-disabled`]: props.disabled
    }
  );

  const onMouseDownSelect = (e: React.MouseEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setMenuOpen(true);
  };

  const renderMenuOption = (option: Option, index: number) => {
    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        e.preventDefault();
        props.onChange(option.value);
        setMenuOpen(false);
      }
    };

    return (
      <div tabIndex={0} onKeyDown={onKeyDown} key={index} className={`${compPrefix}-menu-option ${prefix}-interactable ${props.value?.includes(option.value) ? `${prefix}-disabled` : ''}`} onClick={() => { props.onChange(option.value); setMenuOpen(false); }}>
        {option.prefix}
        <div className={`${compPrefix}-menu-option-label`}>{option.label}</div>
        {option.suffix}
      </div>
    );
  };

  const menuContent = React.useMemo(() => {
    return (
      <div className={`${compPrefix}-menu`} style={{ width: `${ref.current?.offsetWidth}px` }}>
        {props.options.map((option, index) => {
          if (isOptionGroup(option)) {
            return (
              <div key={index} className={`${compPrefix}-menu-group`}>
                <div className={`${compPrefix}-menu-group-label`}>{option.label}</div>
                {option.options.map(renderMenuOption)}
              </div>
            );
          }
          return renderMenuOption(option, index);
        }
        )}
      </div>
    );
  }, [props.options, props.value, props.disabled, ref.current?.offsetWidth]);

  const customChevronContainerClassNames = classnames(
    `${compPrefix}-custom-chevron-container`,
    props.disabled ? `${prefix}-disabled` : `${prefix}-interactable`,
  );

  const clearContainerClassNames = classnames(
    `${compPrefix}-clear-container`,
    props.disabled ? `${prefix}-disabled` : `${prefix}-interactable`,
  );

  return (
    <div ref={ref} className={compPrefix}>
      {props.label && <label className={`${compPrefix}-label`}>{props.label}</label>}
      {props.statusMsg && <DsStatusMessage {...props.statusMsg} />}
      <DsPopover onClickOutside={closeMenu} placement={'bottom'} isOpen={isMenuOpen} body={menuContent}>
        <div className={containerClassNames}>
          <div style={{ width: '100%', display: 'flex' }}>
            <div className={selectWrapperClassNames}>
              {!props.value && <span className={`${compPrefix}-placeholder`}>{props.placeholder}</span>}
              <select disabled={props.disabled} onMouseDown={onMouseDownSelect} onKeyDown={onKeyDown} value={props.value} className={`${compPrefix}-native-element ${!props.value ? `${compPrefix}-native-element-no-value` : ''}`}>
                {renderOptions(props.options)}
              </select>
            </div>
            {props.clearable && props.value && (
              <div onKeyDown={onKeyDownClear} tabIndex={props.disabled ? undefined : 0} className={clearContainerClassNames} onClick={onClear}>
                <DsIconX12x12 />
              </div>
            )}
          </div>
          <div onClick={toggleMenu} onKeyDown={onKeyDown} tabIndex={props.disabled ? undefined : 0} className={customChevronContainerClassNames}>
            <DsIconChevronDown12X12 />
          </div>
        </div>
      </DsPopover>
    </div >
  );
};

const DsCustomMultiSelect = (props: DsMultiSelectProps) => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const renderOptions = (options: (Option | OptionGroup)[]) => {
    return options.map((option, index) => {
      if (isOptionGroup(option)) {
        return (
          <optgroup key={index} label={option.label}>
            {renderOptions(option.options)}
          </optgroup>
        );
      }
      return (
        <option key={index} value={option.value}>{option.label}</option>
      );
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLSelectElement | HTMLDivElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      setMenuOpen(state => !state);
    }
  };

  const onKeyDownClear = (value: string) => (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' && !props.disabled) {
      e.preventDefault();
      if (props.value.includes(value)) {
        props.onChange(props.value.filter(v => v !== value));
      }
    }
  };

  const onClear = (value: string) => (e?: React.MouseEvent<HTMLDivElement>) => {
    e?.stopPropagation();
    if (props.value.includes(value) && !props.disabled) {
      props.onChange(props.value.filter(v => v !== value));
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    if (!props.disabled) {
      setMenuOpen(state => !state);
    }
  }

  const selectWrapperClassNames = classnames(
    `${compPrefix}-wrapper`
  );

  const containerClassNames = classnames(
    `${compPrefix}-container`,
    {
      [`${prefix}-disabled`]: props.disabled
    }
  );

  const renderMenuOption = (option: Option, index: number) => {
    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        onClick(e);
      }
    };

    const onClick = (e?: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
      e?.preventDefault();
      if (props.value.includes(option.value)) {
        props.onChange(props.value.filter(v => v !== option.value));
      } else {
        props.onChange([...props.value, option.value]);
      }
    };

    return (
      <div onKeyDown={onKeyDown} key={index} className={`${compPrefix}-menu-option ${prefix}-interactable`} onClick={onClick}>
        <DsCheckbox onToggle={() => onClick()} checked={props.value.includes(option.value)} checkLabel={option.label} />
        {option.suffix}
      </div>
    );
  };

  const menuContent = React.useMemo(() => {
    return (
      <div className={`${compPrefix}-menu`} style={{ width: `${ref.current?.offsetWidth}px` }} >
        {props.options.map((option, index) => {
          if (isOptionGroup(option)) {
            return (
              <div key={index} className={`${compPrefix}-menu-group`}>
                <div className={`${compPrefix}-menu-group-label`}>{option.label}</div>
                {option.options.map(renderMenuOption)}
              </div>
            );
          }
          return renderMenuOption(option, index);
        }
        )}
      </div>
    );
  }, [props.options, props.value, props.disabled, ref.current?.offsetWidth]);

  const values = React.useMemo(() => {
    const valueClassNames = classnames(
      `${compPrefix}-value`,
      props.disabled ? `${prefix}-disabled` : ''
    );

    const clearValueContainerClassNames = classnames(
      `${compPrefix}-clear-value-container`,
      props.disabled ? `${prefix}-disabled` : `${prefix}-interactable`
    );

    return (
      <>
        {props.value.map((value, index) => {
          const allOptions = props.options.map(option => isOptionGroup(option) ? option.options : option).flat();
          const option = allOptions.find(option => option.value === value);
          if (option) {
            return (
              <div key={index} className={valueClassNames} onClick={toggleMenu}>
                <div className={`${compPrefix}-value-prefix-wrapper ${prefix}-interactable`}>
                  {option.prefix}
                  <div className={`${compPrefix}-value-label`}>{option.label}</div>
                </div>
                <div onKeyDown={onKeyDownClear(option.value)} tabIndex={props.disabled ? undefined : 0} className={clearValueContainerClassNames} onClick={onClear(option.value)}>
                  <DsIconX12x12 />
                </div>
              </div>
            );
          }
        })}
      </>
    );
  }, [props.value, props.options, props.disabled]);

  const chevronContainerClassNames = classnames(
    `${compPrefix}-custom-chevron-container`,
    props.disabled ? `${prefix}-disabled` : `${prefix}-interactable`,
  );

  const multiSelectClassNames = classnames(
    compPrefix,
    `${compPrefix}-multi`,
    {
      [`${compPrefix}-fixed-height`]: props.fixedHeight,
      [`${compPrefix}-with-value`]: props.value.length > 1,
    }
  );

  return (
    <div ref={ref} className={multiSelectClassNames}>
      {props.label && <label className={`${compPrefix}-label`}>{props.label}</label>}
      {props.statusMsg && <DsStatusMessage {...props.statusMsg} />}
      <DsPopover onClickOutside={closeMenu} placement={'bottom'} isOpen={isMenuOpen} body={menuContent}>
        <div className={containerClassNames}>
          <div className={`${selectWrapperClassNames} ${props.value.length <= 1 ? `${prefix}-interactable` : ''}`} onClick={() => !props.value.length && toggleMenu()}>
            {props.value.length < 2 ? <div onClick={() => toggleMenu()} className={`${compPrefix}-placeholder`}>{props.placeholder}</div> : null}
            {values}
          </div>
          <div onClick={toggleMenu} onKeyDown={onKeyDown} tabIndex={props.disabled ? undefined : 0} className={chevronContainerClassNames}>
            <DsIconChevronDown12X12 />
          </div>
        </div>
      </DsPopover>
    </div >
  );
};

export const DsSelect = ({
  ...props
}: DsNativeSelectProps | DsSingleSelectProps | DsMultiSelectProps) => {
  if (props.type === 'native') {
    return <DsNativeSelect {...props} />;
  }
  if (props.type === 'multi-value') {
    return <DsCustomMultiSelect {...props} />;
  }
  return <DsCustomSelect {...props} />;
};

DsCustomMultiSelect.defaultProps = {
  fixedHeight: true,
};
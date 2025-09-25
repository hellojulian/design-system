import React from 'react';
import { prefix } from '../prefix';
import classNames from 'classnames';

const compPrefix = `${prefix}-option-group`;

export interface Option {
  label: string
  value: string
  prefix?: JSX.Element
  suffix?: JSX.Element
  disabled?: boolean
  selected?: boolean
  description?: string
}

export interface OptionGroup {
  label: string
  options: Option[]
}

export interface DsOptionGroupProps {
  options: Array<Option | OptionGroup>
  className?: string
  onSelect?: (value: string) => void
  ariaLabel?: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
  role?: 'listbox' | 'menu' | 'list'
  multiselect?: boolean
  selectedValues?: string[]
  id?: string
}

const isOptionGroup = (option: Option | OptionGroup): option is OptionGroup => {
  return (option as OptionGroup).options !== undefined;
};

export const DsOptionGroup = ({
  options,
  className,
  onSelect,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  role = 'list',
  multiselect = false,
  selectedValues = [],
  id,
  ...restProps
}: DsOptionGroupProps) => {
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
  const optionRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const componentId = id || `option-group-${React.useId()}`;
  const classnames = classNames(compPrefix, className);
  
  // Get all selectable options (flatten groups)
  const flatOptions = React.useMemo(() => {
    const flat: Option[] = [];
    options.forEach(item => {
      if (isOptionGroup(item)) {
        flat.push(...item.options);
      } else {
        flat.push(item);
      }
    });
    return flat;
  }, [options]);

  // Find next/previous non-disabled option
  const findNextEnabledIndex = (currentIndex: number, direction: 'next' | 'prev') => {
    const increment = direction === 'next' ? 1 : -1;
    let index = currentIndex + increment;
    
    while (index >= 0 && index < flatOptions.length) {
      if (!flatOptions[index].disabled) {
        return index;
      }
      index += increment;
    }
    
    return currentIndex; // Stay at current if no enabled option found
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, optionIndex: number) => {
    const option = flatOptions[optionIndex];
    
    // Don't handle keys for disabled options
    if (option.disabled) {
      return;
    }

    switch (e.key) {
      case ' ':
      case 'Enter':
        e.preventDefault();
        onSelect?.(option.value);
        break;
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = findNextEnabledIndex(optionIndex, 'next');
        if (nextIndex !== optionIndex) {
          setFocusedIndex(nextIndex);
          optionRefs.current[nextIndex]?.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = findNextEnabledIndex(optionIndex, 'prev');
        if (prevIndex !== optionIndex) {
          setFocusedIndex(prevIndex);
          optionRefs.current[prevIndex]?.focus();
        }
        break;
      case 'Home':
        e.preventDefault();
        const firstEnabledIndex = findNextEnabledIndex(-1, 'next');
        setFocusedIndex(firstEnabledIndex);
        optionRefs.current[firstEnabledIndex]?.focus();
        break;
      case 'End':
        e.preventDefault();
        const lastEnabledIndex = findNextEnabledIndex(flatOptions.length, 'prev');
        setFocusedIndex(lastEnabledIndex);
        optionRefs.current[lastEnabledIndex]?.focus();
        break;
      case 'Escape':
        e.preventDefault();
        // Allow parent components to handle escape (e.g., close dropdown)
        e.currentTarget.blur();
        break;
    }
  };

  const renderMenuOption = (option: Option, index: number, globalIndex: number) => {
    const isListItem = role === 'list';
    const isMenuItem = role === 'menu';
    const isOption = role === 'listbox';
    const isSelected = option.selected || selectedValues.includes(option.value);
    const isDisabled = option.disabled;
    const optionId = `${componentId}-option-${globalIndex}`;
    const descriptionId = option.description ? `${optionId}-description` : undefined;
    
    // Find first non-disabled option for initial focus
    const firstEnabledIndex = flatOptions.findIndex(opt => !opt.disabled);
    const shouldReceiveInitialFocus = globalIndex === firstEnabledIndex;

    const handleClick = () => {
      if (!isDisabled) {
        onSelect?.(option.value);
      }
    };

    return (
      <div 
        ref={el => optionRefs.current[globalIndex] = el}
        id={optionId}
        tabIndex={shouldReceiveInitialFocus ? 0 : -1}
        onKeyDown={(e) => handleKeyDown(e, globalIndex)}
        key={`${option.value}-${index}`} 
        className={classNames(
          `${compPrefix}-menu-option`,
          !isDisabled && `${prefix}-interactable`,
          isSelected && `${compPrefix}-menu-option-selected`,
          isDisabled && `${compPrefix}-menu-option-disabled`
        )}
        onClick={handleClick}
        role={isListItem ? 'listitem' : isMenuItem ? 'menuitem' : isOption ? 'option' : undefined}
        aria-selected={isOption || isMenuItem ? isSelected : undefined}
        aria-disabled={isDisabled}
        aria-describedby={descriptionId}
      >
        {option.prefix && (
          <div className={`${compPrefix}-menu-option-prefix`} aria-hidden="true">
            {option.prefix}
          </div>
        )}
        <div className={`${compPrefix}-menu-option-content`}>
          <div className={`${compPrefix}-menu-option-label`}>{option.label}</div>
          {option.description && (
            <div id={descriptionId} className={`${compPrefix}-menu-option-description`}>
              {option.description}
            </div>
          )}
        </div>
        {option.suffix && (
          <div className={`${compPrefix}-menu-option-suffix`} aria-hidden="true">
            {option.suffix}
          </div>
        )}
        {isSelected && multiselect && (
          <div className={`${compPrefix}-menu-option-checkmark`} aria-hidden="true">
            ✓
          </div>
        )}
      </div>
    );
  };

  const renderOptions = (options: Array<Option | OptionGroup>) => {
    let globalIndex = 0;
    
    return options.map((option, index) => {
      if (isOptionGroup(option)) {
        const groupStartIndex = globalIndex;
        const groupItems = option.options.map((groupOption, groupOptionIndex) => {
          const currentGlobalIndex = globalIndex++;
          return renderMenuOption(groupOption, groupOptionIndex, currentGlobalIndex);
        });
        
        const groupId = `${componentId}-group-${index}`;
        const groupLabelId = `${groupId}-label`;
        
        return (
          <div key={index} className={`${compPrefix}-menu-group`} role="group" aria-labelledby={groupLabelId}>
            <div id={groupLabelId} className={`${compPrefix}-menu-group-label`} role="presentation">
              {option.label}
            </div>
            {groupItems}
          </div>
        );
      }
      const currentGlobalIndex = globalIndex++;
      return renderMenuOption(option, index, currentGlobalIndex);
    });
  };

  // Enhanced ARIA attributes based on role
  const getAriaAttributes = () => {
    const base = {
      id: componentId,
      className: classnames,
      role: role,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...restProps
    };

    if (role === 'listbox') {
      return {
        ...base,
        'aria-multiselectable': multiselect,
        'aria-orientation': 'vertical'
      };
    }

    if (role === 'menu') {
      return {
        ...base,
        'aria-orientation': 'vertical'
      };
    }

    return base;
  };

  return (
    <div {...getAriaAttributes()}>
      {renderOptions(options)}
    </div>
  );
};

// Backward compatibility export
export const dsOptionGroup = DsOptionGroup;
export type dsOptionGroupProps = DsOptionGroupProps;

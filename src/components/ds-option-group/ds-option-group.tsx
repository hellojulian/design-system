import React from 'react';
import { prefix } from '../prefix';
import classNames from 'classnames';

const compPrefix = `${prefix}-option-group`;

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

export interface DsOptionGroupProps {
  options: Array<Option | OptionGroup>
  className?: string
  onSelect?: (value: string) => void
  ariaLabel?: string
  role?: 'listbox' | 'menu' | 'list'
}

const isOptionGroup = (option: Option | OptionGroup): option is OptionGroup => {
  return (option as OptionGroup).options !== undefined;
};

export const DsOptionGroup = ({
  options,
  className,
  onSelect,
  ariaLabel,
  role = 'list'
}: DsOptionGroupProps) => {
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
  const optionRefs = React.useRef<(HTMLDivElement | null)[]>([]);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, optionIndex: number) => {
    switch (e.key) {
      case ' ':
      case 'Enter':
        e.preventDefault();
        onSelect?.(flatOptions[optionIndex].value);
        break;
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = Math.min(optionIndex + 1, flatOptions.length - 1);
        setFocusedIndex(nextIndex);
        optionRefs.current[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = Math.max(optionIndex - 1, 0);
        setFocusedIndex(prevIndex);
        optionRefs.current[prevIndex]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        optionRefs.current[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        const lastIndex = flatOptions.length - 1;
        setFocusedIndex(lastIndex);
        optionRefs.current[lastIndex]?.focus();
        break;
    }
  };

  const renderMenuOption = (option: Option, index: number, globalIndex: number) => {
    const isListItem = role === 'list';
    const isMenuItem = role === 'menu';
    const isOption = role === 'listbox';

    return (
      <div 
        ref={el => optionRefs.current[globalIndex] = el}
        tabIndex={globalIndex === 0 ? 0 : -1}
        onKeyDown={(e) => handleKeyDown(e, globalIndex)}
        key={`${option.value}-${index}`} 
        className={`${compPrefix}-menu-option ${prefix}-interactable`} 
        onClick={() => { onSelect?.(option.value); }}
        role={isListItem ? 'listitem' : isMenuItem ? 'menuitem' : isOption ? 'option' : undefined}
        aria-selected={isOption ? undefined : undefined} // Could be enhanced with selection state
      >
        {option.prefix}
        <div className={`${compPrefix}-menu-option-label`}>{option.label}</div>
        {option.suffix}
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
        
        return (
          <div key={index} className={`${compPrefix}-menu-group`} role="group" aria-labelledby={`group-label-${index}`}>
            <div id={`group-label-${index}`} className={`${compPrefix}-menu-group-label`}>{option.label}</div>
            {groupItems}
          </div>
        );
      }
      const currentGlobalIndex = globalIndex++;
      return renderMenuOption(option, index, currentGlobalIndex);
    });
  };

  return (
    <div 
      className={classnames}
      role={role}
      aria-label={ariaLabel}
    >
      {renderOptions(options)}
    </div>
  );
};

// Backward compatibility export
export const dsOptionGroup = DsOptionGroup;
export type dsOptionGroupProps = DsOptionGroupProps;

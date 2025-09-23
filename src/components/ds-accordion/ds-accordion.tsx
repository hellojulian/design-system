import React, { useState, useRef, useEffect } from 'react';
import { prefix } from '../prefix';
import classnames from 'classnames';
import DsIconChevronDown12X12 from '../../icons/ds-icon-chevron-down-12x12';
import './ds-accordion.css';

const compPrefix = `${prefix}-accordion`;

export interface DsAccordionProps {
  title?: string;
  body?: string;
  disabled?: boolean;
  defaultOpen?: boolean;
  label?: string;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
  ariaLabel?: string;
}

export const DsAccordion = ({ 
  title = "Title",
  body = "This is an example of a paragraph inside an Accordion. Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.",
  disabled = false,
  defaultOpen = false,
  label,
  onToggle,
  className = "",
  ariaLabel
}: DsAccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState<number | undefined>(defaultOpen && !disabled ? undefined : 0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(isOpen && !disabled ? scrollHeight : 0);
    }
  }, [isOpen, disabled, body]);

  const handleToggle = () => {
    if (disabled) return;
    
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  const classNames = classnames(
    compPrefix,
    className
  );

  const containerClassNames = classnames(
    `${compPrefix}-container`,
    {
      [`${prefix}-disabled`]: disabled,
      [`${compPrefix}-container-open`]: isOpen && !disabled
    }
  );

  const headerClassNames = classnames(
    `${compPrefix}-header`,
    { [`${prefix}-disabled`]: disabled }
  );

  const chevronClassNames = classnames(
    `${compPrefix}-chevron`,
    {
      [`${compPrefix}-chevron-open`]: isOpen && !disabled,
      [`${prefix}-disabled`]: disabled
    }
  );

  return (
    <div className={classNames}>
      {label && <label className={`${compPrefix}-label`}>{label}</label>}
      
      <div className={containerClassNames}>
        <button 
          className={headerClassNames}
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-disabled={disabled}
          aria-label={ariaLabel || `${disabled ? "Option" : title} accordion`}
          disabled={disabled}
          type="button"
        >
          <div className={`${compPrefix}-title`}>
            {disabled ? "Option" : title}
          </div>
          <div className={chevronClassNames}>
            <DsIconChevronDown12X12 />
          </div>
        </button>

        <div 
          className={`${compPrefix}-content`}
          style={{ height: height }}
        >
          <div ref={contentRef} className={`${compPrefix}-content-inner`}>
            {body}
          </div>
        </div>
      </div>
    </div>
  );
};

// Default export for the original component structure  
export default DsAccordion;

// Backward compatibility
export const dsAccordion = DsAccordion;
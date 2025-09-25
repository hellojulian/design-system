import React from 'react';
import { prefix } from '../prefix';
import DsIconCheck8X8 from '../../icons/ds-icon-check-8x8';
import DsIconX8x8 from '../../icons/ds-icon-x-8x8';
import classnames from 'classnames';

const compPrefix = `${prefix}-status-message`;

export interface DsStatusMessageProps {
  type: 'invalid' | 'attention' | 'success'
  message: string

  ariaLabel?: string
  ariaLive?: 'polite' | 'assertive' | 'off'
  className?: string
  id?: string
}

export const DsStatusMessage = ({
  type,
  message,
  ariaLabel,
  ariaLive,
  className,
  id,
  ...restProps
}: DsStatusMessageProps & React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const messageId = id || React.useMemo(() => `${compPrefix}-${Math.random().toString(36).substring(7)}`, []);
  const classNames = classnames(compPrefix, `${compPrefix}-${type}`, className);
  
  // Determine appropriate ARIA attributes based on message type
  const getAriaAttributes = () => {
    const baseAttributes = {
      id: messageId,
      'aria-live': ariaLive || (type === 'invalid' ? 'assertive' : 'polite'),
      'aria-atomic': 'true' as const
    };

    // Use role="alert" for critical messages, role="status" for informational
    if (type === 'invalid') {
      return {
        ...baseAttributes,
        role: 'alert' as const
      };
    } else {
      return {
        ...baseAttributes,
        role: 'status' as const
      };
    }
  };

  // Get accessible text for each message type
  const getTypeText = (type: string) => {
    switch (type) {
      case 'success':
        return 'Success';
      case 'attention':
        return 'Warning';
      case 'invalid':
        return 'Error';
      default:
        return '';
    }
  };

  const attentionTriangle = (
    <svg 
      width="16" 
      height="14" 
      viewBox="0 0 16 14" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M9.32071 1.39811C8.75435 0.346311 7.24565 0.346308 6.67929 1.39811L1.35351 11.2888C0.815401 12.2882 1.5392 13.5 2.67422 13.5H13.3258C14.4608 13.5 15.1846 12.2882 14.6465 11.2889L9.32071 1.39811Z" fill="var(--ds-color-status-attention-subtle)" stroke="var(--ds-color-status-attention)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V8C7 8.55228 7.44771 9 8 9C8.55228 9 9 8.55229 9 8L9 5ZM8 12C8.55228 12 9 11.5523 9 11C9 10.4477 8.55228 10 8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12Z" fill="var(--ds-color-status-attention)"/>
    </svg>
  );

  const renderIcon = (type: string) => {
    switch (type) {
      case 'success':
        return (
          <div className={`${compPrefix}-icon-wrapper-success`} aria-hidden="true">
            <DsIconCheck8X8/>
          </div>
        );
      case 'attention':
        return attentionTriangle;
      case 'invalid':
        return (
          <div className={`${compPrefix}-icon-wrapper-invalid`} aria-hidden="true">
            <DsIconX8x8/>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      {...restProps} 
      {...getAriaAttributes()}
      aria-label={ariaLabel}
      className={classNames}
    >
      {renderIcon(type)}
      <span className={`${compPrefix}-content`}>
        <span className="sr-only">{getTypeText(type)}: </span>
        {message}
      </span>
    </div>
  );
};

// Backward compatibility export
export const dsStatusMessage = DsStatusMessage;
export type dsStatusMessageProps = DsStatusMessageProps;

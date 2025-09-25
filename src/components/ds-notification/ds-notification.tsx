import React from 'react';
import { prefix } from '../prefix';
import { AlertTriangle, AlertCircle, Info, X, CircleCheck } from 'lucide-react';
import { DsButton, type dsButtonProps } from '../ds-button/ds-button';
import classnames from 'classnames';

const compPrefix = `${prefix}-notification`;

export interface DsNotificationProps {
  title: string
  type?: 'neutral' | 'attention' | 'informative' | 'dangerous' | 'success'
  description?: string
  action?: Omit<DsButtonProps, 'actionType'>
  icon?: JSX.Element
  dismissible?: boolean
  onDismiss?: () => void
  autoClose?: boolean
  autoCloseDelay?: number
  live?: 'polite' | 'assertive'
  id?: string

  className?: string
  ariaLabel?: string
  ariaDescribedBy?: string
}

const renderNotificationIcon = (type: DsNotificationProps['type']) => {
  const iconProps = { size: 24, 'aria-hidden': 'true' };
  switch (type) {
    case 'attention':
      return <AlertTriangle {...iconProps} />;
    case 'dangerous':
      return <AlertCircle {...iconProps} />;
    case 'informative':
      return <Info {...iconProps} />;
    case 'success':
      return <CircleCheck {...iconProps} />;
    case 'neutral':
    default:
      return <AlertCircle {...iconProps} />;
  }
};

const getAriaRole = (type: DsNotificationProps['type']) => {
  switch (type) {
    case 'dangerous':
    case 'attention':
      return 'alert';
    case 'success':
    case 'informative':
    case 'neutral':
    default:
      return 'status';
  }
};

const getAriaLive = (type: DsNotificationProps['type'], live?: 'polite' | 'assertive') => {
  if (live) return live;
  switch (type) {
    case 'dangerous':
      return 'assertive';
    case 'attention':
    case 'success':
    case 'informative':
    case 'neutral':
    default:
      return 'polite';
  }
};

const getActionType = (type: DsNotificationProps['type']) => {
  switch (type) {
    case 'attention':
    case 'neutral':
    case 'informative':
      return 'neutral';
    case 'dangerous':
      return 'destructive';
    case 'success':
      return 'success';
  }
};

export const DsNotification = ({ 
  type = 'neutral', 
  live,
  autoClose = false,
  autoCloseDelay = 5000,
  dismissible = false,
  ...props 
}: DsNotificationProps) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const notificationId = props.id || `notification-${React.useId()}`;
  const titleId = `${notificationId}-title`;
  const descriptionId = `${notificationId}-description`;
  
  // Auto-close functionality
  React.useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        props.onDismiss?.();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, isVisible, props]);

  const handleDismiss = () => {
    setIsVisible(false);
    props.onDismiss?.();
  };

  const classNames = classnames(
    compPrefix,
    `${compPrefix}-type-${type}`,
    { [`${compPrefix}-hidden`]: !isVisible },
    props.className
  );

  const ariaDescribedBy = props.ariaDescribedBy || (props.description ? descriptionId : undefined);
  const role = getAriaRole(type);
  const ariaLive = getAriaLive(type, live);

  if (!isVisible) return null;

  return (
    <div 
      id={notificationId}
      className={classNames} 
      role={role}
      aria-live={ariaLive}
      aria-atomic="true"
      aria-label={props.ariaLabel}
      aria-labelledby={!props.ariaLabel ? titleId : undefined}
      aria-describedby={ariaDescribedBy}
    >
      <div className={`${compPrefix}-container`}>
        <div className={`${compPrefix}-icon`} aria-hidden="true">
          {props.icon || renderNotificationIcon(type)}
        </div>
        <div className={`${compPrefix}-text-container`}>
          <div id={titleId} className={`${compPrefix}-title`} role="heading" aria-level="3">
            {props.title}
          </div>
          {props.description && (
            <div id={descriptionId} className={`${compPrefix}-description`}>
              {props.description}
            </div>
          )}
        </div>
      </div>
      <div className={`${compPrefix}-actions`}>
        {props.action && (
          <DsButton {...props.action} actionType={getActionType(type)} />
        )}
        {dismissible && (
          <DsButton 
            onClick={handleDismiss}
            hierarchy="tertiary"
            icon={<X size={16} />}
            aria-label="Dismiss notification"
            className={`${compPrefix}-dismiss`}
          />
        )}
      </div>
    </div>
  );
};

// Backward compatibility export
export const dsNotification = DsNotification;
export type dsNotificationProps = DsNotificationProps;

// Toast/notification manager hook for managing multiple notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = React.useState<Array<DsNotificationProps & { id: string }>>([]);

  const addNotification = React.useCallback((notification: Omit<DsNotificationProps, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setNotifications(prev => [...prev, { ...notification, id }]);
    return id;
  }, []);

  const removeNotification = React.useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = React.useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll
  };
};

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

  className?: string
  ariaLabel?: string
}

const renderNotificationIcon = (type: DsNotificationProps['type']) => {
  switch (type) {
    case 'attention':
      return <AlertTriangle size={24} />;
    case 'dangerous':
      return <AlertCircle size={24} />;
    case 'informative':
      return <Info size={24} />;
    case 'success':
      return <CircleCheck size={24} />;
    case 'neutral':
    default:
      return <AlertCircle size={24} />;
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

export const DsNotification = ({ type = 'neutral', ...props }: DsNotificationProps) => {
  const classNames = classnames(
    compPrefix,
    `${compPrefix}-type-${type}`,
    props.className
  );

  return (
    <div className={classNames} aria-label={props.ariaLabel}>
      <div className={`${compPrefix}-container`}>
        {props.icon || renderNotificationIcon(type)}
        <div className={`${compPrefix}-text-container`}>
          <div className={`${compPrefix}-title`}>{props.title}</div>
          <div className={`${compPrefix}-description`}>{props.description}</div>
        </div>
      </div>
      {props.action ? <DsButton {...props.action} actionType={getActionType(type)} /> : null}
    </div>
  );
};

// Backward compatibility export
export const dsNotification = DsNotification;
export type dsNotificationProps = DsNotificationProps;

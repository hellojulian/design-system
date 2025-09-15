import React from 'react';
import { prefix } from '../prefix';
import classnames from 'classnames';

const compPrefix = `${prefix}-badge`;

export type dsBadgeColor = 'blue' | 'green' | 'red' | 'purple' | 'yellow' | 'neutral';

export interface dsBadgeProps {
  color?: dsBadgeColor
  icon?: JSX.Element
  iconRight?: JSX.Element
  label: string

  ariaLabel?: string
  className?: string
}

export const DsBadge = ({ color = 'blue', ...props }: dsBadgeProps) => {
  const classNames = classnames(
    compPrefix,
    `${compPrefix}-color-${color}`,
    props.className
  );
  const icon = React.useMemo(() => <div className={`${prefix}-icon`}>{props.icon}</div>, [props.icon]);
  const iconRight = React.useMemo(() => <div className={`${prefix}-badge-icon-right`}>{props.iconRight}</div>, [props.iconRight]);

  return (
    <div className={classNames} aria-label={props.ariaLabel}>
      {props.icon && icon}
      {props.label}
      {props.iconRight && iconRight}
    </div>
  );
};

// Backward compatibility
export const dsBadge = DsBadge;

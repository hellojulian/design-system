import React from 'react';
import { prefix } from '../prefix';
import { DsButton, type dsButtonProps } from '../ds-button/ds-button';
import classnames from 'classnames';

const compPrefix = `${prefix}-empty`;

export interface dsEmptyProps {
  title: string
  description?: string
  action?: dsButtonProps | JSX.Element
  illustration?: JSX.Element

  className?: string
}

export const DsEmpty = (props: dsEmptyProps) => {
  const classNames = classnames(compPrefix, props.className, {
    [`${compPrefix}-with-action`]: !!props.action,
    [`${compPrefix}-with-illustration`]: !!props.illustration
  });

  const action = React.useMemo(() => {
    if (props.action) {
      if (React.isValidElement(props.action)) {
        return props.action;
      } else {
        return <DsButton {...props.action} />;
      }
    }
    return null;
  }, [props.action]);

  return (
    <div {...props} className={classNames}>
      {props.illustration}
      <div className={`${compPrefix}-content`}>
        <b className={`${compPrefix}-title`}>{props.title}</b>
        <p className={`${compPrefix}-description`}>{props.description}</p>
      </div>
      {action}
    </div>
  );
};

// Backward compatibility
export const dsEmpty = DsEmpty;

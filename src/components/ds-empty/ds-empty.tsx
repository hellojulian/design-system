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
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  
  ariaLabel?: string
  className?: string
}

export const DsEmpty = (props: dsEmptyProps) => {
  const titleId = React.useMemo(() => `${compPrefix}-title-${Math.random().toString(36).substring(7)}`, []);
  const descriptionId = React.useMemo(() => `${compPrefix}-desc-${Math.random().toString(36).substring(7)}`, []);
  
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

  const HeadingTag = props.headingLevel || 'h2';
  
  // Build aria-describedby
  const ariaDescribedBy = React.useMemo(() => {
    const ids = [];
    if (props.description) ids.push(descriptionId);
    return ids.length > 0 ? ids.join(' ') : undefined;
  }, [props.description, descriptionId]);

  return (
    <div 
      className={classNames}
      role="region"
      aria-labelledby={titleId}
      aria-describedby={ariaDescribedBy}
      aria-label={props.ariaLabel}
    >
      {props.illustration && (
        <div aria-hidden="true">
          {props.illustration}
        </div>
      )}
      <div className={`${compPrefix}-content`}>
        <HeadingTag id={titleId} className={`${compPrefix}-title`}>
          {props.title}
        </HeadingTag>
        {props.description && (
          <p id={descriptionId} className={`${compPrefix}-description`}>
            {props.description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
};

// Backward compatibility
export const dsEmpty = DsEmpty;

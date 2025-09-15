import React from 'react';
import { prefix } from '../prefix';
import classnames from 'classnames';

const compPrefix = `${prefix}-illustration`;

export interface DsIllustrationProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
  alt?: string;
  className?: string;
}

export const DsIllustration = ({ name, size = 'medium', alt, ...props }: DsIllustrationProps) => {
  const classNames = classnames(
    compPrefix,
    `${compPrefix}-size-${size}`,
    props.className
  );

  let imageSrc = '';
  try {
    imageSrc = require(`../../illustrations/${name}.png`);
  } catch (error) {
    console.warn(`Illustration not found: ${name}`);
  }

  const altText = alt || `Illustration ${name}`;

  return (
    <div className={classNames}>
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt={altText}
          className={`${compPrefix}-image`}
        />
      )}
    </div>
  );
};

// Backward compatibility
export const dsIllustration = DsIllustration;
export type dsIllustrationProps = DsIllustrationProps;
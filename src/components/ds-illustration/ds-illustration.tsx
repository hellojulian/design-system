import React from 'react';
import { prefix } from '../prefix';
import classnames from 'classnames';

const compPrefix = `${prefix}-illustration`;

export interface DsIllustrationProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
  alt?: string;
  decorative?: boolean;
  role?: 'img' | 'presentation';
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
  className?: string;
}

export const DsIllustration = ({ 
  name, 
  size = 'medium', 
  alt, 
  decorative = false,
  role,
  ariaDescribedBy,
  ariaLabelledBy,
  className,
  ...restProps 
}: DsIllustrationProps) => {
  const classNames = classnames(
    compPrefix,
    `${compPrefix}-size-${size}`,
    className
  );

  let imageSrc = '';
  try {
    imageSrc = require(`../../illustrations/${name}.png`);
  } catch (error) {
    console.warn(`Illustration not found: ${name}`);
  }

  // Determine alt text based on decorative flag and provided alt
  const getAltText = () => {
    if (decorative) return '';
    if (alt !== undefined) return alt;
    return `Illustration: ${name.replace(/[-_]/g, ' ')}`;
  };

  // Determine role based on props and decorative state
  const getRole = () => {
    if (role) return role;
    if (decorative) return 'presentation';
    return 'img';
  };

  // Determine aria-hidden based on decorative state
  const getAriaHidden = () => {
    return decorative ? 'true' : undefined;
  };

  const altText = getAltText();
  const imgRole = getRole();
  const ariaHidden = getAriaHidden();

  return (
    <div className={classNames} {...restProps}>
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt={altText}
          role={imgRole}
          aria-hidden={ariaHidden}
          aria-describedby={ariaDescribedBy}
          aria-labelledby={ariaLabelledBy}
          className={`${compPrefix}-image`}
        />
      )}
    </div>
  );
};

// Backward compatibility
export const dsIllustration = DsIllustration;
export type dsIllustrationProps = DsIllustrationProps;
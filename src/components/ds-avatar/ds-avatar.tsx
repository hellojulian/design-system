import React from 'react';
import { prefix } from '../prefix';
import classnames from 'classnames';

const compPrefix = `${prefix}-avatar`;

export type DsAvatarSize = '52px' | '80px' | '120px';
export type DsAvatarVariant = 'Male 1' | 'Male 2' | 'Female 1' | 'Female 2';

export interface DsAvatarProps {
  size?: DsAvatarSize;
  variant?: DsAvatarVariant;
  alt?: string;
  className?: string;
}

const getAvatarImage = (size: DsAvatarSize, variant: DsAvatarVariant): string => {
  try {
    // Convert variant to filename format
    const variantName = variant.replace(' ', ' ');
    const imagePath = require(`../../avatars/${size}_${variantName}.png`);
    return imagePath;
  } catch (error) {
    console.warn(`Avatar image not found for ${size}_${variant}`);
    return '';
  }
};

export const DsAvatar = ({ size = '80px', variant = 'Male 1', alt, ...props }: DsAvatarProps) => {
  const classNames = classnames(
    compPrefix,
    `${compPrefix}-size-${size}`,
    props.className
  );

  const imageSrc = getAvatarImage(size, variant);
  const altText = alt || `Profile avatar showing ${variant.toLowerCase()} representation`;

  return (
    <div className={classNames}>
      <img 
        src={imageSrc} 
        alt={altText}
        className={`${compPrefix}-image`}
        role="img"
        aria-label={altText}
      />
    </div>
  );
};

// Backward compatibility
export const dsAvatar = DsAvatar;
export type dsAvatarProps = DsAvatarProps;
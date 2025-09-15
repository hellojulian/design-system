import React from 'react';
import { prefix } from '../components/prefix';

export default function DsIconX8X8 () {
  return (
    <svg className={`${prefix}-icon-x-8x8`} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="currentcolor">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.1364 2.13639C7.48787 1.78492 7.48787 1.21507 7.1364 0.863602C6.78493 0.512131 6.21508 0.512131 5.86361 0.863602L4.00001 2.72721L2.1364 0.863603C1.78493 0.512131 1.21508 0.512131 0.86361 0.863603C0.512138 1.21507 0.512138 1.78492 0.86361 2.13639L2.72721 4L0.86361 5.8636C0.512138 6.21507 0.512138 6.78492 0.86361 7.13639C1.21508 7.48787 1.78493 7.48787 2.1364 7.13639L4.00001 5.27279L5.86361 7.13639C6.21508 7.48787 6.78493 7.48787 7.1364 7.13639C7.48787 6.78492 7.48787 6.21508 7.1364 5.8636L5.2728 4L7.1364 2.13639Z"/>
    </svg>
  );
};

// Backward compatibility export
export const dsIconX8x8 = DsIconX8X8;

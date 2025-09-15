import React from 'react';
import { prefix } from '../components/prefix';

export default function DsIconCheck8X8 () {
  return (
    <svg className={`${prefix}-icon-check-8x8`} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="currentcolor">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.18333 3.08571C7.50681 2.70832 7.46311 2.14015 7.08571 1.81667C6.70832 1.49319 6.14015 1.53689 5.81667 1.91429L3.47013 4.65192L2.41062 3.52131C2.07074 3.15862 1.50119 3.14012 1.1385 3.48001C0.775806 3.81989 0.757314 4.38944 1.0972 4.75213L2.83436 6.60588C2.84841 6.62128 2.86309 6.63629 2.87838 6.65087C2.95435 6.72355 3.04017 6.78044 3.13156 6.82138C3.37934 6.93266 3.66446 6.92483 3.90447 6.80425C3.99396 6.75929 4.07718 6.69866 4.14986 6.62267C4.16449 6.60744 4.17848 6.5918 4.19183 6.5758L7.18333 3.08571Z"/>
    </svg>
  );
};

// Backward compatibility export
export const dsIconCheck8X8 = DsIconCheck8X8;

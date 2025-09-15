import React from 'react';
import { prefix } from '../components/prefix';

export default function DsIconCheck16X16 () {
  return (
    <svg className={`${prefix}-icon-check-16x16`} width="16" height="16" viewBox="0 0 16 16" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M14.5374 4.95392C14.9492 4.39986 14.8339 3.61685 14.2798 3.20502C13.7258 2.79319 12.9427 2.90849 12.5309 3.46256L6.8403 11.1186L4.10677 8.50508C3.60778 8.028 2.81653 8.04577 2.33945 8.54476C1.86237 9.04374 1.88014 9.835 2.37913 10.3121L6.12135 13.89C6.14408 13.9123 6.16782 13.934 6.19256 13.9548C6.30437 14.0495 6.42866 14.1213 6.55938 14.1704C6.73558 14.2367 6.92202 14.2611 7.10461 14.2456C7.28721 14.2302 7.46691 14.1749 7.62948 14.0799C7.75013 14.0096 7.86062 13.9179 7.95497 13.8058C7.97583 13.7811 7.99558 13.7558 8.01421 13.73L14.5374 4.95392Z"/>
    </svg>
  );
};

// Backward compatibility export
export const dsIconCheck16X16 = DsIconCheck16X16;

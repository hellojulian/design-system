import React from 'react';
import { prefix } from '../components/prefix';

export default function DsIconPlaceholder16X16 () {
  return (
    <svg className={`${prefix}-icon-placeholder-16x16`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentcolor">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.0001 8C15.0001 11.866 11.8661 15 8.00006 15C4.13407 15 1.00006 11.866 1.00006 8C1.00006 4.13401 4.13407 1 8.00006 1C11.8661 1 15.0001 4.13401 15.0001 8ZM16.0001 8C16.0001 12.4183 12.4183 16 8.00006 16C3.58178 16 6.10352e-05 12.4183 6.10352e-05 8C6.10352e-05 3.58172 3.58178 0 8.00006 0C12.4183 0 16.0001 3.58172 16.0001 8ZM6.50006 4H5.00006V5H6.00006V8.5V11H5.00006V12H6.50006H9.00006V11H7.00006V9H9.00006C10.3808 9 11.5001 7.88071 11.5001 6.5C11.5001 5.11929 10.3808 4 9.00006 4H6.50006ZM7.00006 8V5H9.00006C9.82849 5 10.5001 5.67157 10.5001 6.5C10.5001 7.32843 9.82849 8 9.00006 8H7.00006Z"/>
    </svg>
  );
};

// Backward compatibility export
export const dsIconPlaceholder16X16 = DsIconPlaceholder16X16;

import { css } from 'styled-components';
import { Breakpoints, MediaQuery } from './types';

const em = (px: number) => `${px / 16}em`;

export function createMediaQuery<T extends Breakpoints>(breakpoints: T) {
  return Object.entries(breakpoints).reduce(
    (acc, [breakpointKey, breakpointValue]) => {
      const key = breakpointKey as keyof T;
      const { min, max } = breakpointValue;

      if (min !== undefined && max !== undefined) {
        if (min === 0) {
          acc[key] = (template, ...args) => css`
            @media screen and (max-width: ${em(max)}) {
              ${css(template, ...args)}
            }
          `;
        } else if (max === Infinity) {
          acc[key] = (template, ...args) => css`
            @media screen and (min-width: ${em(min)}) {
              ${css(template, ...args)}
            }
          `;
        } else {
          acc[key] = (template, ...args) => css`
            @media screen and (min-width: ${em(min)}) and (max-width: ${em(
                max
              )}) {
              ${css(template, ...args)}
            }
          `;
        }
      } else {
        if (min) {
          acc[key] = (template, ...args) => css`
            @media screen and (min-width: ${em(min)}) {
              ${css(template, ...args)}
            }
          `;
        }

        if (max) {
          acc[key] = (template, ...args) => css`
            @media screen and (max-width: ${em(max)}) {
              ${css(template, ...args)}
            }
          `;
        }
      }

      return acc;
    },
    {} as MediaQuery<T>
  );
}

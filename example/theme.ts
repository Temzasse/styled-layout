import { DefaultTheme } from 'styled-components';
import { createMediaQuery } from '../src';

const baseBreakpoints = {
  phone: { min: 0, max: 767 },
  tablet: { min: 768, max: 1023 },
  desktop: { min: 1024, max: 1279 },
  monitor: { min: 1280, max: Infinity },
};

const breakpoints = {
  ...baseBreakpoints,
  tabletDown: { max: baseBreakpoints.tablet.max },
  tabletUp: { min: baseBreakpoints.tablet.min },
  desktopDown: { max: baseBreakpoints.desktop.max },
  desktopUp: { min: baseBreakpoints.desktop.min },
};

export const media = createMediaQuery(breakpoints);

export const theme: DefaultTheme = {
  spacing: {
    xxsmall: '2px',
    xsmall: '4px',
    small: '8px',
    normal: '16px',
    default: '16px',
    medium: '24px',
    large: '32px',
    xlarge: '48px',
    xxlarge: '64px',
  },
  breakpoints,
  media,
};

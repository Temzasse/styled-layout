import 'styled-components';
import { MediaQuery } from '../src/types';

declare module 'styled-components' {
  interface Breakpoints {
    phone: { min: number; max: number };
    tablet: { min: number; max: number };
    desktop: { min: number; max: number };
    monitor: { min: number; max: number };
    // Variants
    tabletDown: { max: number };
    tabletUp: { min: number };
    desktopDown: { max: number };
    desktopUp: { min: number };
  }

  export interface DefaultTheme {
    spacing: {
      xxsmall: string;
      xsmall: string;
      small: string;
      normal: string;
      medium: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      default: string;
    };
    breakpoints: Breakpoints;
    media: MediaQuery<Breakpoints>;
  }
}

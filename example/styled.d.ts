import 'styled-components';
import { MediaQuery } from '../src/types';

declare module 'styled-components' {
  interface Breakpoints {
    sm: { min: number; max: number };
    md: { min: number; max: number };
    lg: { min: number; max: number };
    xl: { min: number; max: number };
    // Variants
    mdDown: { max: number };
    mdUp: { min: number };
    lgDown: { max: number };
    lgUp: { min: number };
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

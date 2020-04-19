import { css, DefaultTheme } from 'styled-components';

interface BreakpointRange {
  min: number;
  max: number;
}

export type Breakpoints = {
  phone: BreakpointRange;
  tablet: BreakpointRange;
  desktop: BreakpointRange;
  monitor: BreakpointRange;
};

export type Theme = DefaultTheme & {
  spacing: { default: string };
  breakpoints: Breakpoints;
  media: any;
};

export type WithMediaProp<T> = T & {
  media?: Partial<{ [breakpoint in keyof Theme['breakpoints']]: Partial<T> }>;
};

export type WithTransientMediaProp<T> = T & {
  $media?: Partial<{ [breakpoint in keyof Theme['breakpoints']]: Partial<T> }>;
};

type CSSReturnType = ReturnType<typeof css>;
// type CSSArgsType = Parameters<typeof css>;

// type MediaFn = (
//   template: TemplateStringsArray,
//   ...args: CSSArgsType
// ) => CSSReturnType;

// TODO: fix
type MediaFn = (template: any, ...args: any) => CSSReturnType;

export type MediaQuery<B extends object> = { [K in keyof B]: MediaFn };

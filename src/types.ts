import { css, DefaultTheme, StyledComponent } from 'styled-components';

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;

type CSSReturnType = ReturnType<typeof css>;
type CSSArgsType = ArgumentTypes<typeof css>;
type MediaQueryFn = (...args: CSSArgsType) => CSSReturnType;

export type MediaQuery<B extends object> = { [K in keyof B]: MediaQueryFn };

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
  media: MediaQuery<any>;
};

export type WithMediaProp<T> = T & {
  media?: Partial<{ [breakpoint in keyof Theme['breakpoints']]: Partial<T> }>;
};

export type WithTransientMediaProp<T> = T & {
  $media?: Partial<{ [breakpoint in keyof Theme['breakpoints']]: Partial<T> }>;
};

type NativeDivProps = React.PropsWithoutRef<JSX.IntrinsicElements['div']>;
type StyledDivProps = React.ComponentProps<StyledComponent<'div', any>>;
export type BaseProps = NativeDivProps & StyledDivProps;

import { css, DefaultTheme, StyledComponent } from 'styled-components';

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;

type CSSReturnType = ReturnType<typeof css>;
type CSSArgsType = ArgumentTypes<typeof css>;
type MediaQueryFn = (...args: CSSArgsType) => CSSReturnType;

export type MediaQuery<B extends object> = { [K in keyof B]: MediaQueryFn };

export interface Breakpoints {
  [breakpoint: string]: { min?: number; max?: number };
}

export type Theme = DefaultTheme & {
  spacing: { default: string };
  colors: { divider: string };
  breakpoints: Breakpoints;
  media: MediaQuery<any>;
};

export type WithResponsiveProps<T extends object> = {
  [P in keyof T]:
    | T[P]
    | Partial<
        {
          [breakpoint in keyof Theme['breakpoints']]: T[P];
        } & {
          _: T[P];
        }
      >;
};

export type WithTransientMediaProp<T> = T & {
  $media?: Partial<
    {
      [breakpoint in keyof Theme['breakpoints']]: Partial<T>;
    }
  >;
};

type NativeDivProps = React.PropsWithoutRef<JSX.IntrinsicElements['div']>;
type StyledDivProps = React.ComponentProps<StyledComponent<'div', any>>;
export type BaseProps = NativeDivProps & StyledDivProps;

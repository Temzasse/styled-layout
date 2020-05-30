import * as React from 'react';
import styled, { css, CSSProperties } from 'styled-components';
import { parseProps, getResponsiveCSS } from './utils';
import {
  WithResponsiveProps,
  WithTransientMediaProp,
  Theme,
  BaseProps,
} from '../types';

// Partially based on: https://every-layout.dev/layouts/stack/
// Also utilize transient props introduced in styled-components v5.1.0
// -> https://github.com/styled-components/styled-components/releases/tag/v5.1.0

type Props = BaseProps &
  WithResponsiveProps<{
    axis?: 'x' | 'y';
    spacing?: keyof Theme['spacing'];
    fluid?: boolean;
    dividers?: boolean | keyof Theme['colors'];
    align?: CSSProperties['alignItems'];
    justify?: CSSProperties['justifyContent'];
  }>;

type TransientProps = WithTransientMediaProp<{
  $axis?: 'x' | 'y';
  $spacing?: keyof Theme['spacing'];
  $fluid?: boolean;
  $dividers?: boolean | keyof Theme['colors'];
  $align?: CSSProperties['alignItems'];
  $justify?: CSSProperties['justifyContent'];
}>;

type ThemedProps = TransientProps & { theme: Theme };

const ownProps = [
  'axis',
  'spacing',
  'fluid',
  'align',
  'justify',
  'dividers',
  'media',
];

const hdividers = (p: ThemedProps) => css`
  & > * {
    position: relative;
  }

  & > *:not([data-spacer]) + *:not([data-spacer])::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: ${getDividerColor(p)};
    transform: translateY(-0.5px);
    top: calc(${getSpacing(p)} / -2);
    left: 0;
  }
`;

const vdividers = (p: ThemedProps) => css`
  & > * {
    position: relative;
  }

  & > *:not([data-spacer]) + *:not([data-spacer])::before {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: ${getDividerColor(p)};
    transform: translateX(-0.5px);
    left: calc(${getSpacing(p)} / -2);
    top: 0;
  }
`;

const vstack = (p: ThemedProps) => css`
  flex-direction: column;
  & > *:not([data-spacer]) + *:not([data-spacer]) {
    margin: ${getSpacing(p)} 0 0 0;
  }
  ${p.$dividers && hdividers(p)}
`;

const fluid = (p: ThemedProps) => css`
  flex-wrap: wrap;
  margin: calc(${getSpacing(p)} / 2 * -1);
  & > * {
    margin: calc(${getSpacing(p)} / 2) !important;
  }
`;

const hstack = (p: ThemedProps) => css`
  flex-direction: row;
  & > *:not([data-spacer]) + *:not([data-spacer]) {
    margin: 0 0 0 ${getSpacing(p)};
  }
  ${p.$dividers && vdividers(p)}
  ${p.$fluid && fluid(p)}
`;

// Double the spacing if dividers are used so that the space is correct on both
// sides of the divider
const getSpacing = (p: ThemedProps) =>
  `calc(${p.theme.spacing[p.$spacing || 'default']} * ${p.$dividers ? 2 : 1})`;

const getDividerColor = (p: ThemedProps) => {
  if (
    typeof p.$dividers === 'string' &&
    p.theme.colors &&
    p.theme.colors[p.$dividers]
  ) {
    return p.theme.colors[p.$dividers];
  } else if (p.theme.colors && p.theme.colors.divider) {
    return p.theme.colors.divider;
  }
  return '#ddd';
};

const getCSS = (p: ThemedProps) => [
  p.$align && `align-items: ${p.$align};`,
  p.$justify && `justify-content: ${p.$justify};`,
  p.$axis === 'x' && hstack(p),
  (!p.$axis || p.$axis === 'y') && vstack(p),
];

const StackBase = styled.div<TransientProps>`
  display: flex;
  ${getCSS}
  ${p => getResponsiveCSS(p, getCSS)}
`;

const Stack: React.FC<Props> = ({ children, ...props }) => (
  <StackBase {...parseProps(props, ownProps)}>{children}</StackBase>
);

export default Stack;

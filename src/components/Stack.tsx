import * as React from 'react';
import styled, { css, CSSProperties } from 'styled-components';
import { getImportant, parseProps } from './utils';
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
    dividers?: boolean | string;
    align?: CSSProperties['alignItems'];
    justify?: CSSProperties['justifyContent'];
  }>;

type TransientProps = WithTransientMediaProp<{
  $axis?: 'x' | 'y';
  $spacing?: keyof Theme['spacing'];
  $fluid?: boolean;
  $dividers?: boolean | string;
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

const vstack = (p: ThemedProps, i: string) => css`
  flex-direction: column ${i};

  & > * {
    margin: 0 ${i};
    position: relative;
  }

  & > *:not([data-spacer]) + *:not([data-spacer]) {
    margin-top: ${getSpacing(p)} ${i};
  }

  ${p.$dividers && hdividers(p)}
`;

const fluid = (p: ThemedProps, i: string) => css`
  flex-wrap: wrap ${i};
  margin: calc(${getSpacing(p)} / 2 * -1) ${i};

  & > * {
    margin: calc(${getSpacing(p)} / 2) !important;
  }
`;

const hstack = (p: ThemedProps, i: string) => css`
  flex-direction: row ${i};

  & > * {
    margin: 0 ${i};
    position: relative;
  }

  & > *:not([data-spacer]) + *:not([data-spacer]) {
    margin-left: ${getSpacing(p)} ${i};
  }

  ${p.$dividers && vdividers(p)}
  ${p.$fluid && fluid(p, i)}
`;

// Double the spacing if dividers are used so that the space is correct on both
// sides of the divider
const getSpacing = (p: ThemedProps) =>
  `calc(${p.theme.spacing[p.$spacing || 'default']} * ${p.$dividers ? 2 : 1})`;

const getDividerColor = (p: ThemedProps) => {
  if (typeof p.$dividers === 'string') {
    return p.$dividers;
  } else if (p.theme.colors && p.theme.colors.divider) {
    return p.theme.colors.divider;
  }
  return '#ddd';
};

const getCSS = (p: ThemedProps, important = false) => {
  const i = getImportant(important);
  return css`
    align-items: ${p.$align || 'flex-start'} ${i};
    justify-content: ${p.$justify || 'flex-start'} ${i};
    ${p.$axis === 'x' && hstack(p, i)}
    ${(!p.$axis || p.$axis === 'y') && vstack(p, i)}
  `;
};

const getResponsiveCSS = (p: ThemedProps) => {
  if (!p.$media || !p.theme.media) return '';
  return Object.entries(p.$media).map(([breakpoint, props]) => {
    const breakpointCSS = getCSS({ ...p, ...props }, true);
    return p.theme.media[breakpoint]`${breakpointCSS}`;
  });
};

const StackBase = styled.div<TransientProps>`
  display: flex;
  ${getCSS}
  ${getResponsiveCSS}
`;

const Stack: React.FC<Props> = ({ children, ...props }) => (
  <StackBase {...parseProps(props, ownProps)}>{children}</StackBase>
);

export default Stack;

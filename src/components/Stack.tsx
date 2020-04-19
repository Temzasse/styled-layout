import * as React from 'react';
import styled, { css, CSSProperties } from 'styled-components';
import { getImportant, makeTransientProps } from './utils';
import {
  WithMediaProp,
  WithTransientMediaProp,
  Theme,
  BaseProps,
} from '../types';

// Partially based on: https://every-layout.dev/layouts/stack/
// Also utilize transient props introduced in styled-components v5.1.0
// -> https://github.com/styled-components/styled-components/releases/tag/v5.1.0

type Props = BaseProps &
  WithMediaProp<{
    axis?: 'x' | 'y';
    spacing?: keyof Theme['spacing'];
    fluid?: boolean;
    align?: CSSProperties['alignItems'];
    justify?: CSSProperties['justifyContent'];
  }>;

type TransientProps = WithTransientMediaProp<{
  $axis?: 'x' | 'y';
  $spacing?: keyof Theme['spacing'];
  $fluid?: boolean;
  $align?: CSSProperties['alignItems'];
  $justify?: CSSProperties['justifyContent'];
}>;

type ThemedProps = TransientProps & { theme: Theme };

const ownProps = ['axis', 'spacing', 'fluid', 'align', 'justify', 'media'];

const vstack = (p: ThemedProps, i: string) => css`
  flex-direction: column ${i};

  & > * {
    margin: 0 ${i};
  }

  & > *:not([data-spacer]) + *:not([data-spacer]) {
    margin-top: ${p.theme.spacing[p.$spacing || 'default']} ${i};
  }
`;

const fluid = (p: ThemedProps, i: string) => css`
  flex-wrap: wrap ${i};
  margin: calc(${p.theme.spacing[p.$spacing || 'default']} / 2 * -1) ${i};

  & > * {
    margin: calc(${p.theme.spacing[p.$spacing || 'default']} / 2) !important;
  }
`;

const hstack = (p: ThemedProps, i: string) => css`
  flex-direction: row ${i};

  & > * {
    margin: 0 ${i};
  }

  & > *:not([data-spacer]) + *:not([data-spacer]) {
    margin-left: ${p.theme.spacing[p.$spacing || 'default']} ${i};
  }

  ${p.$fluid && fluid(p, i)}
`;

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
    const transientProps = makeTransientProps<TransientProps>(ownProps, props);
    const breakpointCSS = getCSS({ ...p, ...transientProps }, true);
    return p.theme.media[breakpoint]`${breakpointCSS}`;
  });
};

const StackBase = styled.div<TransientProps>`
  display: flex;
  ${getCSS}
  ${getResponsiveCSS}
`;

const Stack: React.FC<Props> = ({ children, ...props }) => (
  <StackBase {...makeTransientProps<TransientProps>(ownProps, props)}>
    {children}
  </StackBase>
);

export default Stack;

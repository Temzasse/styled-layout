import * as React from 'react';
import styled, { css } from 'styled-components';
import { getImportant, parseProps } from './utils';
import {
  WithResponsiveProps,
  WithTransientMediaProp,
  Theme,
  BaseProps,
} from '../types';

// Utilize transient props introduced in styled-components v5.1.0
// -> https://github.com/styled-components/styled-components/releases/tag/v5.1.0

type Props = BaseProps &
  WithResponsiveProps<{
    axis?: 'x' | 'y';
    size?: keyof Theme['spacing'];
  }>;

type TransientProps = WithTransientMediaProp<{
  $axis?: 'x' | 'y';
  $size?: keyof Theme['spacing'];
}>;

type ThemedProps = TransientProps & { theme: Theme };

const ownProps = ['axis', 'size', 'media'];

const hspacer = (p: ThemedProps, i: string) => css`
  width: ${p.theme.spacing[p.$size || 'default']};
  height: 0 ${i};
`;

const vspacer = (p: ThemedProps, i: string) => css`
  height: ${p.theme.spacing[p.$size || 'default']} ${i};
  width: 0 ${i};
`;

const getCSS = (p: ThemedProps, important = false) => {
  const i = getImportant(important);
  if (p.$axis === 'x') return hspacer(p, i);
  if (!p.$axis || p.$axis === 'y') return vspacer(p, i);
  return '';
};

const getResponsiveCSS = (p: ThemedProps) => {
  if (!p.$media || !p.theme.media) return '';

  return Object.entries(p.$media).map(([breakpoint, props]) => {
    const breakpointCSS = getCSS({ ...p, ...props }, true);
    return p.theme.media[breakpoint]`${breakpointCSS}`;
  });
};

const SpacerBase = styled.div.attrs({ 'data-spacer': 'true' })<TransientProps>`
  flex-shrink: 0;
  ${getCSS}
  ${getResponsiveCSS}
`;

const Spacer: React.FC<Props> = ({ children, ...props }) => (
  <SpacerBase {...parseProps(props, ownProps)} />
);

export default Spacer;

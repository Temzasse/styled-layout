import * as React from 'react';
import styled, { css } from 'styled-components';
import { getImportant, parseProps, getResponsiveCSS } from './utils';
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
  width: ${getSpacing(p)};
  height: 0 ${i};
`;

const vspacer = (p: ThemedProps, i: string) => css`
  height: ${getSpacing(p)} ${i};
  width: 0 ${i};
`;

const getSpacing = (p: ThemedProps) => p.theme.spacing[p.$size || 'default'];

const getCSS = (p: ThemedProps, important = false) => {
  const i = getImportant(important);
  if (p.$axis === 'x') return hspacer(p, i);
  if (!p.$axis || p.$axis === 'y') return vspacer(p, i);
  return '';
};

const SpacerBase = styled.div.attrs({ 'data-spacer': 'true' })<TransientProps>`
  flex-shrink: 0;
  ${getCSS}
  ${p => getResponsiveCSS(p, getCSS)}
`;

const Spacer: React.FC<Props> = ({ children, ...props }) => (
  <SpacerBase {...parseProps(props, ownProps)} />
);

export default Spacer;

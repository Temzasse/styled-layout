// import styled, { css, CSSProperties } from 'styled-components';
// import { WithMediaProp, Theme } from './types';

// // Spacer -------------------------------------

// type SpacerProps = WithMediaProp<{
//   axis?: 'x' | 'y';
//   size?: keyof Theme['spacing'];
// }>;

// type ThemedSpacerProps = SpacerProps & { theme: Theme };

// const hspacer = (p: ThemedSpacerProps) => css`
//   width: ${p.theme.spacing[p.size || 'default']};
// `;

// const vspacer = (p: ThemedSpacerProps) => css`
//   height: ${p.theme.spacing[p.size || 'default']};
// `;

// const spacerCSS = (p: ThemedSpacerProps) => {
//   if (p.axis === 'x') return hspacer(p);
//   if (!p.axis || p.axis === 'y') return vspacer(p);
//   return '';
// };

// const spacerMQ = (p: ThemedSpacerProps) => {
//   if (!p.media) return '';

//   return Object.entries(p.media)
//     .map(([breakpoint, props]) => {
//       const breakpointCSS = spacerCSS({...p, ...props});
//       return p.theme.media[breakpoint]`${breakpointCSS}`;
//     })
//     .join();
// };

// export const Spacer = styled.div.attrs({ 'data-spacer': 'true' })<SpacerProps>`
//   flex-shrink: 0;
//   ${spacerCSS}
//   ${spacerMQ}
// `;

// // Stack --------------------------------------
// // Partially based on: https://every-layout.dev/layouts/stack/

// type StackProps = WithMediaProp<{
//   axis?: 'x' | 'y';
//   spacing?: keyof Theme['spacing'];
//   fluid?: boolean;
//   align?: CSSProperties['alignItems'];
//   justify?: CSSProperties['justifyContent'];
// }>;

// type ThemedStackProps = StackProps & { theme: Theme };

// const vstack = (p: ThemedStackProps) => css`
//   flex-direction: column;

//   & > * {
//     margin-top: 0;
//     margin-bottom: 0;
//   }

//   & > *:not([data-spacer]) + *:not([data-spacer]) {
//     margin-top: ${p.theme.spacing[p.spacing || 'default']};
//   }
// `;

// const fluid = (p: ThemedStackProps) => css`
//   flex-wrap: wrap;
//   margin: calc(${p.theme.spacing[p.spacing || 'default']} / 2 * -1);

//   & > * {
//     margin: calc(${p.theme.spacing[p.spacing || 'default']} / 2) !important;
//   }
// `;

// const hstack = (p: ThemedStackProps) => css`
//   flex-direction: row;

//   & > * {
//     margin-left: 0;
//     margin-right: 0;
//   }

//   & > *:not([data-spacer]) + *:not([data-spacer]) {
//     margin-left: ${p.theme.spacing[p.spacing || 'default']};
//   }

//   ${p.fluid && fluid(p)}
// `;

// export const Stack = styled.div<StackProps>`
//   display: flex;
//   align-items: ${p => p.align || 'flex-start'};
//   justify-content: ${p => p.justify || 'flex-start'};
//   ${p => p.axis === 'x' && hstack(p)}
//   ${p => (!p.axis || p.axis === 'y') && vstack(p)}
// `;

<div align="center" >
  <br/>
  <br/>
  <strong>💠 Styled Layout</strong>
  <br/>
  Simple responsive layout components.
  <br/>
  <br/>
</div>

<hr />

## Motivation

TODO.

## Getting started

### Installation

First, install the library.

```sh
npm install styled-layout
```

or with Yarn:

```sh
yarn add styled-layout
```

### Prerequisites

In order to use the layout components we first need to add spacing units/tokens to the theme. The tokens need to be added inside an object called `spacing` and there needs to be at least one spacing unit called `default` but other than that the units can be named based on any naming convention you are most comfortable with.

> If you are not familiar with styled-components theme setup with TypeScript you can read about it [here](https://styled-components.com/docs/api#typescript).

```ts
import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  spacing: {
    xxsmall: '2px',
    xsmall: '4px',
    small: '8px',
    normal: '16px',
    default: '16px',
    medium: '24px',
    large: '32px',
    xlarge: '48px',
    xxlarge: '64px',
  },
  // ... other theme values ...
};
```

```jsx
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

const App = () => {
  <ThemeProvider theme={theme}>{/* Components */}</ThemeProvider>;
};
```

## Basic usage

```jsx
import React from 'react';
import styled from 'styled-components';
import { Stack, Spacer } from 'styled-layout';

const BasicStack = () => (
  <Stack justify="center">
    <p>Basic stack</p>
    <div>Item 1</div>
    <div>Item 2</div>

    <Spacer size="large">

    <Stack axis="x" spacing="small">
      <div>Item 3</div>
      <div>Item 4</div>
    </Stack>
  </Stack>
)
```

Check the available props for each layout component in the [Components](#Components) section.

You can also take a look at the [example](example/components/Main.tsx) folder for more comprehensive usage of the layout components.

## Media queries

Start by defining the breakpoints that are part of your design system. The name of the each breakpoint is totally up to you to decide - they can be eg. _phone|tablet|desktop|monitor_ or if you fancy more Bootstrap like names _sm|md|lg|xl_.

```js
const breakpoints = {
  phone: { min: 0, max: 767 },
  tablet: { min: 768, max: 1023 },
  desktop: { min: 1024, max: 1279 },
  monitor: { min: 1280, max: Infinity },
};
```

You can optionally add breakpoints based on the base breakpoints for `Up/Down` variants for convienience.

> **NOTE:** the name of the variant needs to be suffixed with either `Up` or `Down`!

```js
const baseBreakpoints = {
  phone: { min: 0, max: 767 },
  tablet: { min: 768, max: 1023 },
  desktop: { min: 1024, max: 1279 },
  monitor: { min: 1280, max: Infinity },
};

const breakpoints = {
  ...baseBreakpoints,
  tabletDown: { max: baseBreakpoints.tablet.max },
  tabletUp: { min: baseBreakpoints.tablet.min },
  desktopDown: { max: baseBreakpoints.desktop.max },
  desktopUp: { min: baseBreakpoints.desktop.min },
};
```

Finally, create a `media` utility and add it to your theme. Note that we are also exporting the media helper here since it's quite a handy tool to use in your custom styled components too.

```js
import { DefaultTheme } from 'styled-components';
import { createMediaQuery } from 'styled-layout';

export const media = createMediaQuery(breakpoints);

export const theme: DefaultTheme = {
  breakpoints,
  media,
  // ...other theme values ...
};
```

This will enable responsive props for any layout component in styled-layout. The default value in the responsive prop object is represented by `_` key and the other fields come from the breakpoints that were added to the theme.

```jsx
import { Stack, Spacer } from 'styled-layout';

<Stack axis={{ _: 'x', phone: 'y' }}>
  <h1>Responsive props</h1>
  <Spacer size={{ _: 'large', tablet: 'normal' }} />
  <p>No need to add your own media queries 🎉</p>
</Stack>;
```

We can also the `media` helper that we exported earlier in any styled component.

```jsx
import styled from 'styled-components';
import { media } from './theme';

const CustomComponent = styled.div`
  padding: ${p => p.theme.spacing.large};

  ${media.phone`
    padding: ${p => p.theme.spacing.normal};
  `}
`;
```

You might be asking why we are using the exported `media` helper instead of the one we put in the theme.

That's a good question.

For some reason CSS syntax highlighting only works when we are directly using the media helper. So, by using `${media.phone}` instead of `${p => p.theme.media.phone}` the CSS is highlighted correctly (at least in VSCode). However, the CSS autocompletion doesn't seem to work in either case 😅

## Components

### `Stack`

| Prop      | Type          | Default      | Note                                            |
| --------- | ------------- | ------------ | ----------------------------------------------- |
| `axis`    | `'x'` / `'y'` | `'y'`        |                                                 |
| `spacing` | `string`      | `'default'`  | Based on provider spacing tokens.               |
| `fluid`   | `boolean`     | `false`      | Determines whether the stack items should wrap. |
| `align`   | `string`      | `flex-start` | Use any flexbox `align-items` value.            |
| `justify` | `string`      | `flex-start` | Use any flexbox `justify-content` value.        |

### `Spacer`

| Prop   | Type          | Default     | Note                              |
| ------ | ------------- | ----------- | --------------------------------- |
| `axis` | `'x'` / `'y'` | `'y'`       |                                   |
| `size` | `string`      | `'default'` | Based on provider spacing tokens. |

### `Divider`

To be implemented.

## Utilities

### `createMediaQuery`

```ts
interface BreakpointRange {
  min: number;
  max: number;
}

type Breakpoints = {
  [breakpoint: string]:
    | BreakpointRange
    // Up variant
    | Omit<BreakpointRange, 'min'>
    // Down variant
    | Omit<BreakpointRange, 'max'>;
};

const breakpoints: Breakpoints = {
  /* Add your breakpoints */
};

const media = createMediaQuery(breakpoints);
```

> **NOTE:** breakpoint variants needs to be suffixed with either `Up` or `Down`! Eg. `tabletUp` or `desktopDown`.

## License

MIT.

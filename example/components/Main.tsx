import * as React from 'react';
import styled from 'styled-components';
import { Stack, Spacer, Divider } from '../../src';
import { media } from '../theme';

export default function Main() {
  const items = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Wrapper>
      <Stack spacing="medium">
        <Title>Vertical Stack</Title>

        {items.slice(0, 4).map(i => (
          <Box key={i} bg="tomato">
            {i}
          </Box>
        ))}

        <Stack spacing={{ _: 'small', sm: 'xxlarge' }}>
          <Box bg="bisque">1</Box>
          <Box bg="bisque">2</Box>
          <Spacer size="medium" />
          <Box bg="bisque">3</Box>
        </Stack>

        <Spacer size="xxlarge" />

        <Title>Horizontal Stack</Title>

        <Stack axis="x" spacing="normal" fluid={{ _: false, sm: true }}>
          {items.map(i => (
            <Box key={i} bg="gold">
              {i}
            </Box>
          ))}
        </Stack>

        <Stack axis="x">
          <Box bg="aquamarine">1</Box>
          <Spacer axis="x" size="large" />
          <Box bg="aquamarine">2</Box>
          <Box bg="aquamarine">3</Box>
          <Spacer axis="x" size="xsmall" />
          <Box bg="aquamarine">4</Box>
        </Stack>

        <ScrollingStack>
          {items.map(i => (
            <Box key={i} bg="seagreen">
              {i}
            </Box>
          ))}
        </ScrollingStack>

        <Spacer size="xxlarge" />

        <Title>Fluid Stack</Title>

        {/* Since fluid Stack uses negative margins we need a wrapper for padding/border etc. */}
        <FluidStackWrapper>
          <FluidStack>
            {items.map(i => (
              <Box key={i} bg="hotpink">
                {i}
              </Box>
            ))}
          </FluidStack>
        </FluidStackWrapper>

        <Spacer size="xxlarge" />

        <Title>Alignment inside Stack</Title>

        <Stack axis={{ _: 'x', sm: 'y' }} spacing="large">
          <Card>
            <Stack align="center">
              <Circle />
              <PlaceholderText w="30%" />
              <PlaceholderText w="80%" />
            </Stack>
          </Card>

          <Card>
            <Stack align="center">
              <Circle />
              <PlaceholderText w="60%" />
              <PlaceholderText w="100%" />
            </Stack>
          </Card>
        </Stack>

        <Spacer size="xxlarge" />

        <Title>Dividers</Title>

        <Stack dividers>
          <Box bg="turquoise">1</Box>
          <Box bg="turquoise">2</Box>
          <Divider size="large" />
          <Box bg="turquoise">3</Box>
        </Stack>

        <Divider size="large" color="grey-90" />

        <Stack axis={{ _: 'x', mdDown: 'y' }} dividers="grey-50">
          <Box bg="powderblue">1 responsive</Box>
          <Box bg="powderblue">2 responsive</Box>
          <Box bg="powderblue">3 responsive</Box>
        </Stack>
      </Stack>
    </Wrapper>
  );
}

const BOX_SIZE = 40;

const ScrollingStack = styled(Stack).attrs({ axis: 'x' })`
  max-width: 220px;
  overflow: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: ${p => p.theme.spacing.small};

  &:after {
    content: '';
    flex-shrink: 0;
    width: 8px;
  }
`;

const FluidStackWrapper = styled.div`
  padding: ${p => p.theme.spacing.small};
  border: 1px solid #ccc;
  border-radius: 5px;
  align-self: flex-start;

  ${media.sm`
    padding: ${p => p.theme.spacing.medium};
  `}
`;

const FluidStack = styled(Stack).attrs({ axis: 'x', fluid: true })`
  max-width: calc(${BOX_SIZE}px * 3 + ${p => p.theme.spacing.normal} * 3);
`;

const Wrapper = styled.div`
  padding: ${p => p.theme.spacing.large};
`;

const Title = styled.h1`
  margin: 0;
  font-size: 32px;
`;

const Box = styled.div<{ bg: string }>`
  min-width: ${BOX_SIZE}px;
  min-height: ${BOX_SIZE}px;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  background-color: ${p => p.bg};
  font-weight: 500;
`;

const Card = styled.div`
  padding: ${p => p.theme.spacing.medium};
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f7f7f7;
  min-width: 120px;
`;

const Circle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(to bottom, #ccc, #ddd);
`;

const PlaceholderText = styled.span<{ w: string }>`
  width: ${p => p.w};
  height: 8px;
  border-radius: 99px;
  background: linear-gradient(to right, #ccc, #ddd);
`;

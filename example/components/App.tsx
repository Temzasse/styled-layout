import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Main from './Main';
import { theme } from '../theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Main />
      </Wrapper>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

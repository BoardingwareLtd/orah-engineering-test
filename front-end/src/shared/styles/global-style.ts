import { createGlobalStyle } from "styled-components"
import { Colors } from "shared/styles/colors"
import { FontSize } from "shared/styles/styles"

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${Colors.neutral.lighter};
    font-size: ${FontSize.u4};
    color: ${Colors.blue.darker};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

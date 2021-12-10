import { createGlobalStyle } from 'styled-components'
import { Palette } from './theme'

const GlobalStyle = createGlobalStyle`
  body, html {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    background-color: #0f0912;
  }

  * {
    font-family: ${(Palette.fonts.primary, Palette.fonts.secondary)};
  }

  *::-webkit-scrollbar {
  width: 14px;
  }

  *::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  *::-webkit-scrollbar-track {
    background: ${Palette.colors.secondaryMain};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${Palette.colors.primaryMain};
    border-radius: 20px;
  }

  * {
    scrollbar-color: ${Palette.colors.secondaryMain} ${
  Palette.colors.primaryMain
};
    scrollbar-width: thin;
  }

  a:link,
  a:visited,
  a:active {
    color: rgb(188, 228, 255);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`

export { GlobalStyle }

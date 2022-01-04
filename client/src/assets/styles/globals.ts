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
    font-family: 'Roboto', sans-serif;
    color: ${Palette.fontColor.secondary};
  }

  h1 {
    font-size: 54px;
    margin: 10px 0 10px 0;
    font-weight: 600;
    letter-spacing: -0.5px;

    @media (max-width: ${Palette.mediaWidthSizes.small}) {
      font-size: 48px;
    }
  }

  h2 {
    font-size: 46px;
    margin: 10px 0 10px 0;
    font-weight: 500;

    @media (max-width: ${Palette.mediaWidthSizes.small}) {
      font-size: 36px;
    }
  }

  h3 {
    font-size: 34px;
    margin: 5px 0 5px 0;
    font-weight: 400;

    @media (max-width: ${Palette.mediaWidthSizes.small}) {
      font-size: 26px;
    }
  }

  h4 {
    font-size: 26px;
    margin: 5px 0 5px 0;
    font-weight: 400;
    @media (max-width: ${Palette.mediaWidthSizes.small}) {
      font-size: 22px;
    }
  }

  h5 {
    font-size: 24px;
    margin: 5px 0 5px 0;
    font-weight: 300;

    @media (max-width: ${Palette.mediaWidthSizes.small}) {
      font-size: 18px;
    }
  }

  h6 {
    font-size: 20px;
    margin: 5px 0 5px 0;
    font-weight: 300;

    @media (max-width: ${Palette.mediaWidthSizes.small}) {
      font-size: 16px;
    }
  }

  *::-webkit-scrollbar {
  width: 10px;

  @media (max-width: ${Palette.mediaWidthSizes.medium}) {
    width: 0px;
  }
  }

  *::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  *::-webkit-scrollbar-track {
    background: ${Palette.colors.grey.elevation_0};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${Palette.colors.primary.main.elevation_4};
    border-radius: 20px;
  }

  * {
    scrollbar-color: ${Palette.colors.secondary.main.elevation_4} ${Palette.colors.primary.main.elevation_4};
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

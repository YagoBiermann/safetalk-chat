import styled from 'styled-components'

const PrimaryButton = styled.button<{ width?: string }>`
  padding: 12px 15px;
  margin: 25px 0 0 0;
  border-radius: 100px;
  background-color: ${props => props.theme.colors.primary.main.elevation_4};
  width: ${props => props.width || '200px'};
  color: ${props => props.theme.fontColor.secondary};
  border: none;
  text-transform: uppercase;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: 600;
  letter-spacing: 1.2px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors.primary.main.elevation_4};
    border-radius: 100px;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => props.width || '200px'};
    height: 200px;
    background-color: ${props => props.theme.colors.secondary.main.elevation_0};
    border-radius: 100px;
    opacity: 0;
    z-index: -1;
    transition: transform 0.5s, opacity 0.5s;
    transform: translate(0px, -75px) scale(0.1);
  }

  &:hover::after {
    opacity: 1;
    transform-origin: 100px 100px;
    transform: translate(0px, -75px) scale(1);
  }

  &:active {
    &::after {
      transition: background-color 0.5s;
      background-color: ${props =>
        props.theme.colors.secondary.light.elevation_2};
    }
  }
`
export default PrimaryButton

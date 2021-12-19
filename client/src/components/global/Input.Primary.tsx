import styled from 'styled-components'

const PrimaryInput = styled.input`
  background-color: ${props => props.theme.colors.primary.main.elevation_4};
  border-radius: 10px;
  border: none;
  width: ${props => props.width || '400px'};
  height: ${props => props.height || '45px'};
  color: ${props => props.theme.fontColor.secondary};
  font-family: 'Roboto', sans-serif;
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: 500;
  padding-left: 15px;
  transition-property: background-color;
  transition-duration: 0.5s;
  &:hover {
    background-color: ${props => props.theme.colors.primary.light.elevation_2};
  }
  &:focus {
    outline: none;
  }
  &::-moz-selection {
    background: ${props => props.theme.colors.primary.main.elevation_4};
    color: ${props => props.theme.fontColor.secondary};
  }
  ::placeholder {
    color: ${props => props.theme.fontColor.secondary};
  }
`
export default PrimaryInput

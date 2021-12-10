import styled from 'styled-components'

const PrimaryInput = styled.input`
  background-color: ${props => props.theme.colors.primaryMain};
  border-radius: 10px;
  border: none;
  width: 400px;
  height: 45px;
  color: whitesmoke;
  font-size: medium;
  font-weight: bold;
  padding-left: 15px;
  transition-property: background-color;
  transition-duration: 0.5s;
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
  &:focus {
    outline: none;
  }
  &::-moz-selection {
    background: ${props => props.theme.colors.primaryMain};
    color: whitesmoke;
  }
  ::placeholder {
    color: whitesmoke;
  }
`
export default PrimaryInput

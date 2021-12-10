import styled from 'styled-components'

const PrimaryButton = styled.button`
  padding: 12px 15px;
  margin: 25px 0 0 0;
  border-radius: 100px;
  background-color: ${props => props.theme.colors.primaryMain};
  width: 200px;
  color: whitesmoke;
  border: none;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1.5px;
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
    background-color: ${props => props.theme.colors.primaryMain};
    border-radius: 100px;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    background-color: ${props => props.theme.colors.primaryLight};
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
      background-color: ${props => props.theme.colors.secondaryLight};
    }
  }
`
export default PrimaryButton

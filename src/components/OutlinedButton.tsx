import { styled } from 'styled-components';

export const OutlinedButton = styled.button`
  border: solid 1px currentColor;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0);
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

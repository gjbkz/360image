import { styled } from 'styled-components';
import type { HTMLAttributes } from 'react';

export interface ToggleProps extends HTMLAttributes<HTMLButtonElement> {
  state: boolean;
  disabled?: boolean;
}

export const Toggle = ({ state, ...props }: ToggleProps) => (
  <ToggleButton {...props} data-state={state ? '1' : '0'}></ToggleButton>
);

const ToggleButton = styled.button`
  --width: 56px;
  --height: 24px;
  --margin: 1px;
  --knobHeight: calc(var(--height) - 2 * var(--margin));
  --knobWidth: 36px;
  width: var(--width);
  height: var(--height);
  border-radius: calc(var(--height) / 2);
  box-shadow: inset 0 0 0 1px currentColor;
  outline: 0;
  overflow: hidden;
  background-color: rgba(31, 185, 23, 0);
  transition-property: background-color;
  transition-duration: 0.1s;
  transition &::before {
    content: '';
    position: absolute;
    inset: 0;
  }
  &:hover {
    &::before {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  &:active {
    &::before {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  &::after {
    content: 'OFF';
    position: absolute;
    display: grid;
    place-content: center;
    left: var(--margin);
    top: var(--margin);
    width: var(--knobWidth);
    height: var(--knobHeight);
    border-radius: calc(var(--knobHeight) / 2);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    color: var(--col-text);
    background-color: rgba(255, 255, 255, 1);
    transition-property: left;
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
    box-shadow: 0 0 0 1px #ffffff inset;
  }
  &[data-state='1'] {
    background-color: rgba(31, 185, 23, 1);
    &::after {
      content: 'ON';
      left: calc(var(--width) - var(--margin) - var(--knobWidth));
    }
  }
  &[disabled] {
    &::after {
      content: 'N/A';
    }
  }
`;

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
  --width: 48px;
  --height: 24px;
  --margin: 0px;
  --knobHeight: calc(var(--height) - 2 * var(--margin));
  --knobWidth: 32px;
  --col-on: #1fb917;
  width: var(--width);
  height: var(--height);
  border-radius: calc(var(--height) / 2);
  box-shadow:
    0 0 0 1.25px currentColor inset,
    0 0 2px 1.25px rgba(0, 0, 0, 0.5) inset;
  outline: 0;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0);
    transition: background-color 0.1s linear;
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
    color: var(--col-text);
    background-color: rgba(255, 255, 255, 1);
    transition-property: left;
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
    font-size: 11px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  }
  background-image: linear-gradient(0deg, var(--col-on), var(--col-on));
  background-size: 50% 100%;
  background-position: left center;
  &[data-state='1'] {
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

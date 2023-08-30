import type { HTMLAttributes, SVGAttributes } from 'react';
import { styled } from 'styled-components';
import type { availableIcons } from '../util/icons.mjs';
import { classnames } from '../util/classnames.mjs';

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  icon: (typeof availableIcons)[number];
  size?: number;
}

export const Icon = ({ icon, size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={classnames('icon', props.className)}
  >
    <use href={`#icon-${icon}`} />
  </svg>
);

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: (typeof availableIcons)[number];
}

export const IconButton = ({ icon, ...props }: IconButtonProps) => (
  <ButtonWrap>
    <Button
      {...props}
      className={classnames('menu-button-bg', props.className)}
    >
      <Icon icon={icon} size={18} />
    </Button>
  </ButtonWrap>
);

const ButtonWrap = styled.div`
  display: grid;
  place-content: center;
  block-size: 0;
  overflow: visible;
  transform: translateY(-1px);
`;

const Button = styled.button`
  display: grid;
  place-content: center;
  padding: 2px;
`;

import { MouseEvent, useCallback } from 'react';
import { styled } from 'styled-components';
import { Icon } from './Icon.js';

interface TooltipProps {
  children: string | Array<string>;
}

export const Tooltip = ({ children }: TooltipProps) => {
  const onClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      alert(children);
    },
    [children],
  );
  return (
    <TooltipButton className="menu-button-bg tooltip" onClick={onClick}>
      <Icon icon="info" size={18} />
    </TooltipButton>
  );
};

const TooltipButton = styled.button`
  display: grid;
  place-content: center;
  inline-size: 24px;
  block-size: 24px;
  margin-block: -12px;
  margin-inline-end: -4px;
`;

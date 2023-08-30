import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import type { CSSProperties, PropsWithChildren } from 'react';
import { noop } from '../util/noop.mjs';

export interface AccordionVProps {
  opened?: boolean;
}

const closedStyle: CSSProperties = { width: 0, height: 0 };
const openedStyle: CSSProperties = {};

export const AccordionV = ({
  opened,
  children,
}: PropsWithChildren<AccordionVProps>) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<CSSProperties>(
    opened ? openedStyle : closedStyle,
  );
  useEffect(() => {
    if (!container) {
      return noop;
    }
    const rect = getContentRect(container);
    setStyle({
      width: Math.max(rect.scrollWidth, rect.width),
      height: Math.min(rect.height, rect.scrollHeight),
      overflow: rect.height < rect.scrollHeight ? 'scroll' : 'hidden',
    });
    if (opened) {
      return noop;
    }
    const timerId = setTimeout(() => setStyle(closedStyle), 10);
    return () => clearTimeout(timerId);
  }, [opened, container]);
  useEffect(() => {
    if (style === closedStyle) {
      return noop;
    }
    const timer = setTimeout(() => setStyle(openedStyle), 250);
    return () => clearTimeout(timer);
  }, [style]);
  return (
    <Container
      ref={setContainer}
      style={style}
      className={opened ? '' : 'closed'}
    >
      {children}
    </Container>
  );
};

const getContentRect = (element: HTMLElement) => {
  const { style } = element;
  const { width, height } = style;
  style.width = style.height = 'auto';
  const rect = element.getBoundingClientRect();
  const { scrollWidth, scrollHeight } = element;
  style.width = width;
  style.height = height;
  const { round } = Math;
  return {
    width: round(rect.width),
    height: round(rect.height),
    scrollWidth: round(scrollWidth),
    scrollHeight: round(scrollHeight),
  };
};

const Container = styled.div`
  overflow: auto;
  transition-property: width, height, opacity;
  transition-timing-function: ease-in-out, ease-in-out, linear;
  transition-duration: 150ms, 150ms, 150ms;
  transition-delay: 0s, 0s, 150ms;
  opacity: 1;
  &.closed {
    transition-delay: 150ms, 150ms, 0s;
    opacity: 0;
  }
  --sb-track-color: rgba(255, 255, 255, 0);
  --sb-thumb-color: rgba(255, 255, 255, 1);
  --sb-size: 6px;
  scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  &::-webkit-scrollbar {
    width: var(--sb-size);
  }
  &::-webkit-scrollbar-track {
    background: var(--sb-track-color);
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    background-image: linear-gradient(
      0deg,
      var(--sb-thumb-color),
      var(--sb-thumb-color)
    );
    background-repeat: no-repeat;
    background-size: 1.4px calc(100% - 6px);
  }
`;

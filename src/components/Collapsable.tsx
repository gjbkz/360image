import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import type { CSSProperties, PropsWithChildren } from 'react';
import { noop } from '../util/noop.mjs';

export interface CollapsableProps {
  opened?: boolean;
}

const defaultStyle: CSSProperties = { width: 0, height: 0 };

export const Collapsable = ({
  opened,
  children,
}: PropsWithChildren<CollapsableProps>) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<CSSProperties>(defaultStyle);
  useEffect(() => {
    if (!container) {
      return noop;
    }
    const rect = getNatualRect(container);
    setStyle({
      width: Math.max(container.scrollWidth, rect.width),
      height: Math.min(container.scrollHeight, rect.height),
    });
    if (opened) {
      return noop;
    }
    const timerId = setTimeout(() => setStyle(defaultStyle));
    return () => clearTimeout(timerId);
  }, [opened, container]);
  useEffect(() => {
    if (style === defaultStyle) {
      return noop;
    }
    const timer = setTimeout(() => setStyle({}), 300);
    return () => clearTimeout(timer);
  }, [style]);
  return (
    <Container
      ref={setContainer}
      style={style}
      className={opened ? 'opened' : ''}
    >
      {children}
    </Container>
  );
};

const getNatualRect = (element: HTMLElement) => {
  const { style } = element;
  const { width, height } = style;
  style.width = style.height = '';
  const rect = element.getBoundingClientRect();
  style.width = width;
  style.height = height;
  return rect;
};

const Container = styled.div`
  overflow: hidden;
  transition-property: width, height, opacity;
  transition-timing-function: ease-in-out, ease-in-out, linear;
  transition-duration: 0.2s, 0.2s, 0.2s;
  transition-delay: 0.2s, 0.2s, 0s;
  opacity: 0;
  overflow: auto;
  &.opened {
    transition-delay: 0s, 0s, 0.2s;
    opacity: 1;
  }
`;

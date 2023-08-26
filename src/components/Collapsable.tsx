import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import type { CSSProperties, PropsWithChildren } from 'react';

export interface CollapsableProps {
  opened?: boolean;
}

const defaultStyle: CSSProperties = { width: 0, height: 0 };

export const Collapsable = ({
  opened,
  children,
}: PropsWithChildren<CollapsableProps>) => {
  const [outerDiv, setOuterDiv] = useState<HTMLDivElement | null>(null);
  const [innerDiv, setInnerDiv] = useState<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<CSSProperties>(defaultStyle);
  useEffect(() => {
    if (innerDiv && outerDiv) {
      if (opened) {
        const w = outerDiv.style.width;
        outerDiv.style.width = 'auto';
        const outerWidth = outerDiv.scrollWidth;
        outerDiv.style.width = w;
        setStyle({
          width: Math.max(innerDiv.scrollWidth, outerWidth),
          height: innerDiv.scrollHeight,
        });
      } else {
        setStyle(defaultStyle);
      }
    }
  }, [opened, outerDiv, innerDiv]);
  return (
    <Outer ref={setOuterDiv} style={style} className={opened ? 'opened' : ''}>
      <Inner
        ref={setInnerDiv}
        className={style === defaultStyle ? '' : 'opened'}
      >
        {children}
      </Inner>
    </Outer>
  );
};

const Outer = styled.div`
  overflow: hidden;
  transition-property: width, height;
  transition-timing-function: ease-in-out, ease-in-out;
  transition-duration: 0.2s, 0.2s;
  transition-delay: 0.2s, 0s;
  &.opened {
    transition-delay: 0s, 0.2s;
  }
`;
const Inner = styled.div`
  width: auto;
  min-width: max-content;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 0.2s;
  transition-delay: 0s;
  &.opened {
    opacity: 1;
    transition-delay: 0.4s;
  }
`;

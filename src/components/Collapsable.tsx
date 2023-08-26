import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import type { CSSProperties, PropsWithChildren } from 'react';

export interface CollapsableProps {
  opened?: boolean;
}

export const Collapsable = ({
  opened,
  children,
}: PropsWithChildren<CollapsableProps>) => {
  const [contentDiv, setContentDiv] = useState<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<CSSProperties>({ width: 0, height: 0 });
  useEffect(() => {
    if (contentDiv) {
      if (opened) {
        setStyle({
          width: contentDiv.scrollWidth,
          height: contentDiv.scrollHeight,
        });
      } else {
        setStyle({ width: 0, height: 0 });
      }
    }
  }, [opened, contentDiv]);
  return (
    <Outer style={style} className={opened ? 'opened' : ''}>
      <Inner ref={setContentDiv} className={opened ? 'opened' : ''}>
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
  width: max-content;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 0.2s;
  transition-delay: 0s;
  &.opened {
    opacity: 1;
    transition-delay: 0.4s;
  }
`;

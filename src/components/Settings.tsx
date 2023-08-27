import { styled } from 'styled-components';
import { MarkersList } from './MarkersList.js';
import { TogglesList } from './TogglesList.js';

export const Settings = () => {
  return (
    <Container>
      <MarkersList />
      <hr />
      <TogglesList />
      <hr />
      <Back href="/">一覧に戻る</Back>
    </Container>
  );
};

const Container = styled.section`
  --padding-h: 8px;
  --padding-v: 8px;
  display: grid;
  grid-auto-flow: row;
  row-gap: var(--padding-v);
  justify-items: start;
  padding-block: var(--padding-v);
  padding-inline: var(--padding-h);
  min-inline-size: 200px;
  overflow-y: auto;
  &::before {
    content: '';
    position: absolute;
    inset-block-start: 0;
    inset-inline: var(--padding-h);
    block-size: 1px;
    background-color: currentColor;
  }
  & > hr {
    inline-size: 100%;
    block-size: 1px;
    background-color: currentColor;
  }
`;

const Back = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

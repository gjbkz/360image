import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { rcMarkers } from '../recoil/Markers.mjs';

export const Settings = () => {
  return (
    <Container>
      <Markers />
      <Back href="/">一覧に戻る</Back>
    </Container>
  );
};

const Container = styled.section`
  display: grid;
  grid-auto-flow: row;
  justify-items: start;
  padding-block: 8px;
  padding-inline: 8px;
  max-inline-size: 90vw;
  max-block-size: 90vh;
`;

const Back = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Markers = () => {
  const markers = useRecoilValue(rcMarkers);
  return (
    <>
      {markers.map((marker, index) => (
        <MarkerButton key={marker.id}>
          ({index + 1}) {marker.text}
        </MarkerButton>
      ))}
    </>
  );
};

const MarkerButton = styled.button`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

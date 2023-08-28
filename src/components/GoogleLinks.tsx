import { styled } from 'styled-components';
import { useGoogleEarthLink, useGoogleMapLink } from '../use/GoogleLink.mjs';
import { Icon } from './Icon.js';

export const GoogleLinks = () => {
  return (
    <LinksDiv>
      <Link
        className="menu-button-bg"
        target="_blank"
        href={useGoogleMapLink()}
      >
        <Icon icon="location_on" size={18} />
        <span>Google Map</span>
        <Icon icon="arrow_outward" size={18} />
      </Link>
      <Link
        className="menu-button-bg"
        target="_blank"
        href={useGoogleEarthLink()}
      >
        <Icon icon="public" size={18} />
        <span>Google Earth</span>
        <Icon icon="arrow_outward" size={18} />
      </Link>
    </LinksDiv>
  );
};

const LinksDiv = styled.div`
  justify-self: center;
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 4px;
`;

const Link = styled.a`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  align-items: center;
  column-gap: 2px;
  padding-block: 2px;
  padding-inline: 4px;
  text-decoration: none;
  & > span {
    margin-block-start: 2px;
  }
`;

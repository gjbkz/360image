import { styled } from 'styled-components';
import { useGoogleEarthLink, useGoogleMapLink } from '../use/GoogleLink.mjs';
import { Icon } from './Icon.js';

export const GoogleLinks = () => {
  return (
    <LinksDiv>
      <Link
        className="menu-button-bg nonpad"
        target="_blank"
        href={useGoogleMapLink()}
      >
        <Icon icon="location_on" size={18} />
        <span>Google Map</span>
        <Icon icon="arrow_outward" size={18} />
      </Link>
      <Link
        className="menu-button-bg nonpad"
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
`;

const Link = styled.a`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  padding-block: 2px;
  padding-inline: 8px;
  text-decoration: none;
  & > span {
    margin-block-start: 2px;
  }
`;

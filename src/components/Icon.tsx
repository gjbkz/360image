import type { SVGAttributes } from 'react';
import type { availableIcons } from '../util/icons.mjs';

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  icon: (typeof availableIcons)[number];
  size?: number;
}

export const Icon = ({ icon, size = 24, ...props }: IconProps) => (
  <svg {...props} width={size} height={size} viewBox="0 0 24 24">
    <use href={`#icon-${icon}`} />
  </svg>
);

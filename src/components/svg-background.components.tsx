import * as React from 'react';
import {Svg, Path} from 'react-native-svg';

interface Properties {
  width?: string;
  height?: string;
  viewBox?: string;
  fill?: string;
}

function SvgComponent(props: Properties) {
  const properties: Properties = {
    width: '100%',
    height: '100%',
    viewBox: '0 0 411 324',
    fill: 'none',
  };

  return (
    <Svg {...properties} {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M-205 252l29-12c28-12 85-36 142-24 58 12 115 60 172 30s114-138 171-144 115 90 172 96 114-78 171-114 114-24 172-30c57-6 114-30 142-42l29-12v324H-205v-72z"
        fill="#0099FF"
      />
    </Svg>
  );
}

export {SvgComponent};

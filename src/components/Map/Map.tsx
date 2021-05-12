import React, {MouseEventHandler} from 'react';
import {ComposableMap, Geographies, Geography, Marker, Point, ProjectionConfig, ZoomableGroup} from 'react-simple-maps';
import {useToken} from '@chakra-ui/react';
import {geoCylindricalStereographic} from 'd3-geo-projection';

/**
 * A topoJSON-compatible dataset
 */
const topoJSON = 'https://unpkg.com/world-atlas/countries-110m.json';

/**
 * Projection
 */
const projection = geoCylindricalStereographic();

/**
 * Projection config
 */
const projectionConfig = {
  scale: 200
} as ProjectionConfig;

interface MapProps
{
  markers: {
    name: string;
    coordinates: Point;
  }[];
  onClick?: MouseEventHandler;
  onMouseEnter?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
}

const Map: React.FC<MapProps> = (props: MapProps) =>
{
  //Get certain values from the current Chakra theme
  const [
    geoFill,
    markerFill
  ] = useToken("colors", [
    "primary.300",
    "secondary.400"
  ]);

  /**
   * Geography styling
   */
  const geoStyle = {
    default: {
      fill: geoFill,
      outline: 'none'
    },
    hover: {
      fill: geoFill,
      outline: 'none'
    },
    pressed: {
      fill: geoFill,
      outline: 'none'
    }
  };

  return (
    <ComposableMap projection={projection} projectionConfig={projectionConfig} height={350}>
      <ZoomableGroup translateExtent={[[-50, -50], [1000, 600]]}>
        <Geographies geography={topoJSON}>
          {({geographies}) => geographies.map(geo =>
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onClick={props.onClick}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              style={geoStyle}
            />
          )}
        </Geographies>

        {props.markers.map(marker =>
          <Marker key={marker.name} coordinates={marker.coordinates}>
            <g fill={markerFill} fillRule="evenodd">
              <path d="M0 0C-3-3-5-6-5-9A1 1 0 015-9C5-6 3-3 0 0ZM0-5.75A1 1 0 000-12A1 1 0 000-5.75Z" />
            </g>
          </Marker>)}
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default Map;

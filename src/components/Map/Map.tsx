/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import {ComposableMap, Geographies, Geography, Marker, Point, ProjectionConfig, ZoomableGroup} from 'react-simple-maps';
import {animated, config, useSpring} from 'react-spring';
import {geoCylindricalStereographic} from 'd3-geo-projection';
import {useToken} from '@chakra-ui/react';

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

/**
 * Map translation bounds
 */
const translateExtend = [
  [-50, -50],
  [1000, 600]
] as [
    [number, number],
    [number, number]
  ];

interface MoveEvent
{
  coordinates: Point;
  zoom: number;
}

interface MapProps
{
  center: Point;
  zoom: number;

  markers: {
    id: string;
    name: string;
    coordinates: Point;
  }[];

  markerSelected: (id: string) => void;

  onMouseEnter?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
}

//Make the zoomable group animated
const AnimatedZoomableGroup = animated(ZoomableGroup);

const Map: React.FC<MapProps> = (props: MapProps) =>
{
  //Get certain values from the current Chakra theme
  const [
    geoFill,
    markerOutline,
    markerFill
  ] = useToken('colors', [
    'primary.300',
    'red.400',
    'red.800'
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

  //Animation state
  const [newCenter, setNewCenter] = useState(props.center);
  const [newZoom, setNewZoom] = useState(props.zoom);
  const [oldCenter, setOldCenter] = useState(props.center);
  const [oldZoom, setOldZoom] = useState(props.zoom);
  const [paused, setPaused] = useState(false);

  //Update state on prop update
  useEffect(() =>
  {
    //Update old transformation with current transformation if unpaused (If paused, the updateAnimation handler takes care of this)
    if (!paused)
    {
      setOldCenter(center as any);
      setOldZoom(zoom as any);
    }

    //Update new transformation with prop transformation
    setNewCenter(props.center);
    setNewZoom(props.zoom);

    //Unpause animations
    setPaused(false);
  }, [props.center, props.zoom]);

  //Update the state when the user manually moves the map
  const updateAnimation = (event: MoveEvent) =>
  {
    //Pause animations
    setPaused(true);

    //Update old transformation with user transformation
    setOldCenter(event.coordinates);
    setOldZoom(event.zoom);
  };

  //Animate state
  const {center, zoom} = useSpring({
    config: config.default,
    from: {
      center: oldCenter,
      zoom: oldZoom
    },
    to: {
      center: newCenter,
      zoom: newZoom
    },
    pause: paused,
    reset: true,
    //Update the state when the animation finishes
    onRest: () =>
    {
      //Update old state with the end state of the animation (So the spring knows where to animate from)
      setOldCenter(center.goal);
      setOldZoom(zoom.goal);
    }
  });

  //Marker selected handler
  const markerSelected = (id: string) => () =>
  {
    //Invoke parent handler
    props.markerSelected(id);
  };

  return (
    <ComposableMap projection={projection} projectionConfig={projectionConfig} height={350}>
      <AnimatedZoomableGroup center={center as any} onMoveEnd={updateAnimation} translateExtent={translateExtend} zoom={zoom}>
        <Geographies geography={topoJSON}>
          {({geographies}) => geographies.map(geo =>
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onMouseEnter={props.onMouseEnter}
              onMouseLeave={props.onMouseLeave}
              style={geoStyle}
            />
          )}
        </Geographies>

        {props.markers.map(marker =>
          <Marker key={marker.name} coordinates={marker.coordinates}>
            <g cursor='pointer' fillRule='evenodd' onClick={markerSelected(marker.id)}>
              <path fill={markerOutline} d='M -6 0 L 0 -10 L 6 0 L -6 0 Z M -3 -2 L 0 -7 L 3 -2 L -3 -2 Z' />
              <path fill={markerFill} d='M -3 -2 L 0 -7 L 3 -2 L -3 -2 Z' />
            </g>
          </Marker>
        )}
      </AnimatedZoomableGroup>
    </ComposableMap>
  );
};

Map.defaultProps = {
  zoom: 3
};

export default Map;

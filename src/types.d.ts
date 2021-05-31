/**
 * @fileoverview TypeScript type augmentation
 */

declare module 'd3-geo-projection'
{
  import {ProjectionFunction} from 'react-simple-maps';

  export function geoCylindricalStereographic(): ProjectionFunction;
}

declare module "*.gql" {
  import {DocumentNode} from "graphql";

  const content: {
    [key: string]: DocumentNode
  };

  export = content;
}
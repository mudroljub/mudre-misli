import type { PlaceCoordinates } from "../types/data";
import styles from "./BirthplaceMap.module.scss";
import { withBasePath } from "../utils/helpers";

interface BirthplaceMapProps {
  coordinates: PlaceCoordinates;
  placeName: string;
}

const MAP_BOUNDS = {
  north: 48,
  south: 29,
  west: -7,
  east: 42.5,
} as const;

export default function BirthplaceMap({
  coordinates,
  placeName,
}: BirthplaceMapProps) {
  const x =
    ((coordinates.long - MAP_BOUNDS.west) /
      (MAP_BOUNDS.east - MAP_BOUNDS.west)) *
    100;
  const y =
    ((MAP_BOUNDS.north - coordinates.lat) /
      (MAP_BOUNDS.north - MAP_BOUNDS.south)) *
    100;

  return (
    <figure className={styles.figure}>
      <div
        className={styles.map}
        role="img"
        aria-label={placeName}
      >
        <img
          className={styles.mapImage}
          src={withBasePath("/images/maps/mediterranean.svg")}
          alt=""
        />
        <span
          className={styles.marker}
          style={{ left: `${x}%`, top: `${y}%` }}
          title={placeName}
        />
      </div>
    </figure>
  );
}

import React, { useEffect, useState } from 'react'
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext'
import useGeolocation from '../hooks/useGeolocation'
import Button from './Button'
import useUrlPosition from '../hooks/useUrlPosition'

export default function Map() {
  const { cities } = useCities()
  const [mapPosition, setMapPosition] = useState([40, 0])
  const [mapLat,mapLng] = useUrlPosition()
  const {
    isLoading: isLoadingPosition,
    position: geoLocaltionPosition,
    getPosition,
  } = useGeolocation()

  // const mapLat = searchParams.get('lat')
  // const mapLng = searchParams.get('lng')

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    },
    [mapLat, mapLng]
  )

  useEffect(
    function () {
      if (geoLocaltionPosition)
        setMapPosition([geoLocaltionPosition.lat, geoLocaltionPosition.lng])
    },
    [geoLocaltionPosition]
  )

  return (
    <div className={styles.mapContainer}>
      {!geoLocaltionPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)

  return null
}

function DetectClick({}) {
  const navigate = useNavigate()

  useMapEvent({
    click: (event) => {
      const { lat, lng } = event.latlng
      navigate(`form?lat=${lat}&lng=${lng}`)
    },
  })
}

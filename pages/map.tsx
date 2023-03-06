import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import * as leaflet from 'leaflet'
import {
    kilamba_viana,
    Dangereux_maianga,
    aeroporto_catete
} from './routes.json'

export function ChangeView({ coords }: any) {
    const map = useMap();
    map.setView(coords, 12);
    return null;
}


export default function Map() {
    const [location, setLocation] = useState({ lat: 0, lng: 0 })
    const [vehicleA, setVehicleA] = useState({ lat: 0, lng: 0 })
    const [vehicleB, setVehicleB] = useState({ lat: 0, lng: 0 })
    const [vehicleC, setVehicleC] = useState({ lat: 0, lng: 0 })
    const [postion, setPosition] = useState(0)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        })
    }, [])

    useEffect(() => {
        setTimeout(() => {

            if (postion >= kilamba_viana.length
                && postion >= Dangereux_maianga.length
                && postion >= aeroporto_catete.length) return

            if (postion < kilamba_viana.length) {
                setVehicleA(kilamba_viana[postion])
            }

            if (postion < Dangereux_maianga.length) {
                setVehicleB(Dangereux_maianga[postion])
            }

            if (postion < aeroporto_catete.length) {
                setVehicleC(aeroporto_catete[postion])
            }

            setPosition(prev => prev + 1)

        }, 1000)
    }, [postion])

    if (!location) return <h1>We dont have access to your location</h1>

    return (
        <MapContainer center={location} zoom={12} style={{ height: '100vh' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location} title='Me' />
            <Marker position={vehicleA} title='Nissan' />
            <Marker position={vehicleB} title='Nissan 2' />
            <Marker position={vehicleC} title='Nissan 2' />

        </MapContainer>
    );
}

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import openrouteservice from 'openrouteservice-js';
import CustomWidth from '../function/CustomWidth';

const ORS_KEY = '5b3ce3597851110001cf6248be24502331b243318274ccf1d117148e'; // Ganti dengan API Key Anda

const redIcon = new L.Icon({
    iconUrl: 'placeholder.png',
    iconSize: [34, 34],
    iconAnchor: [10, 34],
    popupAnchor: [1, -34],
});

const UserLocationMarker = ({ onLocationFound, Destination, type }) => {
    const [carRoute, setCarRoute] = useState([]);
    const [bikeRoute, setBikeRoute] = useState([]);
    const [carInfo, setCarInfo] = useState({ distance: 0, duration: 0 });
    const [bikeInfo, setBikeInfo] = useState({ distance: 0, duration: 0 });
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);
    const map = useMap();

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
        } else {
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            };

            const success = (position) => {
                const { latitude, longitude } = position.coords;
                setPosition([latitude, longitude]);
                map.flyTo([latitude, longitude], 13);
                if (onLocationFound) {
                    onLocationFound([latitude, longitude]);
                }
            };

            const handleError = (err) => {
                switch (err.code) {
                    case err.PERMISSION_DENIED:
                        setError("User denied the request for Geolocation.");
                        break;
                    case err.POSITION_UNAVAILABLE:
                        setError("Location information is unavailable.");
                        break;
                    case err.TIMEOUT:
                        setError("The request to get user location timed out.");
                        break;
                    default:
                        setError("An unknown error occurred.");
                        break;
                }
                console.log(err);
            };

            navigator.geolocation.getCurrentPosition(success, handleError, options);
        }
    }, [map]);

    useEffect(() => {
        if (position && Destination && Destination.latitude && Destination.longitude) {
            fetchRoutes(position, [Destination.latitude, Destination.longitude]);
        }
    }, [position, Destination]);

    const fetchRoutes = (userPosition, destination) => {
        const directionsClient = new openrouteservice.Directions({ api_key: ORS_KEY });

        const carRouteRequest = directionsClient.calculate({
            coordinates: [
                [userPosition[1], userPosition[0]], // User's current coordinates
                [destination[1], destination[0]]  // Destination coordinates
            ],
            profile: 'driving-car',
            format: 'geojson'
        });

        const bikeRouteRequest = directionsClient.calculate({
            coordinates: [
                [userPosition[1], userPosition[0]], // User's current coordinates
                [destination[1], destination[0]]  // Destination coordinates
            ],
            profile: 'cycling-road',
            format: 'geojson'
        });

        Promise.all([carRouteRequest, bikeRouteRequest])
            .then(([carResponse, bikeResponse]) => {
                const carRouteCoordinates = carResponse.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                const carSummary = carResponse.features[0].properties.segments[0];
                setCarRoute(carRouteCoordinates);
                setCarInfo({ distance: carSummary.distance, duration: carSummary.duration });

                const bikeRouteCoordinates = bikeResponse.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                const bikeSummary = bikeResponse.features[0].properties.segments[0];
                setBikeRoute(bikeRouteCoordinates);
                setBikeInfo({ distance: bikeSummary.distance, duration: bikeSummary.duration });
            })
            .catch(err => {
                console.error(err);
            });
    };

    const formatDuration = (duration) => {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
    };

    return (
        <>
            {position !== null && (
                <Marker position={position}>
                    <Popup>You are here</Popup>
                </Marker>
            )}
            {Destination && Destination.latitude && Destination.longitude && (
                <Marker position={[Destination.latitude, Destination.longitude]} icon={redIcon}>
                    <Popup>Destination</Popup>
                </Marker>
            )}
            {carRoute.length > 0 && type === 'car' && (
                <Polyline positions={carRoute} color="blue" />
            )}
            {bikeRoute.length > 0 && type === 'motorcycle' && (
                <Polyline positions={bikeRoute} color="green" />
            )}
            {Destination && (
            <div className="info-box text-black">
                {type === 'car' && (
                <>
                    <h3>Rute Mobil</h3>
                    <p>Jarak: {carInfo.distance / 1000} km</p>
                    <p>Waktu Tempuh: {formatDuration(carInfo.duration)}</p>
                </>
                )}
                {type === 'motorcycle' && (
                <>
                    <h3>Rute Motor</h3>
                    <p>Jarak: {bikeInfo.distance / 1000} km</p>
                    <p>Waktu Tempuh: {formatDuration(bikeInfo.duration)}</p>
                </>
                )}
            </div>
            )}
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}
        </>
    );
};

const Map = ({ onLocationFound, Destination, type }) => {
    const Mobile = CustomWidth() <= 768;
    return (
        <div style={{ position: 'relative' }}>
            <MapContainer center={[-6.402484, 106.794243]} zoom={13} style={{ height: Mobile ? '60vh' : '75vh', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='Map Prototype'
                />
                <UserLocationMarker onLocationFound={onLocationFound} Destination={Destination} type={type}/>
            </MapContainer>
        </div>
    );
};

export default Map;

import { LatLngLiteral } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import locationImg from "/images/location.jpg";
import locationIcon from "/images/icon.png";
import L from "leaflet";
import { useContext } from "react";
import { GlobalContext } from "../../../App";

const customIcon = new L.Icon({
    iconUrl: locationIcon,
    iconSize: [56, 56],
    iconAnchor: [17, 35],
    popupAnchor: [0, -30],
});

const Location = () => {
    const { data } = useContext(GlobalContext);
    const position: LatLngLiteral = { lat: 49.931719, lng: 18.316661 };

    return (
        <div className="w-full h-full flex flex-col gap-[48px]">
            <div className="w-full">
                <div className="relative">
                    <img
                        src={locationImg}
                        alt="Lokalizacja zdjęcie"
                        className="w-full lg:h-[350px] sm:h-[250px] h-[200px] object-cover blur-[3px]"
                    />
                    <div className="absolute z-[50] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="text-[48px] text-white font-extralight tracking-[2px]">
                            {data.location.title.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <span className="text-[42px] tracking-[3px] text-center">
                    {data.location.header}
                </span>
            </div>
            <div className="h-[300px] sm:h-[400px] lg:h-[500px] w-full px-[12px] flex justify-center">
                <MapContainer
                    center={position}
                    zoom={13}
                    className="h-full w-full max-w-[700px]"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position} icon={customIcon}>
                        <Popup>LuxWindows Sp. z o.o.</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default Location;

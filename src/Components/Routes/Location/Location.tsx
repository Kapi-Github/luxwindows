import { LatLngLiteral } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
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
        <div className="w-full h-full flex flex-col gap-[48px] box">
            <div className="w-full relative">
                <div className="absolute top-0 flex justify-center items-center w-full h-full bg-opacity-50 bg-black">
                    <span className="text-white text-[48px] sm:text-[68px] tracking-[4px] font-light">
                        {data.location.title}
                    </span>
                </div>
                <img
                    src={data.location.img}
                    alt={data.location.title}
                    className="w-full object-cover h-[350px]"
                />
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

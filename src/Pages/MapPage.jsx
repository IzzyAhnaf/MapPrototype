import { useState } from "react";
import Map from "../Components/Map"
import CustomWidth from "../function/CustomWidth";
import db from "../function/api";
import { push, ref, set } from "firebase/database";

const MapPages = () => {
    const [Coordinate, setCoordinate] = useState({latitude: null, longitude: null});

    const Mobile = CustomWidth() <= 768;

    const handleLocationFound = (coords) => {
        setCoordinate({latitude: coords[0], longitude: coords[1]});
    };

    const handleSimpan = async () => {
        const timestamp = new Date().toISOString();
        try{   
            await push(ref(db, 'Map'),{
                latitude: Coordinate.latitude,
                longitude: Coordinate.longitude,
                timestamp: timestamp
            }).then(() => {
                alert('Data captured successfully');
            });
        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
            <div className={`flex flex-col items-center h-screen w-full bg-gray-700 text-white py-10 ${Mobile ? 'px-5' : 'px-10'}`}>
                <h1 className="text-2xl font-bold font-montserrat">Map</h1>
                <div className={`${Mobile ? 'w-full my-5' : 'w-5/6 my-10'}`}>
                    <Map onLocationFound={handleLocationFound}/>
                </div>
                <div className={`flex ${Mobile ? 'flex-col' : ''}`}>
                    <p>Capture Coordinate here :</p>
                    <p>[latitude: {Coordinate.latitude}, longitude: {Coordinate.longitude}]</p>
                </div>
                <button className="bg-gray-700 hover:bg-blue-500 border border-2 border-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => handleSimpan()}>Simpan</button>
            </div>
        </>
    )
}

export default MapPages
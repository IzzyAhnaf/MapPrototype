import { useEffect, useState } from "react";
import CustomWidth from "../function/CustomWidth";
import Map from "../Components/Map";
import { get, ref } from "firebase/database";
import db from "../function/api";
import { FaCarSide, FaMotorcycle } from "react-icons/fa6";

const ResultPages = () => {
    const [Coordinate, setCoordinate] = useState({latitude: null, longitude: null});
    const [Destination, setDestination] = useState({latitude: null, longitude: null});
    const [type, setType] = useState('car');
    const [Data, setData] = useState([]);

    const Mobile = CustomWidth() <= 767;

    const handleLocationFound = (coords) => {
        setCoordinate({latitude: coords[0], longitude: coords[1]});
    };

    const handleSetDestination = (coords) => {
        setDestination({latitude: coords[0], longitude: coords[1]});
    };

    const getData = async () => {
        try{
            const snapshot = await get(ref(db, 'Map'));

            if(snapshot.exists()){
                setData(Object.values(snapshot.val()));
                if(Object.values(snapshot.val()).length > 0){
                    setDestination({latitude: Object.values(snapshot.val())[0].latitude, longitude: Object.values(snapshot.val())[0].longitude});
                }
            }

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <div className={`flex flex-col items-center w-full bg-gray-700 text-white py-10 ${Mobile ? 'px-5' : 'px-10'}`}>
                <h1 className="text-2xl font-bold font-montserrat">Result</h1>
                <div className={`flex ${Mobile ? 'flex-col-reverse' : ''} w-full`}>
                    <div className={`${Mobile ? 'w-full my-5' : 'w-5/6 my-10'}`}>
                        <Map onLocationFound={handleLocationFound} Destination={Destination} type={type}/>
                        <div className="flex py-4 space-x-5">
                            <div className={`w-full border border-2 border-white rounded cursor-pointer
                                hover:bg-gray-600 ${type === 'car' ? 'bg-gray-600' : ''}`}
                            onClick={() => setType('car')}>
                                <FaCarSide className="mx-auto my-5" size={50}/>
                            </div>
                            <div className={`w-full border border-2 border-white rounded cursor-pointer
                                hover:bg-gray-600 ${type === 'motorcycle' ? 'bg-gray-600' : ''}`}
                            onClick={() => setType('motorcycle')}>
                                <FaMotorcycle className="mx-auto my-5" size={50}/>
                            </div>
                        </div>
                    </div>
                    <div className={`${Mobile ? 'overflow-x-auto' : 'overflow-y-auto'} text-white my-7 px-3 h-[80%]`}>
                        <ul>
                            {Data.map((item, index) => (
                                <li key={index} className="text-center p-1 rounded bg-gray-800 cursor-pointer my-2"
                                onClick={() => handleSetDestination([item.latitude, item.longitude])}>
                                    <p>Latitude: {item.latitude} </p>
                                    <p>Longitude: {item.longitude}</p>
                                    <p>Timestamp: {item.timestamp}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultPages
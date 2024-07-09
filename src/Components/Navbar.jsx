import { useEffect, useState } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [hide, setHide] = useState(false)

    useEffect(() => {
        const { pathname } = location

        if (matchPath("/MapPrototype", pathname)) {
            setHide(true)
        } else {
            setHide(false)
        }
    }, [location])

    return (
        <div className="flex items-center h-20 bg-gray-700 text-white" style={{ display: hide ? 'none' : 'flex', borderBottom: '1px solid black' }}>
            <div onClick={() => navigate('Map', { replace: true })} className="flex cursor-pointer hover:bg-blue-500 w-full h-full">
                <h1 className="text-3xl font-bold font-montserrat mx-auto my-auto">Map</h1>
            </div>
            <div onClick={() => navigate('Result', { replace: true })} className="flex cursor-pointer hover:bg-blue-500 w-full h-full">
                <h1 className="text-3xl font-bold font-montserrat mx-auto my-auto">Result</h1>
            </div>
        </div>
    )
}

export default Navbar
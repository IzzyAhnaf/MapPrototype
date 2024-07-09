import { useNavigate } from "react-router-dom"

const HomePages = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-col items-center w-full h-screen justify-center bg-gray-700 text-white">
                <h1 className="text-3xl font-bold font-montserrat text-center">Welcome, this is Map Prototype</h1>
                <button className="bg-gray-700 hover:bg-blue-500 border border-2 border-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => navigate('./Map')}>Let's Go</button>
            </div>
        </>
    )
} 

export default HomePages
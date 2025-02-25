import Navbar from "../components/Navbar";


export default function Home() {
    return (
        <body>
            <Navbar />
            <div className="flex flex-col h-screen bg-gradient-to-r from-black to-purple-500 p-6 text-white">
                <p className="text-4xl text-white font-bold text-left px-10 py-5">My contact information</p>
                <div className="mt-5 flex flex-col space-y-4 items-start px-10">
                    <p>Links</p>
                    <a href="https://github.com/Paradrake2" className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600">My GitHub</a>
                    <a href="https://www.linkedin.com/in/leo-goldstein-1396a822a/" className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600">My LinkedIn</a>
                    <p>Information</p>
                    <p>Email: thunderhawk103@gmail.com</p>
                    <p>Phone number: 317-900-9068</p>
                </div>
            </div>
        </body>
    );
}
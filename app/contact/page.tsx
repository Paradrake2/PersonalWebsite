import Navbar from "../components/Navbar";


export default function Home() {
    return (
        <body>
            <Navbar />
            <div className="flex flex-col h-screen bg-gradient-to-r from-blue-800 to-purple-500 p-6 text-white">
                <p className="text-4xl text-white font-bold text-left px-10 py-5">My contact information</p>
                <div className="mt-5 flex flex-col items-left gap-4">
                    <a href="https://github.com/Paradrake2" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">My GitHub</a>
                    <a href="https://www.linkedin.com/in/leo-goldstein-1396a822a/" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">My LinkedIn</a>
                </div>
            </div>
        </body>
    );
  }
  
import Navbar from "../components/Navbar";


export default function Home() {
    return (
        <body>
            <Navbar />
            <div className="flex flex-col h-screen bg-gradient-to-r from-gray-800 to-purple-500 p-6 text-white">
                <p className="text-4xl text-white font-bold text-left px-10 py-5">My Projects</p>
                
                    <a href="https://github.com/Paradrake2" className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-600">Project 1 placeholder</a>
                
        </div>
        </body>
    );
  }
  
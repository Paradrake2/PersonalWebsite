import Link from "next/link";
import Navbar from "../components/Navbar";


export default function Home() {
    return (
        <body>
            <Navbar />
            <div className="flex flex-col h-screen bg-gradient-to-r from-black to-purple-500 p-6 text-white">
                <p className="text-4xl text-white font-bold text-left px-10 py-5">My Projects</p>
                <div className="group w-96 mx-10 bg-black text-white px-6 py-1 rounded-lg transition-all duration-500 hover:bg-gray-600 cursor-pointer">
                    <a href="https://github.com/Paradrake2/PersonalWebsite" className="block w-full">
                    <p className="text-lg font-bold"> Project 1: This Website</p>
                    <p className="mt-2 text-sm max-h-0 opacity-0 group-hover:max-h-40 transition-all duration-300 group-hover:opacity-100">This is my personal portfolio website made with Next.js and Tailwind CSS! Click to view the GitHub Repository.</p>
                    </a>
                </div>
                <br></br>
                <br></br>
                <div className="group w-96 mx-10 bg-black text-white px-6 py-1 rounded-lg transition-all duration-500 hover:bg-gray-600 cursor-pointer">
                    <a href="https://github.com/Paradrake2/TextAdventureGame" className="block w-full">
                    <p className="text-lg font-bold"> Project 2: Text Adventure game</p>
                    <p className="mt-2 text-sm max-h-0 opacity-0 group-hover:max-h-40 transition-all duration-300 group-hover:opacity-100">This is going to be a playable text adventure fantasy game.</p>
                    </a>
                </div>
                <br></br>
                <br></br>
                <div className="px-6 py-1 rounded-lg w-auto mx-10 hover:text-gray-300">
                    <Link href="/projects/textgame" className=""> Text Game</Link>
                </div>
            </div>
        </body>
    );
}
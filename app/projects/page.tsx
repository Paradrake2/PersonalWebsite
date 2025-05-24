import Link from "next/link";
import Navbar from "../components/Navbar";


export default function Home() {
    return (
        <body>
            <Navbar />
            <div className="flex flex-col h-screen bg-gradient-to-r from-black to-purple-500 p-6 text-white">
                <p className="text-4xl text-white font-bold text-left px-10 py-5">My Projects</p>
                <div className="w-96 mx-10 bg-black text-white px-6 py-1 rounded-lg transition-all duration-500 hover:bg-gray-600 cursor-pointer">
                    <a href="https://github.com/Paradrake2/PersonalWebsite" className="block w-full">
                        <div className="group">
                            <p className="text-lg font-bold"> Project 1: This Website</p>
                            <p className="mt-2 text-sm max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 overflow-hidden transition-all duration-300">
                                This is my personal portfolio website made with Next.js and Tailwind CSS! Click to view the GitHub Repository.
                            </p>
                        </div>
                    </a>
                </div>
                <br></br>
                <div className="group w-96 mx-10 bg-black text-white px-6 py-1 rounded-lg transition-all duration-500 hover:bg-gray-600 cursor-pointer">
                    <a href="https://github.com/Paradrake2/TextAdventureGame" className="block w-full">
                        <div className="group">
                            <p className="text-lg font-bold"> Project 2: Text Adventure game</p>
                            <p className="mt-2 text-sm max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 overflow-hidden transition-all duration-300">This is going to be a playable text adventure fantasy game. Currently on indefinite hiatus.</p>
                        </div>
                    </a>
                </div>
                <br></br>
                <div className="group w-96 mx-10 bg-black text-white px-6 py-1 rounded-lg transition-all duration-500 hover:bg-gray-600 cursor-pointer">
                    <a href="https://github.com/Paradrake2/TuringMachineProject" className="block w-full">
                        <div className="group">
                            <p className="text-lg font-bold"> Project 3: Turing machine simulator</p>
                            <p className="mt-2 text-sm max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 overflow-hidden transition-all duration-300">This is just a simple turing machine simulator I made to help myself understand how they work for school.</p>
                        </div>
                    </a>
                </div>
                <br></br>
                <div className="group w-96 mx-10 bg-black text-white px-6 py-1 rounded-lg transition-all duration-500 hover:bg-gray-600 cursor-pointer">
                    <a href="https://github.com/Paradrake2/CraftingDungeonCrawler" className="block w-full">
                        <div className="group">
                            <p className="text-lg font-bold"> Project 4: Unity game</p>
                            <p className="mt-2 text-sm max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 overflow-hidden transition-all duration-300">This is the extended version of the text adventure game, made in an actual game engine. This repo contains the assets for the game.</p>
                        </div>
                    </a>
                </div>
                <br></br>
                <div className="px-6 py-1 rounded-lg w-auto mx-10 hover:text-gray-300">
                    <Link href="/projects/textgame" className=""> Text Game</Link>
                </div>
                <div className="px-6 py-1 rounded-lg w-auto mx-10 hover:text-gray-300">
                    <Link href="/projects/turingmachine" className=""> Turing machine simulator</Link>
                </div>
            </div>
        </body>
    );
}

import Navbar from "../../components/Navbar";

export default function Home() {
    return (
        <body>
            <Navbar />
            <div className="flex flex-col h-screen bg-gradient-to-r from-black to-purple-500 p-6 text-white">
                <p className="text-4xl text-white font-bold text-left px-10 py-5">Vector Warden</p>
                <p className="mt-2 text-sm max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 overflow-hidden transition-all duration-300">This is my original game called Vector Warden. It is a top down 2d shooter roguelite.</p>
            </div>
            <iframe
                width="560"
                height="315"
                src="https://youtu.be/4J13q0AFJQM"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </body>
    )
}
import Navbar from "../../components/Navbar";

export default function Home() {
    return (
        <body>
            <Navbar />
            <div className="bg-black">
                <p className="text-4xl text-white font-bold text-left px-10 py-5">Capstone Project</p>
            </div>
            <div className="flex flex-col min-h-screen bg-gradient-to-r from-black to-purple-500 p-10 text-white">
                <p className="text-lg mb-8">Download my capstone project below.</p>
                <a
                    href="/capstone.pdf"
                    download
                    className="w-fit bg-black text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:bg-gray-600"
                >
                    Download Capstone Project
                </a>
            </div>
        </body>
    );
}

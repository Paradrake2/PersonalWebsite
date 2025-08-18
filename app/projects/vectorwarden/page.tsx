import Navbar from "../../components/Navbar";

export default function Home() {
    return (
        <body>
            <Navbar />
            <div className="bg-black">
                <p className="text-4xl text-white font-bold text-left px-10 py-5">Vector Warden</p>
                <p className="text-white">This is my original game called Vector Warden. It is a top down 2d shooter roguelite.</p>
            </div>
            <div className="flex flex-row flex-wrap h-screen bg-gradient-to-r from-black to-purple-500 p-6 text-white">
<br></br>
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/4J13q0AFJQM"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/pMAvlBDtSzE"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/TstHIE_CDjY"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/QYlMMBdBHNo"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>
            </div>
        </body>
    )
}
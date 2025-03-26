import Navbar from "../components/Navbar";


export default function Home() {
  return (
    <body>
      <Navbar />
      <div className="flex flex-col h-screen bg-gradient-to-r from-black to-purple-500 p-6 text-white">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <h1 className="text-4xl font-bold">Hello, I'm Leo Goldstein </h1>
        <p className="mt-2 text-lg">Aspiring Software Developer</p>
        <p className="mt-2 text-lg">This website is under construction right now</p>
        <div className="mt-5 flex flex-col items-center gap-4">
          <a href="/projects" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            View My Projects
          </a>
          
          <a href="/contact" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"> Contact Me</a>
        </div>
      </div>
    </body>
  );
}

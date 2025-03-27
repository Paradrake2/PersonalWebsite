import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <body>
            <Navbar />
            <div className="flex flex-col h-screen bg-gradient-to-r from-black to-purple-500 p-6 text-white">
                <div className="text-4xl text-white px-10 py-5 max-w-2xl">
                    <p className="font-bold">Who am I?</p>
                    <p className="text-lg leading-relaxed">My name is Leo Goldstein. I was born in Maryland and moved to Indiana when I was very young. I'm a student at Purdue Indianapolis pursuing a bachelor's in Computer Science. In my free time, I love to play video games such as Minecraft. I've always loved creating things, whether it be an enormous building online or with LEGOs as a kid. I also take time to hone my skills through various online courses. My eventual career goal is to become a software developer. </p>
                    <br></br>
                    <p className="text-lg leading-relaxed">The majority of my experience with computer science is through extracurriculars and projects, such as this site. I am proficient in Java, C#, C++, HTML, Next.js, TailwindCSS, and more. I have also dabbled with game development in Unity Engine.</p>
                </div>
            </div>
        </body>
    )
}
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Profile Image / Home Link*/}
                <Link href="/" className="text-2xl font-bold">Home Page</Link>
                <div className="flex space-x-6">
                    <Link href="/projects" className="hover:text-blue-400">My Projects</Link>
                    <Link href="/contact" className="hover:text-blue-400">Contact Me</Link>
                    <Link href="/aboutme" className="hover:text-blue-400">About Me</Link>
                    <Link href="/certifications" className="hover:text-blue-400">Certifications</Link>
                </div>
            </div>
        </nav>
    )
}
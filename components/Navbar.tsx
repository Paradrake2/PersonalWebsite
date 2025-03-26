import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white py-4 px-8 w-full top-0 left-0">
            <div className="max-auto mx-auto flex items-center">
                {/* Left: Home Link */}
                <div className="flex-none">
                    <Link href="/" className="text-2xl font-bold">Home Page</Link>
                </div>

                {/* Right: Navigation Links */}
                <div className="ml-auto flex space-x-6">
                    <Link href="/projects" className="hover:text-blue-400">My Projects</Link>
                    <Link href="/contact" className="hover:text-blue-400">Contact Me</Link>
                    <Link href="/aboutme" className="hover:text-blue-400">About Me</Link>
                    <Link href="/certifications" className="hover:text-blue-400">Certifications</Link>
                </div>
            </div>
        </nav>
    );
}

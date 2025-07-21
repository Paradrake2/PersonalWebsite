import Navbar from "../components/Navbar";


export default function Home() {
  return (
    <body>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <div>
          <h1>VDHL/Verilog Certification from AMD</h1>
        </div>
      </div>
    </body>
  );
}

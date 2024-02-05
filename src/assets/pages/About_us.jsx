import { FaLaptopCode, FaServer, FaLightbulb, FaUsers, FaChartBar } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AboutUs() {
    return (
        <>
            <div className="bg-[#FAF0E2] min-h-screen">
                <Navbar />

                <div className="container mx-auto mt-8">
                    <h1 className="text-4xl text-[#6f747e] font-bold mb-4">Welcome to Our Team!</h1>
                    <p className="text-gray-700 mb-8">
                        We are a passionate team working hard to deliver incredible solutions.
                    </p>

                    <div className="flex flex-wrap justify-around items-center">
                        {/* Frontend Section */}
                        <div className="text-center w-full md:w-1/2 lg:w-1/4 mb-8">
                            <FaLaptopCode className="text-5xl text-blue-500 mb-2 mx-auto" />
                            <h2 className="text-xl text-[#6f747e] font-semibold mb-2">Yeray Santana Curbelo</h2>
                            <p className="text-gray-600">Frontend Developer</p>
                        </div>

                        {/* Backend Section */}
                        <div className="text-center w-full md:w-1/2 lg:w-1/4 mb-8">
                            <FaServer className="text-5xl text-green-500 mb-2 mx-auto" />
                            <h2 className="text-xl text-[#6f747e] font-semibold mb-2">Ivan Da silva Martín</h2>
                            <p className="text-gray-600">Backend Developer</p>
                        </div>

                        {/* Values Section */}
                        <div className="text-center w-full mb-8">
                            <FaLightbulb className="text-5xl text-yellow-500 mb-2 mx-auto" />
                            <h2 className="text-xl text-[#6f747e] font-semibold mb-2">Our Values</h2>
                            <p className="text-gray-600">
                                In our company, we value innovation, integrity, and dedication. We work together to build a collaborative and successful environment.
                            </p>
                        </div>

                        {/* Collaboration Section */}
                        <div className="text-center w-full md:w-1/2 lg:w-1/4 mb-8">
                            <FaUsers className="text-5xl text-indigo-500 mb-2 mx-auto" />
                            <h2 className="text-xl text-[#6f747e] font-semibold mb-2">Collaborators</h2>
                            <p className="text-gray-600">
                                Our team consists of talented and passionate individuals collaborating to achieve common goals.
                            </p>
                        </div>

                        {/* Analytics Section */}
                        <div className="text-center w-full md:w-1/2 lg:w-1/4 mb-8">
                            <FaChartBar className="text-5xl text-purple-500 mb-2 mx-auto" />
                            <h2 className="text-xl text-[#6f747e] font-semibold mb-2">Analytics Team</h2>
                            <p className="text-gray-600">
                                We use data and analysis to make informed decisions and continuously improve.
                            </p>
                        </div>

                        {/* Commitment Section */}
                        <div className="text-center w-full mb-8">
                            <FaLightbulb className="text-5xl text-yellow-500 mb-2 mx-auto" />
                            <h2 className="text-xl text-[#6f747e] font-semibold mb-2">Commitment to Excellence</h2>
                            <p className="text-gray-600">
                                We strive for excellence in every project, constantly seeking improvement.
                            </p>
                        </div>

                        {/* Innovation Section */}
                        <div className="text-center w-full md:w-1/2 lg:w-1/4 mb-8">
                            <FaLightbulb className="text-5xl text-yellow-500 mb-2 mx-auto" />
                            <h2 className="text-xl text-[#6f747e] font-semibold mb-2">Innovation Culture</h2>
                            <p className="text-gray-600">
                                We foster creativity and innovation in all facets of our work.
                            </p>
                        </div>

                        {/* Work-Life Balance Section */}
                        <div className="text-center w-full md:w-1/2 lg:w-1/4 mb-8">
                            <FaUsers className="text-5xl text-indigo-500 mb-2 mx-auto" />
                            <h2 className="text-xl text-[#6f747e] font-semibold mb-2">Work-Life Balance</h2>
                            <p className="text-gray-600">
                                We promote a healthy balance between work and personal life for everyone s well-being.
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default AboutUs;


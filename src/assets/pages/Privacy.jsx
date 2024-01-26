import Navbar from "./Navbar";
import Footer from "./Footer";

function Privacy() {
    return (
        <>
            <div className="bg-[#FAF0E2] min-h-screen">
                <Navbar />

                <div className="container mx-auto mt-12">
                    <h1 className="text-4xl text-[#6f747e]  font-bold mb-4">Privacy Policy</h1>

                    <p className="text-gray-700 mb-8">
                        Welcome to our Privacy Policy page. This page informs you of our policies regarding the collection, use, and disclosure of personal information we receive from users of the site.
                    </p>

                    <h2 className="text-2xl text-[#6f747e] font-semibold mb-2">Information Collection and Use</h2>

                    <p className="text-gray-700 mb-4">
                        While using our site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your name, email address, postal address, and phone number.
                    </p>

                    <h2 className="text-2xl text-[#6f747e] font-semibold mb-2">Log Data</h2>

                    <p className="text-gray-700 mb-4">
                        Like many site operators, we collect information that your browser sends whenever you visit our site. This log data may include information such as your computer s Internet Protocol IP address, browser type, browser version, the pages of our site that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
                    </p>

                    <h2 className="text-2xl text-[#6f747e] font-semibold mb-2">Cookies</h2>

                    <p className="text-gray-700 mb-4">
                        Cookies are files with small amounts of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer s hard drive.
                    </p>

                    <h2 className="text-2xl text-[#6f747e] font-semibold mb-2">Use of Data</h2>

                    <p className="text-gray-700 mb-4">
                        We use the collected data for various purposes, including but not limited to:
                    </p>

                    <ul className="list-disc text-gray-700 pl-8 mb-4">
                        <li>Providing and maintaining the site</li>
                        <li>Improving the site</li>
                        <li>Monitoring the usage of the site</li>
                        <li>Sending you newsletters, if you have subscribed</li>
                    </ul>

                    <h2 className="text-2xl text-[#6f747e] font-semibold mb-2">Disclosure of Data</h2>

                    <p className="text-gray-700 mb-4">
                        We may disclose personal information in good faith when required by law or in response to valid requests by public authorities.
                    </p>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default Privacy;

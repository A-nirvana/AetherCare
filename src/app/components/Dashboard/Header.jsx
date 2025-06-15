import { Oleo_Script } from 'next/font/google';
const oleo = Oleo_Script({
  subsets: ['latin'],
  weight: ['400', '700'], // Use the weights you need
});

const Header = () => {
    return (
      <div className="flex justify-between items-start mb-6">
        <div className="flex space-x-5">
          <img src="https://res.cloudinary.com/dmhbmurzw/image/upload/v1748928745/Ellipse_1_ct2kb9.png" alt="Image" />
          <div>
          <h1 className={`${oleo.className} text-2xl font-semibold text-gray-800`}>Good Day, AetherCare</h1>
          <p className="text-sm text-gray-500 mt-1">Medical ID: 2025191098472</p>
          </div>
        </div>
        {/* {`${montserrat.className} text-2xl font-semibold text-gray-800`} */}
        <input
          type="text"
          placeholder="Search Something"
          className="px-4 py-2 border rounded-lg text-sm shadow-md outline-none"
        />
      </div>
    );
  };

  export default Header;

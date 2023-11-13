import React from 'react';
import logo from './AppLogo.png'
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center h-full">
        <div className="flex items-center space-x-4">
          <img
            src={logo}
            alt="Your Logo"
            className=" w-12 rounded-full"
          />
          <p className="text-xl font-semibold">E-Store</p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Get to Know Us</h4>
          <ul className="space-y-2">
            <li>
              <p >About Us</p>
            </li>
            <li>
              <p >Careers</p>
            </li>
            <li>
              <p >Press Releases</p>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Connect with Us</h4>
          <ul className="space-y-2">
            <li>
              <p >Facebook</p>
            </li>
            <li>
              <p >Twitter</p>
            </li>
            <li>
              <p >Instagram</p>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Make Money with Us</h4>
          <ul className="space-y-2">
            <li>
              <p href="#">Sell on YourSite</p>
            </li>
            <li>
              <p href="#">Advertise Your Products</p>
            </li>
            <li>
              <p href="#">Become an Affiliate</p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

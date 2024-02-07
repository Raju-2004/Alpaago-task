import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white p-8 rounded-t-3xl">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          
          <h2 className="text-2xl mb-2">Contact information</h2>
          <div className="mb-2">
            
            Call us anytime -
            <a href="tel:+9173977460454" className="underline">
              +9173977460454
            </a>
          </div>
          <div>
            
            <a href="mailto:contact@alpaago.com" className="underline">
              contact@alpaago.com
            </a>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          
          <h2 className="text-2xl mb-2">Address</h2>
          <div>
            
            No 1104, 1st Main Rd, Stage I, Kengeri Satellite Town, <br />
            Bengaluru, Karnataka 560060
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        
        <p>&copy; 2023 Alpaago All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;

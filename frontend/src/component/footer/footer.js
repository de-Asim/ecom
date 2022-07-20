import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <div>
      <div className="footer1">
        <div className="footer1-content">
          <div className="footer1-content-heading">About</div>
          <ul className="footer1-content-text">
            <li>
              <Link to={'/about'}>About Us</Link>
            </li>
            <li>
              <Link to={'/contact'}>Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="footer1-content">
          <div className="footer1-content-heading">Policy</div>
          <ul className="footer1-content-text">
            <li>
              <a href="/#">Return policy</a>
            </li>
            <li>
              <a href="/#">Cancellation policy</a>
            </li>
            <li>
              <a href="/#">privacy</a>
            </li>
          </ul>
        </div>
        <div className="footer1-content">
          <div className="footer1-content-heading">Mail Us</div>
          <div className="footer1-content-text">
          Asim Kumar De, A1, Ashroy Apartment, Dhalipara, Kestopur, New Town, Kolkata - 700102, West Bengal, India
          </div>
        </div>
        <div className="footer1-content">
          <div className="footer1-content-heading">Address</div>
          <div className="footer1-content-text">
            Asim Kumar De, A1, Ashroy Apartment, Dhalipara, Kestopur, New Town, Kolkata - 700102, West Bengal, India<br /> CIN Fake : T53506KF2022PTC0000000
            <br /> Mobile: +91 7718243653
          </div>
        </div>
      </div>
      <div className="footer2">
          <span>
              &copy;2021 by dekart.com
          </span>
          <span>
              proudly created by ASIM
          </span>
      </div>
    </div>
  );
}

export default Footer;

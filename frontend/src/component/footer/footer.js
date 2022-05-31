import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div>
      <div className="footer1">
        <div className="footer1-content">
          <div className="footer1-content-heading">About</div>
          <ul className="footer1-content-text">
            <li>
              <a href="">About Us</a>
            </li>
            <li>
              <a href="">Contact Us</a>
            </li>
            <li>
              <a href="">Career</a>
            </li>
          </ul>
        </div>
        <div className="footer1-content">
          <div className="footer1-content-heading">Help</div>
          <ul className="footer1-content-text">
            <li>
              <a href="">payment</a>
            </li>
            <li>
              <a href="">refund</a>
            </li>
            <li>
              <a href="">cancellation</a>
            </li>
            <li>
              <a href="">misc</a>
            </li>
          </ul>
        </div>
        <div className="footer1-content">
          <div className="footer1-content-heading">Policy</div>
          <ul className="footer1-content-text">
            <li>
              <a href="">Return policy</a>
            </li>
            <li>
              <a href="">Cancellation policy</a>
            </li>
            <li>
              <a href="">privacy</a>
            </li>
          </ul>
        </div>
        <div className="footer1-content">
          <div className="footer1-content-heading">Mail Us</div>
          <div className="footer1-content-text">
            Flipkart Internet Private Limited, Buildings Alyssa, Begonia & Clove
            Embassy Tech Village, Outer Ring Road, Devarabeesanahalli Village,
            Bengaluru, 560103, Karnataka, India
          </div>
        </div>
        <div className="footer1-content">
          <div className="footer1-content-heading">Address</div>
          <div className="footer1-content-text">
            Flipkart Internet Private Limited, Buildings Alyssa, Begonia & Clove
            Embassy Tech Village, Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103, Karnataka, India <br /> CIN : U51109KA2012PTC066107
            <br /> Telephone: 1800 202 9898
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

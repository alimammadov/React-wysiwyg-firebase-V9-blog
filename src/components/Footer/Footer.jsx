import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footerWrapper">
      <div className="f-b">
        <nav>
          <ul>
            <li>
              <Link to={"/post/H9hNO0a4Njgs2imFkeQ4O"}>Haqqında</Link>
            </li>
            <li>
              <Link to="#">Məxfilik Şərtləri</Link>
            </li>
            <li>
              <Link to="#">Əlaqə</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="f-b"><h1>Azerbaycanlılar</h1></div>
      <div className="f-b">© {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Footer;

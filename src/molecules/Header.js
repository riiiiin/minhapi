import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../firebase';


function Header() {
    const navigate = useNavigate();

    function handleLogout() {
        auth.signOut();
        navigate('/signin');
    };
    function handleProfile() {
        navigate('/profile');
    };

  return (
    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <Link to="/">
        <img style={{width: "100px"}} src="/images/みんはぴ.png" />
      </Link>
      <div>
        <button style={{border: "none", backgroundColor: "white"}} onClick={handleProfile}>
            <img style={{width: "auto"}} src="/images/person_filled.svg" />
        </button>
        <button style={{border: "none", backgroundColor: "white"}} onClick={handleLogout}>
            <img style={{width: "auto"}} src="/images/signoutsvg.svg" />
        </button>
      </div>
    </div>
  );
}

export default Header;

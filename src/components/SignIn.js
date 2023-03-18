import React, { useState } from "react";
import { Button } from "@mui/material";
import firebase from "firebase/compat/app";
import { auth } from "../firebase.js";
import { Link, useNavigate } from "react-router-dom";
import '../App.css';
import { async } from "@firebase/util";


function SignIn() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    async function handleSubmit (event) {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await auth.signInWithEmailAndPassword(email.value, password.value);
            navigate('/');
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };
    return (
        <div style={{marginTop: "50px"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent:"center"}}>
                <img style={{marginRight: "14px"}} src="/images/icon.png" />
                <img src="/images/みんはぴ.png" />
            </div>
            {error && <p style={{color: "red"}}>{error}</p>}
            <form style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px"}} onSubmit={handleSubmit}>
                <div style={{marginTop: "30px", width: "70%"}}>
                    <div style={{marginBottom: "20px", fontSize: "15px"}}>メールアドレス</div>
                    <input style={{border: "none", fontSize: "15px", borderBottom: "1px solid black", width: "100%"}} name="email" type="email" placeholder="email" />
                </div>
                <div style={{marginTop: "30px", width: "70%"}}>
                    <div style={{marginBottom: "20px", fontSize: "15px"}}>パスワード</div>
                    <input style={{border: "none", fontSize: "15px", borderBottom: "1px solid black", width: "100%"}} name="password" type="password" />
                </div>
                <div style={{marginTop: "60px"}}>
                    <button style={{borderRadius: "50px", border: "3px solid black", padding: "10px 100px", backgroundColor: "#FBD700", fontWeight: "bold", fontSize: "18px"}}>ログイン</button>
                </div>
            </form>
            <Link to="/signup">
                <div style={{marginTop: "60px", textAlign: "center", fontSize: "14px", color: "black"}}>ユーザー登録はこちら</div>
            </Link>
        </div>
    );
}

export default SignIn;
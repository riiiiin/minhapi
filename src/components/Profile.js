import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../AuthContext';
import { db } from '../firebase';
import Header from "../molecules/Header";
import TopContent from "../molecules/TopContent";
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [data, setData] = useState();
    const [name, setName] = useState();
    const [img, setImg] = useState();
    const [birth, setBirth] = useState();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        const getDocs = async() => {
            try {
                const usersRef = doc(db, 'users', user.uid);
                getDoc(usersRef).then((doc) => {
                    setData(doc.data())
                    setName(doc.data()["name"])
                    setImg(doc.data()["iconUrl"])
                    setBirth(doc.data()["birthDay"])
                    console.log(doc.data());
                })
            } catch (error) {
                console.log(error);
            }
        }
        if (user) {
            getDocs();
            console.log(user)
        }
    }, [user]);

    function handleClick() {
        navigate('/editprofile');
    }

  return (
    <div>
        <Header />
        <TopContent pageName="profile" />
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <div style={{marginTop: "30px", width: "100px", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #D9D9D9", borderRadius: "50%"}}>
                <img style={{height: "80%"}} src={img} />
            </div>
            <div style={{marginTop: "30px", width: "70%"}}>
                <div style={{marginBottom: "10px", fontSize: "13px"}}>ニックネーム</div>
                <div style={{border: "none", fontSize: "20px", borderBottom: "1px solid black", width: "100%"}}>
                    {name}
                </div>
            </div>
            <div style={{marginTop: "30px", width: "70%"}}>
                <div style={{marginBottom: "10px", fontSize: "13px"}}>メールアドレス</div>
                <div style={{border: "none", fontSize: "20px", borderBottom: "1px solid black", width: "100%"}}>
                    {user.email}
                </div>
            </div>
            <div style={{marginTop: "30px", width: "70%"}}>
                <div style={{marginBottom: "10px", fontSize: "13px"}}>誕生日</div>
                <div style={{border: "none", fontSize: "20px", borderBottom: "1px solid black", width: "100%"}}>
                    {birth}
                </div>
            </div>
            <div style={{marginTop: "60px", textAlign: "center"}}>
                <button onClick={handleClick} style={{borderRadius: "50px", border: "3px solid black", padding: "10px 100px", backgroundColor: "#FBD700", fontWeight: "bold", fontSize: "18px"}}>編集する</button>
            </div>
        </div>
    </div>
  );
}

export default Profile;

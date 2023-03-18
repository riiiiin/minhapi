import React, { useState, useEffect } from 'react';
import Header from "../molecules/Header";
import TopContent from "../molecules/TopContent";
import { useAuthContext } from '../AuthContext';
import { db, auth } from "../firebase";
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const [iconUrl, setIconUrl] = useState("/images/fish.svg");
    const [nicname, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [data, setData] = useState();
    const { user } = useAuthContext();
    const usersRef = db.collection('users').doc(user.uid);
    const navigate = useNavigate();

    useEffect(() => {
        const getDocs = async() => {
            await usersRef.get().then((doc) => {
                console.log(doc.data());
                setData(doc.data());
            })
        }
        getDocs();
        if (data != undefined) {
            setName(data["name"]);
            setBirth(data["birthDay"]);
            setIconUrl(data["iconUrl"])
        }
    }, [user]); 

    function handleSubmit (event) {
        event.preventDefault();

        usersRef.get().then(async (docSnapshot) => {
            if (!docSnapshot.exists) {
                try {
                    await usersRef.set({
                        name: nicname,
                        iconUrl: iconUrl,
                        birthDay: birth.slice(5),
                        uid: user.uid,
                    })
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await usersRef.update({
                        name: nicname,
                        iconUrl: iconUrl,
                        birthDay: birth.slice(5),
                        uid: user.uid,
                    })
                } catch (error) {
                    console.log(error);
                }
            }
        })
        navigate('/profile');
    }

    let boxStyle = {
        boxShadow: "0px 0px 3px rgba(0, 0, 0, .3)",
        borderRadius: "50%", 
        width: "70px", 
        height: "70px", 
        display: "flex", 
        justifyContent: "center", 
        textAlign: "center"
    }
    let selectedBoxStyle = {
        boxShadow: "0px 0px 3px #FBD700",
        borderRadius: "50%", 
        width: "70px", 
        height: "70px", 
        display: "flex", 
        justifyContent: "center", 
        textAlign: "center"
    }

    return (
        <div>
            <Header />
            <TopContent pageName="editProfile" />
            <form onSubmit={handleSubmit} style={{margin: "40px 20px"}}>
                <div style={{fontSize: "15px", margin: "20px 0"}}>アイコンの選択</div>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <div style={iconUrl == "/images/fish.svg" ? selectedBoxStyle : boxStyle} onClick={() => {setIconUrl("/images/fish.svg")}}>
                        <img style={{width: "70%"}} src="/images/fish.svg" />
                    </div>
                    <div style={iconUrl == "/images/pengin.svg" ? selectedBoxStyle : boxStyle} onClick={() => {setIconUrl("/images/pengin.svg")}}>
                        <img style={{width: "35px"}} src="/images/pengin.svg" />
                    </div>
                    <div style={iconUrl == "/images/bird.svg" ? selectedBoxStyle : boxStyle} onClick={() => {setIconUrl("/images/bird.svg")}}>
                        <img style={{width: "40px"}} src="/images/bird.svg" />
                    </div>
                    <div style={iconUrl == "/images/tallcat.svg" ? selectedBoxStyle : boxStyle} onClick={() => {setIconUrl("/images/tallcat.svg")}}>
                        <img style={{width: "30px"}} src="/images/tallcat.svg" />
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "space-around", marginTop: "10px"}}>
                    <div style={iconUrl == "/images/risu.svg" ? selectedBoxStyle : boxStyle} onClick={() => {setIconUrl("/images/risu.svg")}}>
                        <img style={{width: "40px"}} src="/images/risu.svg" />
                    </div>
                    <div style={iconUrl == "/images/dog.svg" ? selectedBoxStyle : boxStyle} onClick={() => {setIconUrl("/images/dog.svg")}}>
                        <img style={{width: "35px"}} src="/images/dog.svg" />
                    </div>
                    <div style={iconUrl == "/images/cat.svg" ? selectedBoxStyle : boxStyle} onClick={() => {setIconUrl("/images/cat.svg")}}>
                        <img style={{width: "40px"}} src="/images/cat.svg" />
                    </div>
                    <div style={iconUrl == "/images/rabbit.svg" ? selectedBoxStyle : boxStyle} onClick={() => {setIconUrl("/images/rabbit.svg")}}>
                        <img style={{width: "30px"}} src="/images/rabbit.svg" />
                    </div>
                </div>
                <div style={{fontSize: "15px", margin: "40px 0"}}>ニックネーム</div>
                <div style={{textAlign: "center"}}>
                    <input style={{border: "none", fontSize: "15px", borderBottom: "1px solid black", width: "80%", margin: "0 auto"}} name="name" type="text" onChange={(event) => setName(event.currentTarget.value)} />
                </div>
                <div style={{fontSize: "15px", margin: "40px 0"}}>誕生日</div>
                <div style={{textAlign: "center"}}>
                    <input style={{border: "none", fontSize: "15px", borderBottom: "1px solid black", width: "80%", margin: "0 auto"}} name="birth" type="date" onChange={(event) => setBirth(event.currentTarget.value)} />
                </div>
                <div style={{marginTop: "60px", textAlign: "center"}}>
                    <button style={{borderRadius: "50px", border: "3px solid black", padding: "10px 100px", backgroundColor: "#FBD700", fontWeight: "bold", fontSize: "18px"}}>保存する</button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;

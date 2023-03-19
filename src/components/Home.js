import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';
import { db } from "../firebase";
import Header from '../molecules/Header';
import TopContent from '../molecules/TopContent';

function Home() {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const usersRef = db.collection('users').doc(user.uid);
    const [messages, setMessages] = useState([]);
    const [receiveMessages, setReceive] = useState([]);

    var today = new Date(),
    date = ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);

    useEffect(() => {
        if (!user) {
            navigate('/signin');
        } else {
            usersRef.get().then((docSnapshot) => {
                if (!docSnapshot.exists) {
                    navigate('/editProfile');
                } else {
                    setLoading(false);
                    db.collection("users")
                    .where("birthDay", "==", date.toString())
                    .onSnapshot((snapshot) => {
                        setMessages(snapshot.docs.map((doc) => doc.data()));
                    })
                    // db.collection("room")
                    // .where("birthDay", "==", date.toString())
                    // .onSnapshot((snapshot) => {
                    //     setMessages(snapshot.docs.map((doc) => doc.data()));
                    // })
                }
            })
        }
    }, []); 

    if (loading) {
        return (
            <div>
                loading...
            </div>
        );
    } else {
        return (
            <div>
                <Header />
                <TopContent pageName="home" />
                <div>
                    <div style={{margin: "20px", fontSize: "15px"}}>今日が誕生日の人</div>
                    <div style={{margin: "20px"}}>
                        {messages.map(({ id, name, uid, iconUrl}) => (
                            <div onClick={()=> navigate('/chat', { state: { id: uid , name: name} })} key={id} style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <p>{name}</p>
                                <img src="/images/arrow_forward_ios.svg" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

}

export default Home;

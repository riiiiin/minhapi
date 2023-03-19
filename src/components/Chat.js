import React, { useEffect, useState } from 'react';
import SignOut from './SignOut';
import Header from '../molecules/Header';
import SendMessage from './SendMessage';
import { db } from "../firebase";
import TopContent from '../molecules/TopContent';
import { useLocation } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';
import { doc, getDoc } from 'firebase/firestore';


function Chat() {
    const [data, setData] = useState();
    const [name, setName] = useState();
    const [img, setImg] = useState();
    const [birth, setBirth] = useState();
    const [messages, setMessages] = useState([]);
    const location = useLocation();
    const receptionUser = location.state.id;
    const receptionName = location.state.name;
    const { user } = useAuthContext();
    let roomId = receptionUser + user.id;
    roomId = roomId.split('');
    roomId.sort();
    roomId = roomId.join('');
    console.log(roomId);

    useEffect(() => {
        db.collection("messages")
        .orderBy("createdAt")
        .where("roomId", "==", roomId)
        .limit(10)
        .onSnapshot((snapshot) => {
            setMessages(snapshot.docs.map((doc) => doc.data()));
        })

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
        
    }, []); 
    
  return (
    <div>
      <Header />
      <TopContent pageName="chat" />
      <div className="msgs">
        {messages.map(({ id, text, photoURL, uid, iconUrl}) => (
          user.uid == uid ?
            <div key={id}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "end"}} className={'msg ${uid === auth.currentUser.uid ? "sent" : "received" }'}>
                  <p style={{marginRight: "25px", backgroundColor: "#FBF9EC", width: "200px", borderRadius: "10px", padding: "10px",}}>{text}</p>
                  <div style={{width: "40px", height: "40px", border: "1px solid #D9D9D9", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", marginTop: "20px"}}>
                    <img style={{height: "80%"}} src={iconUrl} alt="" />
                    <img style={{position: "absolute", top: "0px", right: "40px", zIndex: "-1"}} src="/images/hukidasi.svg" />
                  </div>
                </div>
            </div>
            :
            <div key={id}>
                <div style={{display: "flex", alignItems: "center"}} className={'msg ${uid === auth.currentUser.uid ? "sent" : "received" }'}>
                  <div style={{width: "40px", height: "40px", border: "1px solid #D9D9D9", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", marginTop: "20px"}}>
                    <img style={{height: "80%"}} src={iconUrl} alt="" />
                    <img style={{position: "absolute", top: "0px", left: "40px", zIndex: "-1"}} src="/images/hukidasi.svg" />
                  </div>
                  <p style={{marginLeft: "25px", backgroundColor: "#FBF9EC", width: "200px", borderRadius: "10px", padding: "10px",}}>{text}</p>
                </div>
            </div>
        ))}
      </div>
      <SendMessage roomId={roomId} sendId={user.uid} iconUrl={img} receptionUser={receptionUser} uname={name} receptionName={receptionName} />
    </div>    
  );
}

export default Chat;

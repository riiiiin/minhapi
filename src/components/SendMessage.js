import React, { useState } from 'react';
import { db, auth } from "../firebase";
import firebase from "firebase/compat/app";
import { Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function SendMessage(props) {
    const [message, setMessage] = useState("");
    const roomId = props.roomId;
    const sendId = props.sendId;
    const iconUrl = props.iconUrl;
    const receptionUser = props.receptionUser;
    console.log(iconUrl)
    const usersRef = db.collection('room').doc(roomId);
    

    function sendMessage(e) {
      e.preventDefault();

      const { uid } = auth.currentUser;

      db.collection("messages").add({
          text: message,
          uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          roomId: roomId,
          iconUrl: iconUrl
      });
      setMessage("");

      usersRef.get().then(async (docSnapshot) => {
        if (!docSnapshot.exists) {
            try {
                await usersRef.set({
                    user1: uid,
                    user2: receptionUser
                })
            } catch (error) {
                console.log(error);
            }
        }
    })
    }

  return (
    <div>
      <form onSubmit={sendMessage}>
        <div className="sendMsg" style={{textAlign:"center", marginTop: "30px"}}>
            <Input
                style={{
                  width: "78%",
                  fontSize: "15px",
                  fontWeight: "550",
                  marginLeft: "5px",
                  marginBottom: "-3px",
                }}
                placeholder="メッセージを入力してください" 
                type="text" 
                onChange={(e) => setMessage(e.target.value)} 
                value = {message}
            />
        </div>
      </form>
    </div>
  );
}

export default SendMessage;

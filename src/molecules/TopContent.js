import React from 'react';

function TopContent(props) {
    let message = "";

    if (props.pageName == "profile") {
        message = "/images/あなたの プロフィール.svg"
    } else if (props.pageName == "editProfile") {
        message = "/images/プロフィールを記入しよう.svg"
    } else if (props.pageName == "home") {
        message = "/images/みんなで誕生日をお祝いしよう！！.svg"
    } else if (props.pageName == "chat") {
        message = "/images/お祝いメッセージを送信しよう！.svg"
    }

  return (
    <div style={{backgroundColor: "rgba(215,215,0,.2)", padding: "10px 0"}}>
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <img style={{marginLeft: "30px"}} src={message} />
            <img style={{marginRight: "50px"}} src="/images/mainHuman.svg" />
        </div>
    </div>
  );
}

export default TopContent;

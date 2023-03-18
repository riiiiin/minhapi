import React from 'react';
import { Button } from "@mui/material";
import { auth } from "../firebase";

function SignOut() {
  return (
    <div>
      <Button onClick={() => auth.signOut()}>サインアウト</Button>
    </div>
  );
}

export default SignOut;

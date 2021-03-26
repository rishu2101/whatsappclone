import React from 'react'
import './login.css'
import { Button } from '@material-ui/core'

import {auth,provider} from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'
import db from './firebase.js';

function Login() {

  const [user,dispatch] = useStateValue();

    const signIn = () => {
       auth.signInWithPopup(provider).then(result => {
          localStorage.setItem('user', JSON.stringify(result.user));
            dispatch({
              type: actionTypes.SET_USER,
              user:result.user,
            });

        //  check if user already exist if not then create new room

        db.collection("chat_users")
        .where("email", "==", result.user.email)
        .get()
        .then((docSnapshot) => {
            if (docSnapshot.docs.length === 0) {
              var docData = {
                email : 'rjain@velsof.com'
              };
              db.collection(`chat_users`).add(docData).then(function() {
              });
          }
        })
    .catch((error) => {
    });

        })          
        .catch ((error) => console.log(error.message)

            )
    }
    return (
        <div className="login" >
            <div className="login_container" >
                <img src="data:image/jpeg;base64,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" alt="whatsapp"/>               
            
            <div className="login_text">
               <h1> Sign in to whatsapp</h1>
            </div>
            <Button type="submit" onClick={signIn} >
                Sign In With Google
            </Button>
            </div>
        </div>
    )
}

export default Login

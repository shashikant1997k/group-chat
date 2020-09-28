import React from 'react'
import '../css/Login.css'
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'
import { useStateValue } from '../component/StateProvider/StateProvider'
import { actionTypes } from '../component/StateProvider/Reducer'

function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () =>{
        auth.signInWithPopup(provider).then(result => {
            localStorage.setItem('userData', JSON.stringify(result.user));
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            });
        }).catch(error => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login_container">

                <div className="login_text">
                    <h1>Sign in to Group chat</h1>
                </div>

                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>

        </div>
    )
}

export default Login

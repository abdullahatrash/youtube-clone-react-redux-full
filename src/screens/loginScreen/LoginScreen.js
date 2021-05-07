import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { login } from '../../redux/actions/auth.action'
import "./loginScreen.scss"

function LoginScreen() {
    const dispatch = useDispatch()

    const accessToken = useSelector(state => state.auth.accessToken)

    const handelLogin = () => {

        dispatch(login())
    }
    const history = useHistory()

    useEffect(() => {

        if(accessToken) {
            history.push('/')
        }
    }, [accessToken, history])
    
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://pngimg.com/uploads/youtube/youtube_PNG102352.png" alt="youtube logo"/>
                <button onClick= { handelLogin }>Login with google</button>
                <p>This project is made using Youtube DATA API</p>
            </div>
            
        </div>
    )
}

export default LoginScreen

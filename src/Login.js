import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Login(props) {
    let [userInput, setUserInput] = useState('');
    let [user, setUser] = useState(false);
    let [access, setAccess] = useState(false);

    const newUser = () => {
        document.querySelector('#login-button').disabled = true;
        document.querySelector('#login-input').disabled = true;
        props.postUserData();
        setUser(true);
    }

    const registeredUser = () => {
        if (!user) {
            props.setUserId(userInput);
            props.getUserData(userInput);
            props.registeredUser.current = true;
            props.loadingData.current = true;
        }
    }

    useEffect(() => {
        if (userInput !== '' || props.userId) {
            setAccess(true);
        }
    }, [props.userId, userInput])

    return (
        <div className='login'>
            <h1 className='title'>The Waiting Dogs</h1>
            <div className='login-data'>
                <p>Si no tienes una Id de usuario:</p>
                <button id='login-button' onClick={newUser}>Crear usuario</button>
                <p>Tu id de usuario:</p>
                <div className='login-new-user'>{props.userId}</div>
                <p>Si tienes una Id de usuario, introdúcela:</p>
                <input id='login-input' onChange={e => setUserInput(e.target.value)} value={userInput} />
                {access && <Link to='/game' onClick={registeredUser}>Acceder</Link>}
            </div>
        </div>
    );
}

export default Login;
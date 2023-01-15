import { useState } from 'react';
import style from './../Auth.module.css';
import logo from '../../../../design-system/icon/logo.svg';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    // Introdution de useNavigate
    const navigate = useNavigate();
    // naviguer vers la Signup page
    // const handleNavigation = () => {
    //     navigate('/signup');
    // };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const  onHandleSignUp = async (e: any) =>
    {
        e.preventDefault();
        
        await fetch('http://localhost/api/user/signUp', {
            method: 'POST',
            body: JSON.stringify({
                name: username,
                email: email,
                password: password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data));
                navigate('/landing'); 
            })
            .catch((err) => {
                console.log(err.message);
            });

    };
    

    return (
        <div className={style.loginCard}>
            <div className={style.loginLogo}>
                <img
                    onClick={() => {
                        navigate('/');
                    }}
                    src={logo}
                    alt="logo"
                ></img>
            </div>

            <form className={style.loginForm} onSubmit={onHandleSignUp}>
                <div>
                    <h4>Sign Up</h4>
                </div>
                <label className={style.loginLabel} htmlFor="userName">
                    Username
                </label>
                <input
                    type="text"
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Username"
                />

                <label className={style.loginLabel} htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                />
                <label className={style.loginLabel} htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                />

                <div className={style.formButton}>
                    <button className={style.loginButton}>
                        Confirm
                    </button>

                    <button
                        onClick={() => {
                            navigate('/');
                        }}
                        className={style.signUpButton}
                    >
                        already registered?
                    </button>
                </div>
            </form>
        </div>
    );
}

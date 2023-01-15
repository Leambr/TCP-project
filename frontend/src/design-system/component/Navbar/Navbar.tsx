import React from 'react';
import style from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../../design-system/icon/logo.svg';
import logout from '../../../design-system/icon/logout.svg';

export default function Navbar({username}: any) {
    const navigate = useNavigate();

    return (
        <>
            <div className={style.header}>
                <button className={style.logo} onClick={() => navigate('/landing')}>
                    <img src={logo} />
                </button>

                <div className={style.headerRight}>
                    <p className={style.username}>{username}</p> {/* change with api*/}
                    <span className={style.pipe}></span>
                    <button className={style.logout}>
                        <img src={logout} />
                    </button>
                </div>
            </div>
        </>
    );
}

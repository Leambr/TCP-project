import GroupCardWrapper from '../../../design-system/component/GroupCardWrapper/GroupCardWrapper';
import Modal from '../../../design-system/component/Modal/Modal';
import style from './Landing.module.css';
import add from '../../../design-system/icon/add.svg';
import logo from '../../../design-system/icon/logo.svg';
import { useState, useEffect } from 'react';
import CardWrapper from '../../../design-system/component/CardWrapper/CardWrapper';
import Navbar from '../../../design-system/component/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();

    const userJSON = localStorage.getItem("user");
    const [user, setUser] = useState<any>();
    const [data, setData] = useState<any[]>();

    const [username, setUsername] = useState();
    const [id, setId] = useState();


    useEffect(() => {
        if(userJSON)
        setUser(JSON.parse(userJSON))
    }, [userJSON])

    useEffect(() => {
        if(user)
        {
            setUsername(user.name)
            setId(user.id)
        }
    }, [user])


     useEffect( () => {
        if(id)
        onHandleSignUp();
    }, [id])

    const  onHandleSignUp = async () => {
        await fetch(`http://localhost/api/user/${id}/groups`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); 
                setData(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };


    
    return (
        <>
            <Navbar username={username}/>

            <h2 className={style.landingTitle}>Your groups</h2>

            {data? <div className={style.groupCardContainer}>
                {data.map(({ id, name }) => (
                    <div className={'col-2'} key={id} onClick={() => navigate(`/spending/?groupId=${id}`)}>
                        <GroupCardWrapper>
                            <p className={style.groupName}>{name}</p>
                        </GroupCardWrapper>
                    </div>
                ))}
                <button className={style.addGroupCard} onClick={() => openModal()}>
                    <img src={add} />
                </button>
            </div> : <></>}

            {modalIsOpen && (
                <Modal onClose={closeModal}>
                    <div className={style.modalLogoContainer}>
                        <img src={logo} className={style.modalLogo} />
                    </div>
                    <div className={style.modalFormContainer}>
                        <CardWrapper>
                            <form className={style.modalForm}>
                                <label htmlFor="groupName">Create a group?</label>
                                <input
                                    type="text"
                                    id="groupName"
                                    name="groupName"
                                    placeholder="group name"
                                />
                                <button type="submit">
                                    Let's go
                                </button>
                            </form>
                        </CardWrapper>

                        <CardWrapper>
                            <form className={style.modalForm}>
                                <label htmlFor="groupName">Join a group</label>
                                <input
                                    type="text"
                                    id="groupName"
                                    name="groupName"
                                    placeholder="code"
                                />
                                <button type="submit">
                                    Join
                                </button>
                            </form>
                        </CardWrapper>
                    </div>
                </Modal>
            )}
        </>
    );
}

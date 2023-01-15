import GroupCardWrapper from '../../../design-system/component/GroupCardWrapper/GroupCardWrapper';
import Modal from '../../../design-system/component/Modal/Modal';
import style from './Landing.module.css';
import add from '../../../design-system/icon/add.svg';
import logo from '../../../design-system/icon/logo.svg';
import { useState, useEffect, useRef } from 'react';
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

    const groupNameRef = useRef<any>(undefined);
    const passwordGroupRef = useRef<any>(undefined);

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
        getAllGroups();
    }, [id])

    const  getAllGroups = async () => {
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

    const  createGroup = async (event: any) => {
        event.preventDefault();


        const groupName = groupNameRef.current.value;
        if(groupName)
        {
            
            await fetch(`http://localhost/api/user/${id}/group`, {
            method: 'POST',
            body: JSON.stringify({
                name: groupName
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); 
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
        else{
            alert('Pas de nom de groupe')
        }
        
    }

    const  joinGroup = async (event: any) => {
        event.preventDefault();


        const passwordGroup = passwordGroupRef.current.value;
        if(passwordGroup)
        {
            
            await fetch(`http://localhost/api/user/group`, {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                password: passwordGroup
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); 
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
        else{
            alert('Pas de password')
        }
        
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
                {data.map(({ id, name, password }) => (
                    <div className={'col-2'} key={id} onClick={() => navigate(`/spending/?groupId=${id}`)}>
                        <GroupCardWrapper>
                            <p className={style.groupName}>{`${name} : #${password}`}</p>
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
                            <form className={style.modalForm} onSubmit={createGroup}>
                                <label htmlFor="groupName">Create a group?</label>
                                <input
                                    type="text"
                                    id="groupName"
                                    name="groupName"
                                    placeholder="group name"
                                    ref={groupNameRef}
                                />
                                <button type="submit">
                                    Let's go
                                </button>
                            </form>
                        </CardWrapper>

                        <CardWrapper>
                            <form className={style.modalForm} onSubmit={joinGroup}>
                                <label htmlFor="groupPassword">Join a group</label>
                                <input
                                    type="text"
                                    id="groupPassword"
                                    name="groupPassword"
                                    placeholder="code"
                                    ref={passwordGroupRef}
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

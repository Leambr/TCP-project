import GroupCardWrapper from '../../../design-system/component/GroupCardWrapper/GroupCardWrapper';
import Modal from '../../../design-system/component/Modal/Modal';
import style from './Landing.module.css';
import add from '../../../design-system/icon/add.svg';
import logo from '../../../design-system/icon/logo.svg';
import { useState } from 'react';
import CardWrapper from '../../../design-system/component/CardWrapper/CardWrapper';
import Navbar from '../../../design-system/component/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();

    const [tmpList, setTmpList] = useState([
        {
            id: 1,
            name: 'Voyage au Japon',
        },
        {
            id: 2,
            name: 'Voyage au Vietnam',
        },
        {
            id: 3,
            name: 'Voyage en Espagne',
        },
        {
            id: 4,
            name: 'Collocation à Paris',
        },
        {
            id: 5,
            name: 'Trip to the moon',
        },
        {
            id: 6,
            name: 'Nourriture chinoise',
        },
        {
            id: 7,
            name: 'fbgufdsortygfuidozçunhjcksozughbvnc,dkoruh',
        },
    ]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const test = () => {
        console.log('test');
    };

    
    return (
        <>
            <Navbar />

            <h2 className={style.landingTitle}>Your groups</h2>

            <div className={style.groupCardContainer}>
                {tmpList.map(({ id, name }) => (
                    <div className={'col-2'} key={id} onClick={() => navigate(`/spending/?groupId=${id}`)}>
                        <GroupCardWrapper>
                            <p className={style.groupName}>{name}</p>
                        </GroupCardWrapper>
                    </div>
                ))}
                <button className={style.addGroupCard} onClick={() => openModal()}>
                    <img src={add} />
                </button>
            </div>

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

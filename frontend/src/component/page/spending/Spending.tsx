import { useState, useEffect, useRef } from 'react';
import CardWrapper from '../../../design-system/component/CardWrapper/CardWrapper';
import style from './Spending.module.css';
import logo from '../../../design-system/icon/logo.svg';
import confirmedTaskSvg from '../../../design-system/icon/confirmedTask.svg';
import unconfirmedTaskSvg from '../../../design-system/icon/unconfirmedTask.svg';
import arrowSVG from '../../../design-system/icon/arrow.svg';
import Navbar from '../../../design-system/component/Navbar/Navbar';
import Modal from '../../../design-system/component/Modal/Modal';
import addButton from '../../../design-system/icon/addButton.svg';
import cx from 'classnames';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface SpendingProps {
    id: number;
    name: string;
}

interface SpentProps {
    paidBy: string;
    confirmed: boolean;
    id: number;
    from: string;
    to: string;
    amount: number;
    spending_id: number;
}

export default function Spending() {

    // Définition de useNaviagte
    const navigate = useNavigate();
    // Import des SVG
    const confirmedSVG = confirmedTaskSvg;
    const unconfirmedSVG = unconfirmedTaskSvg;
    //
    const [spendingTask, setSpendingTask] = useState('BEURK');
    const [spendingValue, setSpendingValue] = useState(1);
    const [paidBy, setPaidBy] = useState('Francis');
    const [spendingTitle, setSpendingTitle] = useState('Les courses');
    const [amountPaid, setAmountPaid] = useState(16.98);
    const [confirmedTask, setConfirmedTask] = useState(confirmedSVG);
    const [searchParams, setSearchParams] = useSearchParams();
    const groupId = searchParams.get('groupId');


    const userJSON = localStorage.getItem("user");
    const [user, setUser] = useState<any>();
    const [id, setId] = useState();

    useEffect(() => {
        if(userJSON)
        setUser(JSON.parse(userJSON))
    }, [userJSON])

    useEffect(() => {
        if(user)
        {
            setId(user.id)
        }
    }, [user])


    const [allSpendings, setAllSpendings] = useState<any[]>();
    const  getAllSpendings = async () => {
        await fetch(`http://localhost/api/group/${groupId}/spendings`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); 
                setAllSpendings(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    useEffect( () => {
        getAllSpendings();
    }, [])

    const handleSpendingOnClick = (id: string, name: string) =>
    {
        console.log(id);
        
        navigate(
            '/spending/?groupId=' + groupId + '&id=' + id
        );
        setSpendingId(id)
        getAllRefunds()
    }

    const [allRefunds, setAllRefunds] = useState<any[]>();
    const [spendingId, setSpendingId] = useState<any>();
    const  getAllRefunds = async () => {
        if(spendingId)
        {
        await fetch(`http://localhost/api/spending/${spendingId}/refunds`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); 
                setAllRefunds(data)
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
    }

    useEffect( () => {
        getAllRefunds();
    }, [spendingId])


    const spendingNameRef = useRef<any>(undefined);
    const spendingAmountRef = useRef<any>(undefined);

    const  createSpending = async (event: any) => {
        event.preventDefault();


        const spendingName = spendingNameRef.current.value;
        const spendingAmount = spendingAmountRef.current.value;
        if(spendingName)
        {
            
            await fetch(`http://localhost/api/group/${groupId}/spending`, {
            method: 'POST',
            body: JSON.stringify({
                name: spendingName,
                amount: Number(spendingAmount),
                paid_by_id: id
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


    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };


    return (
        <>
            <Navbar />
            <div className={style.spendingPage}>
                <div className={style.spendingGroupTitle}>
                    <h2>null</h2>
                </div>
                <div className={style.spendingPageContent}>
                    <div className={style.allSpendingData}>
                        <div className={style.allSpendingTitle}>
                            <h3>All Spendings</h3>
                            <button className={style.addSpending}>
                                <img
                                    src={addButton}
                                    alt="addButton"
                                    // onClick={() => {
                                    //     navigate('/spending/?groupId=' +
                                    //     groupId+'&add');
                                    // }}
                                    onClick={() => openModal()}
                                ></img>
                            </button>
                        </div>
                        <div className={style.allSpendingDataSection}>
                            {allSpendings ? (
                                allSpendings.map(({ id, name }) => (
                                    <CardWrapper>
                                        <button
                                            value={id}
                                            onClick={() => handleSpendingOnClick(id, name)}
                                            
                                        >
                                            {name}
                                        </button>
                                    </CardWrapper>
                                ))
                            ) : (
                                <p>NOTHING HERE</p>
                            )}
                        </div>
                    </div>

                        <div className={style.cardSpendingTask}>
                            <div className={style.spendingTaskHeader}>
                                <h3>{spendingTitle}</h3>
                                <p>
                                    Paid By {allRefunds? allRefunds[0].to : null}
                                </p>
                            </div>
                            <div>
                                {allRefunds? allRefunds.map(({ id, amount, to, from, spending_id }) => {
                                        return (
                                            console.log(confirmedTask),
                                            (
                                                <CardWrapper>
                                                    <div className={style.spentCardTask}>
                                                        <p className={style.from}>{from}</p>
                                                        <img
                                                            src={arrowSVG}
                                                            alt="arrow"
                                                            className={style.arrow}
                                                        />

                                                        <p className={style.to}>{to}</p>
                                                        <p className={style.amount}>{amount} €</p>
                                                        <button
                                                            className={style.confirmedTask}
                                                            value={spending_id}
                                                            onClick={() => {
                                                                navigate(
                                                                    '/spending/?groupId=' +
                                                                        groupId +
                                                                        '&id=' +
                                                                        id +
                                                                        '&task=' +
                                                                        spendingTitle +
                                                                        '&taskId=' +
                                                                        spending_id
                                                                );
                                                            }}
                                                        >
                                                            <img
                                                                src={confirmedTask}
                                                                alt={confirmedTask}
                                                            />
                                                        </button>
                                                    </div>
                                                </CardWrapper>
                                            )
                                        );
                                    
                                }) : <></>}
                            </div>
                        </div>
                    </div>
                </div>

                {modalIsOpen && (
                    <Modal onClose={closeModal}>
                        <div className={style.modalLogoContainer}>
                            <h4>New spending</h4>
                        </div>

                        <div className={style.modalFormContainer}>
                            <form className={style.modalForm} onSubmit={createSpending}>
                                <input
                                    type="text"
                                    // id="spending"
                                    name="spendingName"
                                    placeholder="name"
                                    ref={spendingNameRef}
                                />
                                <input
                                    type="text"
                                    // id="spending"
                                    name="spendingAmount"
                                    placeholder="amount"
                                    ref={spendingAmountRef}
                                />
                                <button type="submit">Let's go</button>
                            </form>
                        </div>
                    </Modal>
                )}
        </>
    );
}

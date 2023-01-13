import { useState } from 'react';
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
    const allSpendingData: SpendingProps[] = [
        {
            id: 1,
            name: 'Les courses',
        },
        {
            id: 2,
            name: "L'essence",
        },
        {
            id: 3,
            name: "L'éléctricité",
        },
        {
            id: 4,
            name: 'Les soirées du jeudi soir',
        },
        {
            id: 4,
            name: 'Les soirées du jeudi soir',
        },
        {
            id: 4,
            name: 'Les soirées du jeudi soir',
        },
        {
            id: 4,
            name: 'Les soirées du jeudi soir',
        },
        {
            id: 4,
            name: 'Les soirées du jeudi soir',
        },
        {
            id: 4,
            name: 'Les soirées du jeudi soir',
        },
        {
            id: 4,
            name: 'Les soirées du jeudi soir',
        },
        {
            id: 4,
            name: 'Les soirées du jeudi soir',
        },
        {
            id: 4,
            name: 'Les soirées du jeudi soir',
        },
    ];
    const spendingData: SpentProps[] = [
        {
            id: 1,
            confirmed: true,
            spending_id: 12435,
            paidBy: 'Franck',
            from: 'Franck',
            to: 'Pauline',
            amount: 16.98,
        },

        {
            id: 1,
            confirmed: true,
            spending_id: 3254,
            paidBy: 'Franck',
            from: 'Franck',
            to: 'Pauline',
            amount: 16.98,
        },
        {
            id: 1,
            confirmed: true,
            spending_id: 234,
            paidBy: 'Franck',
            from: 'Franck',
            to: 'Pauline',
            amount: 16.98,
        },
        {
            id: 1,
            confirmed: true,
            spending_id: 23454,
            paidBy: 'Franck',
            from: 'Franck',
            to: 'Pauline',
            amount: 16.98,
        },
        {
            id: 1,
            confirmed: false,
            spending_id: 42343,
            paidBy: 'Franck',
            from: 'Franck',
            to: 'Pauline',
            amount: 16.98,
        },
        {
            id: 1,
            confirmed: true,
            spending_id: 5432562,
            paidBy: 'Franck',
            from: 'Franck',
            to: 'Pauline',
            amount: 16.98,
        },
        {
            id: 2,
            paidBy: 'Pierre',
            spending_id: 1421,
            confirmed: true,
            from: 'Franck',
            to: 'Pauline',
            amount: 50.0,
        },
        {
            id: 3,
            confirmed: false,
            spending_id: 12535,
            paidBy: 'Paul',
            from: 'Franck',
            to: 'Pauline',
            amount: 43.27,
        },
        {
            id: 4,
            confirmed: true,
            spending_id: 14353,
            paidBy: 'Camille',
            from: 'Franck',
            to: 'Pauline',
            amount: 98.74,
        },
    ];

    const [userList, setUserList] = useState([
        {
            id: 1,
            name: 'Franck',
        },
        {
            id: 2,
            name: 'Pauline',
        },
        {
            id: 3,
            name: 'Pierre',
        },
        {
            id: 4,
            name: 'Paul',
        },
    ]);

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
    const [spendingDataId, setSpendingDataId] = useState(1);
    const handleSpentData = () =>
        spendingData.map(({ id, amount, paidBy, confirmed }) => {
            if (spendingDataId == id) {
                return (
                    setAmountPaid(amount),
                    setPaidBy(paidBy),
                    confirmed
                        ? setConfirmedTask(confirmedSVG)
                        : setConfirmedTask(unconfirmedTaskSvg)
                );
            }
        });
    // console.log(allSpendingData);

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
            <div className={style.spendingPage}>
                <div className={style.spendingGroupTitle}>
                    <h2>Trip to Marseille</h2>
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
                            {allSpendingData ? (
                                allSpendingData.map(({ id, name }) => (
                                    <CardWrapper>
                                        <button
                                            value={id}
                                            onClick={() => {
                                                navigate(
                                                    '/spending/?groupId=' + groupId + '&id=' + id
                                                );
                                                setSpendingDataId(id);
                                                setSpendingTitle(name);
                                                handleSpentData();
                                            }}
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

                    <div className={style.spendingData}>
                        <div className={style.spendingAndAmount}>
                            <div className={style.totalAmount}>
                                <CardWrapper>
                                    <div className={style.totalAmountContentCard}>
                                        <p>My total Amount</p>
                                        <span>50,00 €</span>
                                    </div>
                                </CardWrapper>
                            </div>
                            <div className={style.totalSpending}>
                                <CardWrapper>
                                    <div className={style.totalSpendingContentCard}>
                                        <p>Total Spendings</p>
                                        <span>50,00 €</span>
                                    </div>
                                </CardWrapper>
                            </div>
                        </div>

                        <div className={style.cardSpendingTask}>
                            <div className={style.spendingTaskHeader}>
                                <h3>{spendingTitle}</h3>
                                <p>
                                    Paid By {paidBy} : {amountPaid} €
                                </p>
                            </div>
                            <div>
                                {spendingData.map(({ id, amount, to, from, spending_id }) => {
                                    if (spendingDataId == id) {
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
                                                                setSpendingDataId(id);
                                                                console.log(spending_id);
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
                                    }
                                })}
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
                            <form className={style.modalForm}>
                                <input
                                    type="text"
                                    // id="spending"
                                    name="spendingName"
                                    placeholder="name"
                                />
                                <input
                                    type="text"
                                    // id="spending"
                                    name="spendingAmount"
                                    placeholder="amount"
                                />
                                <select name="spendingPaidBy">
                                    <option value="" selected disabled hidden>
                                        paid by
                                    </option>
                                    {userList.map(({ id, name }) => (
                                        <option value={id}>{name}</option>
                                    ))}
                                </select>
                                <button type="submit">Let's go</button>
                            </form>
                        </div>
                    </Modal>
                )}
            </div>
        </>
    );
}

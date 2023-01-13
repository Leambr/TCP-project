import { PropsWithChildren, useState } from 'react';
import style from './Modal.module.css';
import { createPortal } from 'react-dom';
import close from '../../icon/close.svg';

interface BackdropProps {
    onClose: () => void;
}

export default function Modal({ children, onClose }: PropsWithChildren<BackdropProps>) {
    const Backdrop = (props: BackdropProps) => {
        const { onClose } = props;
        return <div className={style.backdrop} onClick={onClose}></div>;
    };

    const portalElement = document.querySelector('#modal-overlays')!;
    
    const ModalOverlay = ({ children }: PropsWithChildren) => {
        return (
            <div className={style.modal}>
                <button className={style.modalCloseBtn} onClick={onClose}>
                    <img src={close}/>
                </button>
                <div className={style.content}>{children}</div>
            </div>
        );
    };

    return (
        <>
            {createPortal(<Backdrop onClose={onClose} />, portalElement)}
            {createPortal(<ModalOverlay >{children}</ModalOverlay>, portalElement)}
        </>
    );
}

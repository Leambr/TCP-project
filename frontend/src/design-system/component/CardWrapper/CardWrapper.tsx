import { PropsWithChildren } from 'react';
import style from './CardWrapper.module.css';

export default function CardWrapper({ children }: PropsWithChildren) {
    return <div className={style.cardWrapper}>{children}</div>;
}

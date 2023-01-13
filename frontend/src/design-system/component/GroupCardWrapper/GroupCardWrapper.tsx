import { PropsWithChildren } from 'react';
import style from './GroupCardWrapper.module.css';

export default function GroupCardWrapper({ children }: PropsWithChildren) {
    return <div className={style.groupCardWrapper}>{children}</div>;
}

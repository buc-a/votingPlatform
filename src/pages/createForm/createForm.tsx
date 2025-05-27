import clsx from 'clsx';

import styles from './createForm.module.scss'
import { Form } from '../../components/form/form'
import { useNavigate } from 'react-router-dom';

import arrow from '../../images/back.svg';

export const CreateFrom = () => {

    const navigate = useNavigate();
    return (
        <div className={clsx(styles.main)}>
            <img className={clsx(styles.arrow)} src={arrow} onClick={() => navigate(-1)}></img>
            <Form/>
        </div>
    )
}
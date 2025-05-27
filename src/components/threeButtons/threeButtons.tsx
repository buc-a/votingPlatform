import clsx from 'clsx';
import styles from './threeButtons.module.scss'

import change from '../../images/change.svg';
import backet from '../../images/backet.svg';
import look from '../../images/look.svg';
import { Voting } from '../../utils/constants'

type Props = {
    data: Voting;
    onView: (voting: Voting) => void;
    onDelete: (voting: Voting) => void;
    onChange: (voting: Voting) => void;
};


export const ThreeButtons = ({data, onView, onDelete, onChange}: Props) => {
    return (
        <div className={clsx(styles.buttons)}>
            <img src={change} className={clsx(styles.button)} onClick={() => onChange(data)}></img>
            <img src={backet} className={clsx(styles.button)} onClick={() => onDelete(data)}></img>
            <img src={look} className={clsx(styles.button)} onClick={() => onView(data)}></img>
        </div>
    )
}
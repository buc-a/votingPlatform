import clsx from 'clsx';

import styles from './fullCard.module.scss';
import { Variant } from '../variant/variant'
import { Voting } from '../../utils/constants';
import { useState, useEffect } from 'react';

type Props = {
    data: Voting;
};

export const FullCard = ({data}: Props) => {
    const [maxVotes, setMaxVotes] = useState<number>(0);
    useEffect(() =>{
        const m = data.variants.reduce((curMax, curVal) => {
            return Math.max(curMax, curVal.count)
        }, 0);
        setMaxVotes(m);
    },[data])
    return (
        <div className={clsx(styles.card)}>

            <p className={clsx(styles.title)}>{data.name}</p>
            <img className={clsx(styles.avatar)} src={data.photo}></img>
            <p className={clsx(styles.description)}>{data.description}</p>
            <div>
                {
                    data.variants.map(variant => (
                        <Variant key={variant.id} data={variant} maxVotes={maxVotes}/>
                    )
                    )
                }

                <div className={clsx(styles.voting_button)}>Проголосовать</div>

            </div>

        </div>
       
    )
}
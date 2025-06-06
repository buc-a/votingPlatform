import clsx from 'clsx';
import styles from './card.module.scss'
import arrow from '../../images/arrow.svg';
import { Voting } from '../../utils/constants';
import { useEffect, useState } from 'react';
import { Variant} from '../variant/variant';
import React from 'react';
type Props = {
    data: Voting;
    onClick?: (voting: Voting) => void;
    isDescription?: boolean;
    isAvatar?: boolean;
    isDetail?: boolean;
    isVariants?: boolean;
    children?: React.ReactNode
};

export const Card = ({ data,
    isDescription = false,
    isAvatar = false,
    isDetail = false,
    isVariants = false, 
    onClick = () => {},
    children = null}: Props,
    ) => {

    //для отображения полосы количества голосов
    const [maxVotes, setMaxVotes] = useState<number>(0);

    useEffect(() =>{
        const m = data.variants.reduce((curMax, curVal) => {
            return Math.max(curMax, curVal.count)
        }, 0);
        setMaxVotes(m);
    },[data])

    return (
        <div className={clsx(styles.card)} lang="ru">
            <div className={clsx(styles.card__text)}>
                <p className={clsx(styles.card__title)}>{data.name}</p>
                {
                    isDescription && <p className={clsx(styles.card__description)}>{data.description}</p>
                }
            </div>
            {
                isAvatar && <img className={clsx(styles.card__avatar)} src={data.photo}></img>
            }
            <div className={clsx(styles.card__right)}>  
                <div className={clsx(styles.card__variants)}>
                    {isVariants && data.variants.map(variant => (
                        <Variant key={variant.id} data={variant} maxVotes={maxVotes}/>
                    ))}

                </div>         
            {
                isDetail && onClick &&
                <div className={clsx(styles.card__detail)} onClick={() => onClick(data)}>
                    <p>Подробнее</p>
                    <img className={clsx(styles.card__detail__detailButton)} src={arrow} alt="details"></img>
                </div>
            }
            </div >
            <div className={clsx(styles.card__children)}>
                {
                    children 
                }              
            </div>

        </div>
    )
}
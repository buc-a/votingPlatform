import styles from './variant.module.scss'
import clsx from 'clsx';
import { Variant as Value } from '../../utils/constants';
import { useState, useEffect } from 'react';
type Props = {
    data: Value;
    maxVotes: number
};

export const Variant = ({data, maxVotes}: Props) => {

    return (
        <div className={clsx(styles.variant)}>
            <div className={clsx(styles.variant_info)}> 
                <p className={clsx(styles.variant_name)}>{data.name}</p>
                <div className={clsx(styles.voteBarContainer)}>
                    <div className={clsx(styles.voteBar)} 
                        style={{ width: `${(data.count / maxVotes) * 100}%` }}></div>
                </div>
                <p className={clsx(styles.variant_count)}>{data.count} голоса</p>

            </div>
            
            <div className={clsx(styles.optionCircle, data.selected ? styles.optionCircle_active : '')}></div>
        </div>
    )
}
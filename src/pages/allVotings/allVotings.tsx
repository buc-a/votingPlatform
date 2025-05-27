import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import clsx from 'clsx';
import styles from './allVotings.module.scss'

import {Card} from '../../components/card/card'
import plus from '../../images/plus.png';
import { Voting } from '../../utils/constants';
import { Api } from '../../utils/api';
import { FullCard } from '../../components/fullCard/fullCard'
const api = new Api('/api');


export const AllVotings = () => {
    const [votings, setVotings] = useState<Voting[]>([]);
    const [selectedVoting, setSelectedVoting] = useState<Voting | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (data: Voting) => {
        setModalIsOpen(true);
        setSelectedVoting(data);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {


    }, [selectedVoting]);

    
    useEffect(() => {
        const data = api.get("/all") as Voting[];
        setVotings(data);
    }, []);


    return (
        <>
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.top)}>
                <Modal className={clsx(styles.modal)} isOpen={modalIsOpen} onRequestClose={closeModal}>
                    {selectedVoting && <FullCard data={selectedVoting} />}
                    
                </Modal>
                <Link to="/create">
                    <img className={clsx(styles.addButton)} src={plus} alt="add voting">
                    </img>
                </Link>
                
            </div>

            <div className={clsx(styles.list)}>
                {votings.map(voting => (
                    <Card key={voting.id} data={voting} onClick={openModal} isDescription={true} isAvatar={true} isDetail={true}/>
                ))}
 
            </div>
        </div>
        </>
    )
}
import clsx from 'clsx';
import styles from './partVotings.module.scss'
import { Card } from '../../components/card/card'
import { useState, useEffect } from 'react';
import { Voting } from '../../utils/constants';
import { Api } from '../../utils/api';
import Modal from 'react-modal';
import { FullCard } from '../../components/fullCard/fullCard'
const api = new Api('/api');

export const PartVotings = () => {
    const [votings, setVotings] = useState<Voting[]>([]);
    
    useEffect(() => {
        const data = api.get("/part?user=2222") as Voting[];
        setVotings(data);
    }, []);
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
    return (

        <>
            <Modal className={clsx(styles.modal)} isOpen={modalIsOpen} onRequestClose={closeModal}>
                {selectedVoting && <FullCard data={selectedVoting} />}
                
            </Modal>
            <div className={clsx(styles.list)}>
                {votings.map(voting => (
                    <Card key={voting.id} data={voting} isVariants={true} isDetail={true} onClick={openModal} />
                ))}
            </div>
        </>
    )    
}

import plus from '../../images/plus.png';
import clsx from 'clsx';
import styles from './myVotings.module.scss'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Card } from '../../components/card/card';
import { Voting } from '../../utils/constants';
import { ThreeButtons} from '../../components/threeButtons/threeButtons';
import { Api } from '../../utils/api';
import Modal from 'react-modal';
import { FullCard } from '../../components/fullCard/fullCard'
const api = new Api('/api');
export const MyVotings = () => {
    //TODO: функции для нажатия на каждую из кнопок 
    const [votings, setVotings] = useState<Voting[]>([]);

    useEffect(() => {
        const data = api.get("/all") as Voting[];
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

    const onChange = (data: Voting) => {
        const c = 1
    }

    const onDelete = (data: Voting) => {
        const c = 1
    }

    const onView = (data: Voting) => {
        const c = 1
    }

    return (
        <>
            <Modal className={clsx(styles.modal)} isOpen={modalIsOpen} onRequestClose={closeModal}>
                {selectedVoting && <FullCard data={selectedVoting} />}
                
            </Modal>
            <div>
                <div className={clsx(styles.top)}>
                    <Link to="/create">
                        <img className={clsx(styles.addButton)} src={plus} alt="add voting"></img>
                    </Link>
                    
                </div>

                <div className={clsx(styles.list)}>
                    {votings.map(voting => (
                        <Card key={voting.id} data={voting} children={
                        <ThreeButtons data={voting} onChange={onChange} onDelete={onDelete} onView={openModal}/>}/>
                    ))}
                </div>
            </div>
        </>
    )    
}
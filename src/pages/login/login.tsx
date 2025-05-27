import clsx from 'clsx';
import styles from './login.module.scss'
import { registerUserThunk, loginUserThunk, getUserSelector } from '../../slices/userSlice';
import { useDispatch, useSelector} from '../../utils/store';
import { FC, SyntheticEvent, useState } from 'react';

export const Login = () => {
    const dispatch = useDispatch();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const error = useSelector(getUserSelector).error;

    const onClickRegister = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(registerUserThunk({
            name: login,
            password: password
        }))
    }

    const onClickLogin = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(loginUserThunk({
            name: login,
            password: password
        }))
    }

    return (
        <div className={clsx(styles.container)}>
            <form className={clsx(styles.form)}>

                <input 
                    type="text" 
                    id="login" 
                    name="login" 
                    placeholder="Логин"
                    onChange={(e) => setLogin(e.target.value)} />

                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Пароль"
                    onChange={(e) => setPassword(e.target.value)} />

                <button 
                    className={clsx(styles.form_button, styles.form_button_green)}
                    onClick={onClickLogin}>
                        Войти
                </button>
                <button className={clsx(styles.form_button)} 
                    onClick={onClickRegister}>
                        Зарегистрироваться
                </button>
            </form>
        </div>
    )
}
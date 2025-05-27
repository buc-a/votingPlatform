import clsx from 'clsx';
import styles from './login.module.scss'

export const Login = () => {
    return (
        <div className={clsx(styles.container)}>
            <form className={clsx(styles.form)}>

                <input type="text" id="login" name="login" placeholder="Логин" />

                <input type="text" id="password" name="password" placeholder="Пароль" />

                <button className={clsx(styles.form_button, styles.form_button_green)}>Войти</button>
                <button className={clsx(styles.form_button)}>Зарегистрироваться</button>
            </form>
        </div>
    )
}
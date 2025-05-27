import { Link, Outlet } from "react-router-dom"

import clsx from 'clsx';
import styles from './header.module.scss'

export const Header = () => {
    return (
        <>
        <div className={clsx(styles.menu)}>
            <div className={clsx(styles.element, styles.element_selected)}>
                <Link to="/voting" className={clsx(styles.link)}>Все опросы</Link>
            </div>
            <div className={clsx(styles.element)}>
                <Link to="/voting/my" className={clsx(styles.link)}>Мои опросы</Link>
            </div>
            <div className={clsx(styles.element)}>
                <Link to="/voting/participate" className={clsx(styles.link)}>Приняли участие</Link>
            </div>
        </div>
        <Outlet />
        </>
        
    )
}
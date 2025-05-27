import { NavLink, Outlet} from "react-router-dom"
import clsx from 'clsx';

import styles from './header.module.scss'

export const Header = () => {
    return (
        <>
        <div className={clsx(styles.menu)}>
            <NavLink to="/voting/all" className={({ isActive }) => clsx(styles.element, isActive && styles.element_selected)}>
                Все опросы
            </NavLink>
            <NavLink to="/voting/my" className={({ isActive }) => clsx(styles.element, isActive && styles.element_selected)}>
                Мои опросы
            </NavLink>
            <NavLink to="/voting/participate" className={({ isActive }) => clsx(styles.element, isActive && styles.element_selected)}>
                Приняли участие
            </NavLink>
      
        </div>
        <Outlet />
        </>
        
    )
}
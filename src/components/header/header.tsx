import { NavLink, Outlet} from "react-router-dom"
import clsx from 'clsx';
import logoutImage from '../../images/logout.png';
import styles from './header.module.scss';
import store from '../../utils/store';
import { clearUser } from '../../slices/userSlice';
import { useDispatch, useSelector} from '../../utils/store';

export const Header = () => {
    const dispatch =  useDispatch();

    const onClickLogout = () => {
        dispatch(clearUser())
    }
    return (
        <>
        <div className={clsx(styles.menu)}>
            <img className={clsx(styles.logout)} 
                src={logoutImage}
                onClick={onClickLogout}></img>
            <div className={clsx(styles.links)}>
                <NavLink to="/all" className={({ isActive }) => clsx(styles.element, isActive && styles.element_selected)}>
                    Все опросы
                </NavLink>
                <NavLink to="/my" className={({ isActive }) => clsx(styles.element, isActive && styles.element_selected)}>
                    Мои опросы
                </NavLink>
                <NavLink to="/participate" className={({ isActive }) => clsx(styles.element, isActive && styles.element_selected)}>
                    Приняли участие
                </NavLink>
            </div>
      
        </div>
        <Outlet />
        </>
        
    )
}
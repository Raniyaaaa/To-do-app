import classes from './MainNavigation.module.css';
import Link from "next/link";

function MainNavigation() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>ToDo</div>
            <nav>
                <ul>
                    <li>
                        <Link href='/today/completed'>Completed Tasks</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default MainNavigation;
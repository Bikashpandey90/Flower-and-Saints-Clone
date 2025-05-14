import styles from './style.module.scss';

export default function CrossButton({ isActive, setIsActive }: { isActive: Boolean, setIsActive: Function }) {


    return (<>

        <div onClick={() => { setIsActive(!isActive) }} className={styles.button}>
            <div className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`}></div>
        </div>

        {/* <AnimatePresence mode='wait'>
            {
                isActive && <NewNav />
            }
        </AnimatePresence> */}
    </>)
}
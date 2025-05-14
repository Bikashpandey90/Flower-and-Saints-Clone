import { menuSlide } from './anim';
import Link from './link';
import CrossButton from './cross-button';
import styles from './style.module.scss';
import { motion } from 'framer-motion'


const NewNav = ({ isActive, setIsActive }: { isActive: Boolean, setIsActive: Function }) => {
    const navItems = [
        {
            title: "Home",
            href: '/'
        },
        {
            title: "Contact",
            href: '/contact'
        },
        {
            title: "About",
            href: '/about'
        },
        {
            title: "Contact",
            href: '/contact'
        }

    ]
    return (<>
        <motion.div
            variants={menuSlide}
            animate='enter'
            exit='exit'
            initial='initial'
            className={styles.menu} >

            <div className={styles.body}>
                <CrossButton isActive={isActive} setIsActive={setIsActive} />


                <div className={styles.nav}>
                    <div className={styles.header}>
                        <p>Navigation</p>
                    </div>
                    {
                        navItems.map((item, index) => {
                            return <Link data={{ ...item, index }} />
                        })
                    }
                </div>

                <div className={styles.footer}>
                    <a>Awwwards</a>
                    <a>Facebook</a>
                    <a>Dribble</a>
                    <a>Linkedin</a>

                </div>
            </div>

            {/* <Curve /> */}
        </motion.div >
    </>)
}
export default NewNav;
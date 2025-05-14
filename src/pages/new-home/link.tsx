import { NavLink } from 'react-router-dom'
import styles from './style.module.scss'
import { motion } from 'framer-motion'
import { slide } from './anim'

const Link = ({ data }: { data: any }) => {
    return (<>
        <motion.div
            custom={data.index}
            variants={slide}
            animate='enter'
            exit='exit'
            initial='initial'
            className={styles.link}>
            <NavLink to={data.href}>{data.title}</NavLink>
        </motion.div>

    </>)
}
export default Link
import './HomeTop.css'
import backgroundImage from '../../../assets/image1.png'
import { motion } from "framer-motion"

function HomeTop() {
    const variants = {
        offscreen: {
            y: -20,
            opacity: 0,
            transition: {
                duration: 1,
            }
        },
        onscreen: {
            y: 0,
            opacity: 100,
            transition: {
                duration: 1,
            }
        }
    };

    return (
        <>  
            <section className="home">
                <motion.h1
                    initial="offscreen"
                    whileInView="onscreen"
                    variants={variants}
                    viewport={{ once: true, amount: 1 }}
                    className="home__title bold">Ge din bil en ny glans
                </motion.h1>
                <motion.i
                    animate={{ scale: [1, 1.5, 1], y: [-30, -25, -30]}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                    className="home__arrow-icon fa-solid fa-chevron-down">
                </motion.i>
                <motion.i
                    animate={{ scale: [1, 1.5, 1], y: [-30, -25, -30]}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                    className="home__arrow-icon fa-solid fa-chevron-down">
                </motion.i>
                <motion.i
                    animate={{ scale: [1, 1.5, 1], y: [-30, -25, -30]}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                    className="home__arrow-icon fa-solid fa-chevron-down">
                </motion.i>
                <img className="home__background-img" src={backgroundImage} alt="background img" />
            </section>
        </>
    )
}

export default HomeTop
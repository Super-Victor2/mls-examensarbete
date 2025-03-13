import './HomeTop.css'
import backgroundImage from '../../../assets/homeImageBigger.png'
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
                    className="home__title">Ge din bil en ny glans
                </motion.h1>
                <div className="group">
                    <div className="small-box"></div>
                    <p className="group-text">Se program</p>
                    <div className="arrow-group">
                        <i className="arrow fa-solid fa-arrow-down"></i>
                    </div>
                </div>
                <img className="home__background-img" src={backgroundImage} alt="background img" />
            </section>
        </>
    )
}

export default HomeTop
import './HomeInfo.css'
import { motion } from "framer-motion"
import infoImg from '../../../assets/image2.png'

function HomeInfo() {
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
            <section className="info">
                    <motion.div 
                        initial="offscreen"
                        whileInView="onscreen"
                        variants={variants}
                        viewport={{ once: true, amount: 0.3 }}
                        className="info__booking">
                        <h1 className="info__booking__title bold">Hur man bokar en tid</h1>
                        <p className="info__booking__body-text">Spara tid och energi med att boka en tid hos oss</p>
                        <ul className="info__booking-list">
                            <li className="info__booking-list-item">Välj vilken typ av program du vill ha</li>
                            <li className="info__booking-list-item">Välj ett paket som passar</li>
                            <li className="info__booking-list-item">Logga in och lägg din beställning</li>
                            <li className="info__booking-list-item">Klart!</li>
                        </ul>
                    </motion.div>
                    <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        variants={variants}
                        viewport={{ once: true, amount: 0.3 }}
                        className="info__img-section">
                        <img src={infoImg} alt="Img" className="info__img" />
                    </motion.div>
                </section>


                <motion.section
                initial="offscreen"
                whileInView="onscreen"
                variants={variants}
                viewport={{ once: true, amount: 0.8 }}
                className="info__time">
                    <div className="info__time__left">
                        <p className="info__time__left-text bold">Måndag - Fredag</p>
                        <p className="info__time__left-text">Stängt</p>
                    </div>
                    <div className="info__time__middle">
                        <p className="info__time__middle-text bold">Lördag</p>
                        <p className="info__time__middle-text">10-20</p>
                    </div>
                    <div className="info__time__right">
                        <p className="info__time__right-text bold">Söndag</p>
                        <p className="info__time__right-text">10-20</p>
                    </div>
                </motion.section>
        </>
    )

}

export default HomeInfo
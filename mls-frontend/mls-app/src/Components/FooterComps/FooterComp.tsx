import './FooterComp.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

function FooterComp() {
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
        <motion.footer initial="offscreen" whileInView="onscreen" variants={variants} viewport={{ once: true, amount: 0.8 }} className="footer" id='footer__section'>
            <section className="footer-wrapper">
                <div className="footer__opening__hours-wrapper">
                    <h2 className="footer__opening__hours-header">Öppettider</h2>
                    <ul className="footer__opening__hours-list">
                        <li className="footer__opening__hours-item bold">Måndag - Fredag</li>
                        <li className="footer__opening__hours-item">Stängt</li>
                        <li className="footer__opening__hours-item bold">Lördag</li>
                        <li className="footer__opening__hours-item">Stängt</li>
                        <li className="footer__opening__hours-item bold">Söndag</li>
                        <li className="footer__opening__hours-item">Stängt</li>
                    </ul>
                </div>
                <div className="footer__contact-wrapper">
                    <h2 className="footer__contact-header">Kontakt</h2>
                    <ul className="footer__contact-list">
                        <li className="footer__contact-item">Mailadress</li>
                        <li className="footer__contact-item">Telefonnummer</li>
                        <li className="footer__contact-item">Adress</li>
                    </ul>
                </div>
                <div className="footer__logo-wrapper">
                    <div className="footer__logo-text-wrapper">
                        <h1 className="footer__big-title">MB</h1>
                        <div className="footer__small-text-wrapper">
                            <p className="footer__small-title">MLS</p>
                            <p className="footer__small-title">Bilvård</p>
                        </div>
                    </div>
                </div>
                <nav className="footer__link-wrapper">
                    <h2 className="footer__link-header">Länkar</h2>
                    <ul className="footer__link-list">
                        <ScrollLink className="footer__nav-link" to="card__section" smooth={true} duration={500}>Program</ScrollLink>
                        <Link className='footer__nav-link' to={'/BookingPage'}>Bokningar</Link>
                        <ScrollLink className="footer__nav-link" to="footer__section" smooth={true} duration={500}>Kontakt</ScrollLink>
                    </ul>
                </nav>
            </section>
            <section className="footer__bottom-wrapper">
                <div className="footer__bottom-divider"></div>
                <div className="footer__bottom-social-wrapper">
                    <a href="" className="footer__bottom-social-link"><i className="footer-icon fa-brands fa-square-facebook"></i></a>
                    <a href="" className="footer__bottom-social-link"><i className="footer-icon fa-brands fa-square-instagram"></i></a>
                </div>
                <p className="footer__bottom-text">© 2025 MLS Bilvård</p>
            </section>
        </motion.footer>
    );
}

export default FooterComp
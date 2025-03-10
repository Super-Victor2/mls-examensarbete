import './HeaderComp.css'
import { AnimatePresence, motion } from "framer-motion"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const menuVariants = {
        open: {
            right: 0,
            opacity: 1,
            transition: {
                bounce: 0,
                duration: 0.4,
                type: "spring",
            }
        },
        closed: {
            right: -500,
            opacity: 0,
            transition: {
                duration: 0.5,
            }
        }
    };

    const linkVariants = {
        open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
        closed: { opacity: 0, x: 20, transition: { duration: 0.2 } }
    };

    const listVariants = {
        open: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        },
        closed: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            }
        }
    };

    return (
        <>
            <header className="header">
                <Link className='header__logo-link' to={'/'}>
                        <motion.ul className='header__logo'>
                            <motion.li
                            initial={{ x: -500 }}
                            animate={{ x: 10 }}
                            transition={{ duration: 1, type: "spring", stiffness: 100, delay: 0 }}
                            className='header__logo-letter M'>M</motion.li>
                            
                            <motion.li
                            initial={{ x: -500 }}
                            animate={{ x: 10 }}
                            transition={{ duration: 1, type: "spring", stiffness: 100, delay: 0.5}}
                            className='header__logo-letter L'>L</motion.li>
                            
                            <motion.li
                            initial={{ x: -500 }}
                            animate={{ x: 10 }}
                            transition={{ duration: 1, type: "spring", stiffness: 100, delay: 1}}
                            className='header__logo-letter S'>S</motion.li>
                            <motion.p
                            initial={{ y: -80 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, type: "spring", stiffness: 100, delay: 1.5}}
                            className="header__logo-text">Bilvård</motion.p>
                        </motion.ul>
                </Link>

                <nav className="header__nav-desktop">
                    <ScrollLink className="header__nav-link-desktop" to="washing__section" smooth={true} duration={500}>Tvätt</ScrollLink>
                    <ScrollLink className="header__nav-link-desktop" to="polishing__section" smooth={true} duration={500}>Polering</ScrollLink>
                    <Link className='header__nav-link-desktop' to={'/BookingPage'}>Bokningar</Link>
                    <ScrollLink className="header__nav-link-desktop" to="footer__section" smooth={true} duration={500}>Kontakt</ScrollLink>
                    <Link className='header__nav-link-desktop' to={'/UserPage'}>Logga in</Link>
                </nav>

                <AnimatePresence initial={false}>
                    <motion.i 
                        exit={{ opacity: 0, scale: 0 }}
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                        whileTap={{ scale: 0.8}}
                        onClick={() => setIsOpen(!isOpen)}
                        className="header__menu-icon fa-solid fa-bars">
                    </motion.i>
                </AnimatePresence>

                <motion.nav
                    initial="closed"
                    animate={isOpen ? "open" : "closed"}
                    variants={menuVariants}
                    className="header__nav-list"
                >
                    <motion.div className='header__nav-list-content'>

                        <motion.div className='header__nav-list-wrapper' variants={listVariants}>
                            <motion.div className='item__bg-hover-wrapper' variants={linkVariants}>
                                <ScrollLink className="header__nav-link scroll-link" to="washing__section" smooth={true} duration={500}>
                                    Tvätt
                                </ScrollLink>
                            </motion.div>

                            <motion.div className='item__bg-hover-wrapper' variants={linkVariants}>
                                <ScrollLink className="header__nav-link scroll-link" to="polishing__section" smooth={true} duration={500}>
                                    Polering
                                </ScrollLink>
                            </motion.div>

                            <motion.div className='item__bg-hover-wrapper' variants={linkVariants}>
                                <Link className='header__nav-link' to={'/BookingPage'}>Bokningar</Link>
                            </motion.div>

                            <motion.div className='item__bg-hover-wrapper' variants={linkVariants}>
                                <ScrollLink className="header__nav-link scroll-link" to="washing__section" smooth={true} duration={500}>
                                    Kontakt
                                </ScrollLink>
                            </motion.div>

                            <motion.div className='item__bg-hover-wrapper' variants={linkVariants}>
                                <Link className='header__nav-link user' to={'/UserPage'}>Logga in</Link>
                            </motion.div>
                        </motion.div>

                    </motion.div>
                </motion.nav>
            </header>
        </>
    )
}

export default Header;
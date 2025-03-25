import './HeaderComp.css'
import { AnimatePresence, motion, useScroll, useMotionValueEvent  } from "framer-motion"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import headerLogo from '../../assets/header-logo.svg';

interface apiResponse {
    data: {
        message: string;
        newLogin: sendUser[];
        token: string;
    };
}

interface sendUser {
    password: string;
    email: string;
}

async function LoginUser(user: sendUser): Promise<void> {
    try {
        console.log("Logging in user:", user.email, user.password);
        const response = await axios.post<apiResponse>("https://tm2znos4mf.execute-api.eu-north-1.amazonaws.com/auth/login", user, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response.data);

        if (response.data.data?.token) {
            console.log('Login successful:', response.data);
            sessionStorage.setItem("token", response.data.data.token);
            sessionStorage.setItem("email", user.email);
            alert("Du är nu inloggad!");
            window.location.reload();
        } else {
            throw new Error(response.data.data?.message || 'Gick inte att logga in');
        }
    } catch (error: any) {
        console.error('Error logging in:', error.response?.data || error.message);
        alert(error.response?.data?.message || "Ett fel uppstod vid inloggning, se till att du har rätt email och lösenord. Om du inte har ett konto, registrera dig.");
    }
}

async function RegisterUser(user: sendUser): Promise<void> {
    console.log("Registering user:", user.email, user.password);
    try {
        const response = await axios.post<apiResponse>("https://tm2znos4mf.execute-api.eu-north-1.amazonaws.com/auth/signin", user, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(response.data);

        if (response.data.data?.message) {
            console.log('Registrering lyckades!:', response.data);
            alert("Registrering lyckades!");
            window.location.reload();
        } else {
            throw new Error(response.data.data?.message || 'Gick inte att registrera användare');
        }
    } catch (error: any) {
        console.error("Ett fel uppstod vid registrering:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Ett fel uppstod vid registrering");
    }
}

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [loginIsOpen, loginsetIsOpen] = useState(false);
    const [registerIsOpen, registersetIsOpen] = useState(false);
    const {scrollY} = useScroll();
    const [headerClass, setHeaderClass] = useState("header-default");
    const [account, setAccount] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (window.location.pathname === "/") {
            if (latest > 300) {
                setHeaderClass("header-scroll");
            } else {
                setHeaderClass("header-default");
            }
        }
    });

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

    const loginVariants = {
        open: {
            opacity: 1,
            pointerEvents: "auto" as const, 
            transition: {
                bounce: 0,
                duration: 0.4,
                type: "spring",
            },
        },
        closed: {
            opacity: 0,
            pointerEvents: "none" as const,
            transition: {
                duration: 0.5,
            },
        },
    };

    const registerVariants = {
        open: {
            opacity: 1,
            pointerEvents: "auto" as const,
            transition: {
                bounce: 0,
                duration: 0.4,
                type: "spring",
            }
        }, 
        closed: {
            opacity: 0,
            pointerEvents: "none" as const,
            transition: {
                duration: 0.5,
            }
        }
    }

    const handleLogin = () => {
        if (!password || !email) {
            alert('Please enter both password and email.');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            alert('Emailadress måste innehålla @ och .com');
            return;
        }

        if (password.length < 4) {
            alert('Lösenordet måste vara minst 4 tecken');
            return;
        }

        const user: sendUser = {
            password,
            email,
        };

        LoginUser(user);
    };

    const handleRegister = () => {
        if (!password || !email) {
            alert('Please enter both password and email.');
            return;
        }

        const user: sendUser = {
            password,
            email,
        };

        RegisterUser(user);
    }

    const handlePopup = () => {
        if (loginIsOpen) {
            loginsetIsOpen(false);
            registersetIsOpen(true);
            setEmail('');
            setPassword('');
        } else if (registerIsOpen) {
            registersetIsOpen(false);
            loginsetIsOpen(true);
            setEmail('');
            setPassword('');
        } else {
            loginsetIsOpen(true);
        }
    };

    const closePopup = () => {
        loginsetIsOpen(false);
        registersetIsOpen(false);
        setEmail('');
        setPassword('');
    };

    useEffect(() => {
        const storedUsername = sessionStorage.getItem("email");
        if (storedUsername) {
            setAccount(storedUsername);
        }
    }, []);

    return (
        <>
            <motion.header className={headerClass}>
                <Link className='header__logo-link' to={'/'}>
                        <motion.ul className='header__logo-wrapper'>
                            <motion.li
                                
                            >
                                <img className='header-logo' src={headerLogo} alt='header-logo' />
                            </motion.li>
                        </motion.ul>
                </Link>

                <nav className="header__nav-desktop">
                    {window.location.pathname === '/' ? (
                        <ScrollLink className="header__nav-link-desktop" to="card__section" smooth={true} duration={500}>Program</ScrollLink>
                        ) : (
                        <Link className="header__nav-link-desktop" to="/#card__section">Program</Link>
                    )}
                    <Link className='header__nav-link-desktop' to={'/OrdersPage'}>Bokningar</Link>
                    {window.location.pathname === '/' ? (
                        <ScrollLink className="header__nav-link-desktop" to="footer__section" smooth={true} duration={500}>Kontakt</ScrollLink>
                        ) : (
                        <Link className="header__nav-link-desktop" to="/#footer__section">Kontakt</Link>
                    )}
                    {account ? (
                        <Link className='header__nav-link-desktop' to={'/UserPage'}>Konto</Link>
                    ) : (
                        <div className="header__nav-login-group">
                            <motion.button exit={{ opacity: 0, scale: 0 }} onClick={() => handlePopup()}  className="link-btn">Logga in</motion.button>
                            <motion.div
                                initial="closed"
                                animate={loginIsOpen ? "open" : "closed"}
                                variants={loginVariants}
                                className="header__nav-login-popup">
                                <i onClick={() => closePopup()} className="fa-solid fa-x close-popup"></i>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className="header__nav-login-input" type="text" placeholder="Emailadress" />
                                <input value={password} onChange={(e) => setPassword(e.target.value)} className="header__nav-login-input" type="password" placeholder="Lösenord" />
                                <button onClick={handleLogin} className="header__nav-login-btn">Logga in</button>
                                <p onClick={() => handlePopup()} className='header__nav-login-text'>Inget konto? Klicka här</p>
                            </motion.div>
                            <motion.div
                                initial="closed"
                                animate={registerIsOpen ? "open" : "closed"}
                                variants={registerVariants}
                                className="header__nav-register-popup">
                                <i onClick={() => closePopup()} className="fa-solid fa-x close-popup"></i>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className="header__nav-login-input" type="text" placeholder="Emailadress" />
                                <input value={password} onChange={(e) => setPassword(e.target.value)} className="header__nav-login-input" type="password" placeholder="Lösenord" />
                                <button onClick={handleRegister} className="header__nav-login-btn">Skapa konto</button>
                            </motion.div>
                        </div>
                    )}
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
                                {window.location.pathname === '/' ? (
                                    <ScrollLink className="header__nav-link scroll-link" to="card__section" smooth={true} duration={500}>
                                    Program
                                    </ScrollLink>
                                ) : (
                                    <Link className="header__nav-link normal-link" to="/#card__section">Program</Link>
                                )}
                            </motion.div>
                            <motion.div className='item__bg-hover-wrapper' variants={linkVariants}>
                                <Link className='header__nav-link' to={'/OrdersPage'}>Bokningar</Link>
                            </motion.div>
                            <motion.div className='item__bg-hover-wrapper' variants={linkVariants}>
                                {window.location.pathname === '/' ? (
                                    <ScrollLink className="header__nav-link scroll-link" to="footer__section" smooth={true} duration={500}>
                                        Kontakt
                                    </ScrollLink>
                                ) : (
                                    <Link className="header__nav-link normal-link" to="/#footer__section">Kontakt</Link>
                                )}
                            </motion.div>
                            {account ? (
                                <motion.div className='item__bg-hover-wrapper' variants={linkVariants}>
                                    <Link className='header__nav-link' to={'/UserPage'}>Konto</Link>
                                </motion.div>
                            ) : (
                                <motion.div className='item__bg-hover-wrapper' variants={linkVariants}>
                                    <motion.p exit={{ opacity: 0, scale: 0 }} onClick={() => loginsetIsOpen(!loginIsOpen)}  className="header__nav-link user">Logga in</motion.p>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                </motion.nav>
            </motion.header>
        </>
    )
}

export default Header;
import './HeaderComp.css'
import { AnimatePresence, motion, useScroll, useMotionValueEvent  } from "framer-motion"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import headerLogo from '../../assets/header-logo.svg';

interface ApiResponse {
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

        const response = await axios.post<ApiResponse>("https://tm2znos4mf.execute-api.eu-north-1.amazonaws.com/auth/login", user, {
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
            throw new Error(response.data.data?.message || 'Login failed');
        }
    } catch (error: any) {
        console.error('Error logging in:', error.response?.data || error.message);
        alert(error.response?.data?.message || "Ett fel uppstod vid inloggning");
    }
}

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [loginIsOpen, loginsetIsOpen] = useState(false);
    const { scrollY } = useScroll();
    const [headerClass, setHeaderClass] = useState("header-default");
    const [account, setAccount] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 300) {
          setHeaderClass("header-scroll");
        } else {
          setHeaderClass("header-default");
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
            transition: {
                bounce: 0,
                duration: 0.4,
                type: "spring",
            }
        }, 
        closed: {
            opacity: 0,
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

        const user: sendUser = {
            password,
            email,
        };

        LoginUser(user);
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
                    <ScrollLink className="header__nav-link-desktop" to="card__section" smooth={true} duration={500}>Program</ScrollLink>
                    <Link className='header__nav-link-desktop' to={'/BookingPage'}>Bokningar</Link>
                    <ScrollLink className="header__nav-link-desktop" to="footer__section" smooth={true} duration={500}>Kontakt</ScrollLink>
                    {account ? (
                        <Link className='header__nav-link-desktop' to={'/UserPage'}>Konto</Link>
                    ) : (
                        <div className="header__nav-login-group">
                            <motion.button exit={{ opacity: 0, scale: 0 }} onClick={() => loginsetIsOpen(!loginIsOpen)}  className="link-btn">Logga in</motion.button>
                            <motion.div
                                initial="closed"
                                animate={loginIsOpen ? "open" : "closed"}
                                variants={loginVariants}
                                className="header__nav-login-popup">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className="header__nav-login-input" type="text" placeholder="Emailadress" />
                                <input value={password} onChange={(e) => setPassword(e.target.value)} className="header__nav-login-input" type="password" placeholder="Lösenord" />
                                <button onClick={handleLogin} className="header__nav-login-btn">Logga in</button>
                                <Link className='header__nav-login-text' to={"/RegisterPage"}>Inget konto? Klicka här</Link>
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
                                <ScrollLink className="header__nav-link scroll-link" to="card__section" smooth={true} duration={500}>
                                    Program
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
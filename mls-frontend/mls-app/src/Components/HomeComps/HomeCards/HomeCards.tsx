import axios from 'axios'
import './HomeCards.css'
import { motion, AnimatePresence, easeInOut } from "framer-motion"
import { useState, useEffect } from "react"
import cardImg from '../../../assets/card-img.png'
import categoryIcon from '../../../assets/category-icon.svg'

interface cardApiResponse {
    data: Card[];
}

interface Card {
    id: number;
    items: cardItems[];
    price: string;
    time: number;
    type: string;
    tier: string;
}

interface cardItems {
    name: string;
    included: boolean;
}

function HomeCards() {
    const [activeCard, setActiveCard] = useState(0)
    const [cards, setCards] = useState<Card[]>([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Tvätt");

    // Hidden / Shown animation
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

    const categoryVariants = {
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

    // Resize mobile / desktop
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 1000);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Next card
    const nextCard = () => {
        if (isMobile) {
            setActiveCard((prev) => {
                const newIndex = (prev + 1) % cards.length;
                return newIndex;
            });
        }
    };
    
    // Previous card
    const prevCard = () => {
        if (isMobile) {
            setActiveCard((prev) => {
                const newIndex = (prev - 1 + cards.length) % cards.length;
                return newIndex;
            });
        }
    };
       

    // Api call Tvätt
    useEffect(() => {
        axios.get<cardApiResponse>("https://tm2znos4mf.execute-api.eu-north-1.amazonaws.com/menu")
            .then(response => {
                const filteredCards = response.data.data.filter(card => card.type === selectedCategory);
                setCards(filteredCards);
                setActiveCard(0);
                console.log(filteredCards);
            })
            .catch(error => console.error(error));
    }, [selectedCategory]);

    // Add to cart
    const handleAddToCart = (selectedCard: Card) => {
        if (sessionStorage.getItem("token")) {
            sessionStorage.setItem("selectedCard", JSON.stringify(selectedCard));
            window.location.href = "/OrderPage"
        } else {
            alert("logga in")
        }
    }

    return (
        <>
            <motion.section initial="offscreen" whileInView="onscreen" variants={variants} viewport={{ once: true, amount: 0.2 }}  className="card__section" id='card__section'>
                <h1 className="card__section-title bold">Program</h1>
                <div className="card__section-btn-flex">
                    <motion.button
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="card__section-btn"><img className='card__section-btn-icon' src={categoryIcon} alt="" />Välj program</motion.button>
                <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={categoryVariants}
                className="card__category-option">
                    <ul className="card__category-list">
                        <li className="card__category-item" onClick={() => setSelectedCategory("Tvätt")}><p className="card__category-text">Tvätt</p></li>
                        <li className="card__category-item" onClick={() => setSelectedCategory("Polering")}><p className="card__category-text">Polering</p></li>
                    </ul>
                </motion.div>
                </div>
                <motion.section className="cards__wrapper">
                    <motion.i whileHover={{ opacity: 0.8, scale: 1.2, cursor: 'pointer'}} whileTap={{scale: 0.8}} onClick={prevCard} className="nextIcon fa-solid fa-chevron-left"></motion.i>
                    <AnimatePresence>
                    {isMobile
                        ? cards.length > 0 && (
                            <motion.article
                                key={cards[activeCard]?.id}
                                className="card"
                                initial={{ opacity: 0  }}
                                animate={{ opacity: 1 }}
                                transition={{ type: "tween", duration: 1, ease: easeInOut }}
                            >
                                <img src={cardImg} alt="" className="card-img" />
                                <header className="card-header">
                                    <p className="card-tier">{cards[activeCard]?.tier}</p>
                                    <p className="card-price">{cards[activeCard]?.price}</p>
                                    <p className="card-type">{cards[activeCard]?.type}</p>
                                </header>
                                <ul className="card__description-list">
                                    {cards[activeCard]?.items.map((item, index) => (
                                        <li key={index} className="card__description-item">
                                        <i className={item.included ? "card__description-icon-check fa-solid fa-check" : "card__description-icon-x  fa-solid fa-x"}></i>
                                        <p className="card__description-text">{item.name}</p>
                                        </li>
                                    ))}
                                </ul>

                                <ul className="card__time-group">
                                    <i className="card__time-group-clock fa-regular fa-clock"></i>
                                    <p className="card__time-group-text">{cards[activeCard]?.time}</p>
                                </ul>
                                <div className="card-btn-group">
                                    <button onClick={() => handleAddToCart(cards[activeCard])} className="card-btn">Välj paket</button>
                                </div>
                                <i className="card-info fa-solid fa-circle-question"></i>
                            </motion.article>
                            )
                        :
                            cards.map(item => (
                            <motion.article key={item.id} className="card">
                                <img src={cardImg} alt="" className="card-img" />
                                <header className="card-header">
                                    <p className="card-tier">{item.tier}</p>
                                    <p className="card-price">{item.price}</p>
                                    <p className="card-type">{item.type}</p>
                                </header>
                                <ul className="card__description-list">
                                {item.items.map((item, index) => (
                                    <li key={index} className="card__description-item">
                                    <i className={item.included ? "card__description-icon-check fa-solid fa-check" : "card__description-icon-x  fa-solid fa-x"}></i>
                                    <p className="card__description-text">{item.name}</p>
                                    </li>
                                ))}
                                </ul>
                                <ul className="card__time-group">
                                    <i className="card__time-group-clock fa-regular fa-clock"></i>
                                    <p className="card__time-group-text">{item.time}</p>
                                </ul>
                                <div className="card-btn-group">
                                    <button key={item.id} onClick={() => handleAddToCart(item)} className="card-btn">Välj paket</button>
                                </div>
                                <i className="card-info fa-solid fa-circle-question"></i>
                            </motion.article>
                            ))
                        }
                    </AnimatePresence>
                    <motion.i whileHover={{ opacity: 0.8, scale: 1.2, cursor: 'pointer'}} whileTap={{scale: 0.8}} onClick={nextCard} className="prevIcon fa-solid fa-chevron-right"></motion.i>
                </motion.section>
            </motion.section>
        </>
    )
}

export default HomeCards
import axios from 'axios'
import './Homepolishing.css'
import { motion, AnimatePresence, easeInOut } from "framer-motion"
import { useState, useEffect } from "react"

interface washingApiResponse {
    data: washingCard[];
}

interface washingCard {
    id: number;
    items: washingItem[];
    price: string;
    time: number;
    type: string;
    tier: string;
}

interface washingItem {
    name: string;
    included: boolean;
}

function HomeBooking() {
    const [activeCard, setActiveCard] = useState(0)
    const [cards, setCards] = useState<washingCard[]>([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 840);

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

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 840);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextCard = () => {
        if (isMobile) {
            setActiveCard((prev) => {
                const newIndex = (prev + 1) % cards.length;
                return newIndex;
            });
        }
    };
    
    const prevCard = () => {
        if (isMobile) {
            setActiveCard((prev) => {
                const newIndex = (prev - 1 + cards.length) % cards.length;
                return newIndex;
            });
        }
    };

    useEffect(() => {
        axios.get<washingApiResponse>("https://tm2znos4mf.execute-api.eu-north-1.amazonaws.com/menu")
            .then(response => {
                const filteredCards = response.data.data.filter(card => card.type === "Polering");
                setCards(filteredCards);
                console.log(filteredCards);
            })
            .catch(error => console.error(error));
    }, []);

    const addToCart = () => {
        alert("Lägger till i varukorgen")
    }

    return (
        <>
            <motion.section initial="offscreen" whileInView="onscreen" variants={variants} viewport={{ once: true, amount: 0.8 }}  className="polishing__booking" id='polishing__section'>
                <motion.i whileHover={{ opacity: 0.8, scale: 1.2, cursor: 'pointer'}} whileTap={{scale: 0.8}} onClick={prevCard} className="nextIcon fa-solid fa-chevron-left"></motion.i>
                <motion.section className="washing__booking__cards-wrapper">
                    <AnimatePresence>
                    {isMobile
                        ? cards.length > 0 && (
                            <motion.article
                                key={cards[activeCard]?.id}
                                className="washing__booking__card"
                                initial={{ opacity: 0  }}
                                animate={{ opacity: 1 }}
                                transition={{ type: "tween", duration: 1, ease: easeInOut }}
                            >
                                <header className="washing__booking__card__header">
                                    <p className="washing__booking__card__type bold">{cards[activeCard]?.tier}</p>
                                    <p className="washing__booking__card__price bold">{cards[activeCard]?.price}</p>
                                </header>
                                <ul className="washing__booking__card__description-list">
                                    {cards[activeCard]?.items.map((item, index) => (
                                        <li key={index} className="washing__booking__card__description-item">
                                        <i className={item.included ? "washing__booking__card__description-icon-check fa-solid fa-check" : "washing__booking__card__description-icon-x  fa-solid fa-x"}></i>
                                        <p className="washing__booking__card__description-text">{item.name}</p>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="washing__booking__card__choose__package-group">
                                    <i className="washing__booking__card__choose__package-clock fa-regular fa-clock"></i>
                                    <p className="washing__booking__card__choose__package-text bold">{cards[activeCard]?.time}</p>
                                </ul>
                                <button onClick={addToCart} className="washing__booking__card__choose__package-btn">Välj paket</button>
                            </motion.article>
                            )
                        :
                            cards.map(item => (
                            <motion.article key={item.id} className="washing__booking__card">
                                <header className="washing__booking__card__header">
                                <p className="washing__booking__card__type bold">{item.tier}</p>
                                <p className="washing__booking__card__price bold">{item.price}</p>
                                </header>
                                <ul className="washing__booking__card__description-list">
                                {item.items.map((item, index) => (
                                    <li key={index} className="washing__booking__card__description-item">
                                    <i className={item.included ? "washing__booking__card__description-icon-check fa-solid fa-check" : "washing__booking__card__description-icon-x  fa-solid fa-x"}></i>
                                    <p className="washing__booking__card__description-text">{item.name}</p>
                                    </li>
                                ))}
                                </ul>
                                <ul className="washing__booking__card__choose__package-group">
                                <i className="washing__booking__card__choose__package-clock fa-regular fa-clock"></i>
                                <p className="washing__booking__card__choose__package-text bold">{item.time}</p>
                                </ul>
                                <button onClick={addToCart} className="washing__booking__card__choose__package-btn">Välj paket</button>
                            </motion.article>
                            ))
                        }
                    </AnimatePresence>
                    
                </motion.section>
                <motion.i whileHover={{ opacity: 0.8, scale: 1.2, cursor: 'pointer'}} whileTap={{scale: 0.8}} onClick={nextCard} className="prevIcon fa-solid fa-chevron-right"></motion.i>
            </motion.section>
        </>
    )
}

export default HomeBooking
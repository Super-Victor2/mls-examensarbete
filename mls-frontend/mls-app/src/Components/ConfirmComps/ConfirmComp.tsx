import './ConfirmComp.css'
import { useEffect, useState } from "react";

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

function ConfirmComp() {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [selectedTime, setSelectedTime] = useState();
    const [email, setEmail] = useState('')


    useEffect(() => {
            const storedCard = sessionStorage.getItem("selectedCard");
            if (storedCard) {
              setSelectedCard(JSON.parse(storedCard));
            }

            const selectedTime = sessionStorage.getItem("selectedTime")
            if (selectedTime) {
                setSelectedTime(JSON.parse(selectedTime));
            }
            
            const storedEmail = sessionStorage.getItem("email");
            if (storedEmail) {
                setEmail(storedEmail)
            }
            
        }, []);

        const cancelOrder = () => {
            window.location.href = "/"
            sessionStorage.removeItem("selectedCard")
        }

    return (
        <>
            <main className="confirm__section">
                <section className="personal__section">
                    <h3 className="personal__section-title bold">Mina kontaktuppgifter</h3>
                    <div className="personal__section-input-group">
                        <div className="personal__section-input-label-group">
                            <label htmlFor="fname" className="personal__section-label bold">Förnamn</label>
                            <input type="text" id='fname' placeholder='Förnamn' className="personal__section-input" />
                        </div>
                        <div className="personal__section-input-label-group">
                            <label htmlFor="lname" className="personal__section-label bold">Efternamn</label>
                            <input type="text" id='lname' placeholder='Efternamn' className="personal__section-input" />
                        </div>
                        <div className="personal__section-input-label-group">
                            <label htmlFor="tel" className="personal__section-label bold">Telefonnummer</label>
                            <input type="text" id='tel' placeholder='Telefonnummer' className="personal__section-input" />
                        </div>
                        <div className="personal__section-input-label-group">
                            <label htmlFor="email" className="personal__section-label bold">Email</label>
                            <p id='email' className="personal__section-email">{email}</p>
                        </div>
                        
                    </div>
                </section>
                <section className="comment__section">
                    <h3 className="comment__section-title bold">Skriv en kommentar</h3>
                    <input type="text" placeholder='Skriv här' className="comment__section-input-field" />
                </section>
                <section className="terms__section">
                    <h3 className="terms__section-title bold">Vilkor</h3>
                    <div className="terms__section-group-terms-accept">
                        <p className="terms__section-group-terms-accept-title">Jag godkänner vilkoren</p>
                        <input type="checkbox" className="terms__section-group-terms-accept-checkbox" />
                    </div>
                    <div className="terms__section-group-payment">
                        <p className="terms__section-group-payment-title bold">Betalsätt</p>
                        <p className="terms__section-group-payment-text">Betala på plats</p>
                    </div>
                </section>
                <section className="program__info__section">
                    <div className="program__info-text__wrapper">
                        <p className="program__info__wrapper-tier">{selectedCard ? selectedCard.tier : "Inget program valt"}</p>
                        <p className="program__info__wrapper-price">{selectedCard ? selectedCard.price : "Inget program valt"}</p>
                        <p className="program__info__wrapper-time">{selectedCard ? selectedCard.time : "Inget program valt"}</p>
                        <p className="program__info__wrapper-date">{selectedTime ? selectedTime : "Inget program valt"}</p>
                        <p className="program__info__wrapper-included">
                            {selectedCard ? (
                                selectedCard.items
                                .filter((item) => item.included)
                                .map((item) => item.name)
                                .join(", ")
                            ) : (
                                "Inget program valt"
                            )}
                        </p>
                    </div>
                    <button onClick={cancelOrder} className="program__info__wrapper-btn">Avbryt</button>
                </section>
                <button className="program__info__section-btn">Slutför Bokning</button>
            </main>
        </>
    )
}

export default ConfirmComp
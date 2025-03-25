import axios from 'axios';
import './ConfirmComp.css'
import { useEffect, useState } from "react";

interface User {
    firstname: string,
    lastname: string,
    tel: string
}

interface Order {
    orderId: string,
    items: Card[],
    date: string,
    email: string,
    status: string,
}

interface Card {
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

async function CreateOrder(order: Order): Promise<void> {
    try {
        const response = await axios.post("https://tm2znos4mf.execute-api.eu-north-1.amazonaws.com/orders", order, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        })

        console.log("Order created:", response.data);
        alert("Bokning slutförd");

    } catch (error: any) {
        console.error("Error creating order:");
        alert("Ett fel uppstod vid bokning");
    }
}

async function UpdateUser(user: User): Promise<void> {
    try {
        const response = await axios.put("https://tm2znos4mf.execute-api.eu-north-1.amazonaws.com/user", user, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        })

        console.log("User updated:", response.data)
    } catch (error: any) {
        console.error("Error updating user:");
    }
}

function ConfirmComp() {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | undefined>();
    const [email, setEmail] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [tel, setTel] = useState('')
    const [epost, setEpost] = useState('')
    const [errors, setErrors] = useState({firstname: false, lastname: false, tel: false, epost: false, checked: false});
    const [checked, setChecked] = useState(false);

    useEffect(() => {
            const storedCard = sessionStorage.getItem("selectedCard");
            if (storedCard) {
              setSelectedCard(JSON.parse(storedCard));
            }

            const selectedTime = sessionStorage.getItem("selectedTime");
            if (selectedTime) {
                setSelectedTime(selectedTime);
            }

            const storedEmail = sessionStorage.getItem("email");
            if (storedEmail) {
                setEmail(storedEmail);
            }
    }, []);
    
    const handleOrder = () => {
        const newErrors = {
            firstname: !firstname.trim(),
            lastname: !lastname.trim(),
            tel: !tel.trim(),
            epost: !epost.trim(),
            checked: !checked,
        };

        if (!epost.includes("@") || !epost.includes(".com")) {
            alert("E-postadress måste innehålla '@' och '.com'");
            newErrors.epost = true;
        }

        setErrors(newErrors);
        const orderId = Date.now().toString();

        if (!Object.values(newErrors).includes(true)) {
            const sendOrder: Order = {
                orderId,
                items: selectedCard ? [{
                    items: selectedCard.items || [],
                    price: selectedCard.price,
                    time: selectedCard.time,
                    type: selectedCard.type,
                    tier: selectedCard.tier,
                }] : [],
                date: selectedTime || "",
                email: email,
                status: "pending",
            };

            const sendUser: User = {
                firstname: firstname,
                lastname: lastname,
                tel: tel
            }

            console.log("Order to be sent:", sendOrder); 
            console.log("User to be updated:", sendUser);
            CreateOrder(sendOrder);
            UpdateUser(sendUser);
            window.location.href = "/";
        }
    }

    return (
        <>
            <main className="confirm__section">
                <section className="personal__section">
                    <h3 className="personal__section-title bold">Mina kontaktuppgifter</h3>
                    <div className="personal__section-input-group">
                        <div className="personal__section-input-label-group">
                            <label htmlFor="fname" className="personal__section-label bold">Förnamn**</label>
                            <input value={firstname} onChange={(e) => setFirstName(e.target.value)} type="text" id='fname' placeholder='Förnamn*' className={errors.firstname ? "personal__section-input-error" : "personal__section-input"} />
                        </div>
                        <div className="personal__section-input-label-group">
                            <label htmlFor="lname" className="personal__section-label bold">Efternamn*</label>
                            <input value={lastname} onChange={(e) => setLastName(e.target.value)} type="text" id='lname' placeholder='Efternamn*' className={errors.lastname ? "personal__section-input-error" : "personal__section-input"} />
                        </div>
                        <div className="personal__section-input-label-group">
                            <label htmlFor="tel" className="personal__section-label bold">Telefonnummer*</label>
                            <input value={tel} onChange={(e) => setTel(e.target.value)} type="text" id='tel' placeholder='Telefonnummer*' className={errors.tel ? "personal__section-input-error" : "personal__section-input"} />
                        </div>
                        <div className="personal__section-input-label-group">
                            <label htmlFor="email" className="personal__section-label bold">Email*</label>
                            <input value={epost} onChange={(e) => setEpost(e.target.value)} type="email" id='email' placeholder='E-postadress*' className={errors.epost ? "personal__section-input-error" : "personal__section-input"} />
                        </div>
                    </div>
                </section>
                <section className="comment__section">
                    <h3 className="comment__section-title bold">Skriv en kommentar</h3>
                    <textarea maxLength={200} className="comment__section-input-field" name="comment" id="comment" placeholder='Skriv här' ></textarea>
                </section>
                <section className="terms__section">
                    <h3 className="terms__section-title bold">Vilkor</h3>
                        <p className={errors.checked ?"terms__section-group-terms-accept-error-text" : "terms__section-group-terms-accept-error-text-hidden"}>Du måste acceptera vilkoren</p>
                    <div className="terms__section-group-terms-accept">
                        <label className="terms__section-group-terms-accept-title">Jag godkänner <a href="#" className="terms__section-group-terms-accept-link">vilkoren</a></label>
                        <input onClick={() => setChecked(!checked)} type="checkbox" className={errors.checked ? "terms__section-group-terms-accept-checkbox-error" : "terms__section-group-terms-accept-checkbox"} />
                    </div>
                    <div className="terms__section-group-payment">
                        <h3 className="terms__section-group-payment-title bold">Betalsätt</h3>
                        <p className="terms__section-group-payment-text">Betala på plats</p>
                    </div>
                </section>
                <section className="program__info__section">
                    <div className="program__info-text__wrapper">
                        <p className="program__info__wrapper-tier bold">{selectedCard ? selectedCard.tier : "Inget program valt"}</p>
                        <p className="program__info__wrapper-price bold">{selectedCard ? selectedCard.price : "Inget program valt"}</p>
                        <p className="program__info__wrapper-time bold">{selectedCard ? selectedCard.time : "Inget program valt"}</p>
                        <p className="program__info__wrapper-date bold">{selectedTime ? selectedTime : "Inget program valt"}</p>
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
                </section>
                <div className="program__info__section-btn-wrapper">
                    <p className={errors.firstname || errors.lastname || errors.tel || errors.epost || errors.checked ? "program__info-section-btn-error-text" : "program__info-section-btn-text"}>Du måste fylla i alla uppgifter</p>
                    <button onClick={handleOrder} className="program__info__section-btn">Slutför Bokning</button>
                </div>
            </main>
        </>
    )
}

export default ConfirmComp
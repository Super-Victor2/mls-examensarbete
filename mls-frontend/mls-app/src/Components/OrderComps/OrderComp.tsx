import './OrderComp.css'
import { DayPicker } from "react-day-picker";
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

function OrderComp() {
    const [selected, setSelected] = useState<Date>();
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    const pickTime = () => {
        if (!selected) {
            alert("Välj tid");
        } else {
            const formattedDate = selected.toLocaleDateString().split("T")[0];
            sessionStorage.setItem("selectedTime", formattedDate); 
            window.location.href = "/ConfirmOrderPage";
        }
    };

    useEffect(() => {
        const storedCard = sessionStorage.getItem("selectedCard");
        if (storedCard) {
          setSelectedCard(JSON.parse(storedCard));
        }
    }, []);

    const cancelOrder = () => {
        window.location.href = "/"
        sessionStorage.removeItem("selectedCard")
    }

    return (
        <>
            <main className="order__date__section">
                <section className="order__date__wrapper">
                    <h1 className="order__date__wrapper-title">Välj en tid</h1>
                    <p className="order__date__wrapper-text">Bilen måste lämnas innan kl 10, hämtas senast <br /> kl 20 samma dag. Dagar som är gråa går ej att <br /> boka.  Endast lördag och söndagar! </p>
                        <DayPicker
                        captionLayout="dropdown"
                            showOutsideDays
                            showWeekNumber
                            fixedWeeks
                            animate
                            mode="single"
                            weekStartsOn={1}
                            disabled={{ dayOfWeek: [1, 2, 3, 4, 5]}}
                            selected={selected}
                            onSelect={setSelected}
                            footer={
                                selected ? `Selected: ${selected.toLocaleDateString()}` : ""
                            }
                        />
                    <button onClick={pickTime} className="order__date__wrapper-btn">Välj tid</button>
                </section>
                <section className="order__info__section">
                    <div className="order__info-text__wrapper">
                        <p className="order__info__wrapper-tier">{selectedCard ? selectedCard.tier : "Inget program valt"}</p>
                        <p className="order__info__wrapper-price">{selectedCard ? selectedCard.price : "Inget program valt"}</p>
                        <p className="order__info__wrapper-time">{selectedCard ? selectedCard.time : "Inget program valt"}</p>
                        <p className="order__info__wrapper-included">
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
                    <button onClick={cancelOrder} className="order__info__wrapper-btn">Avbryt</button>
                </section>
            </main>
        </>
    )
}

export default OrderComp
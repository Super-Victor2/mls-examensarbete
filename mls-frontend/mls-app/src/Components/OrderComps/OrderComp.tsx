import './OrderComp.css'
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import useStore from '../Store/store';

function OrderComp() {
    const [selected, setSelected] = useState<Date>();
    const cart = useStore((state) => state.cart)

    const pickTime = () => {
        if(!selected) {
            alert("välj tid")
        } else {
            alert(selected)
            window.location.href = "/ConfirmOrderPage"
        }
    }

    const cancelOrder = () => {
        window.location.href = "/"
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
                <section className="order__info__wrapper">
                    <button onClick={cancelOrder} className="order__info__wrapper-btn">Avbryt</button>
                </section>
            </main>
        </>
    )
}

export default OrderComp
import axios from 'axios';
import './OrdersComp.css'
import { useState, useEffect } from 'react';
import DateVector from '../../assets/DateVector.svg';

interface OrderResponse {
    data: Order[];
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

function OrdersComp() {
    const [cards, setCards] = useState<Order[]>([]);
    const [account, setAccount] = useState<string>("");

    useEffect(() => {
        axios.get<OrderResponse>("https://tm2znos4mf.execute-api.eu-north-1.amazonaws.com/orders", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        })
        .then(response => {
            console.log("Orders fetched:", response.data);
            setCards(response.data.data);
        })
        .catch(error => console.error(error));
    }, []);

    const handleCancel = (orderId : string) => {
        axios.delete(`https://tm2znos4mf.execute-api.eu-north-1.amazonaws.com/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        })
        .then(response => {
            console.log("Order cancelled:", response.data);
            setCards(cards.filter((order) => order.orderId !== orderId));
        })
        .catch(error => console.error(error));
    }

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        if (storedEmail) {
            setAccount(storedEmail);
        }
    })

    return (
        <>
            <main className="orders__section">
                <h1 className="order__section-title">Dina bokningar</h1>
                {account ? (
                    cards.length > 0 ? (
                        cards.map((order) => (
                            <div key={order.orderId} className="orders__card">
                                <img src={DateVector} alt="Date Icon" className="orders__card-vector" />
                                <div className="orders__card-text-flexbox">
                                    <div className="orders__card-info-text-wrapper">
                                        <p className="orders__card-tier bold">{order.items.map((item) => item.tier)}</p>
                                        <p className="orders__card-date bold">{order.date}</p>
                                        <p className="orders__card-status-pending">{order.status}</p>
                                    </div>
                                    {order.items.map((item, index) => (
                                        <div key={index} className="orders__card-included-wrapper">
                                            {item.items
                                            .filter((item) => item.included)
                                            .map((item) => item.name)
                                            .join(", ")}
                                        </div>
                                    ))}
                                    <button onClick={() => handleCancel(order.orderId)} className="orders__card-btn">Avboka</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="orders__no-orders">Du har inga bokningar</p>
                    )
                ) : (
                    <p className="orders__no-orders">Du måste vara inloggad för att se och hantera dina bokningar</p>
                )}
            </main>
        </>
    )
}

export default OrdersComp
import { useEffect, useState } from 'react';
import './UserComp.css'
import axios from 'axios';

interface OrderResponse {
    data: Data[];
}

interface Data {
    id: string,
    items: Card[],
}

interface Card {
    items: cardItems[];
    price: string;
    time: string;
    type: string;
    tier: string;
}

interface cardItems {
    name: string;
    included: boolean;
}

interface User {
    firstname: string,
    lastname: string,
    tel: string
}

async function CreateMenu(menu: Data): Promise<void> {
    console.log("Menu card to be created:", menu);
    try {
        const response = await axios.post<OrderResponse>("https://tm2znos4mf.execute-api.eu-north-1.amazonaws.com/admin/menu", menu, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        })

        console.log("Menu card created:", response.data);
        alert("Menu card skapad");

    } catch (error: any) {
        console.error("Error creating order:");
        alert("Ett fel uppstod vid skapandet av menu card");
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

function UserComp() {
    const [email, setEmail] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [tel, setTel] = useState('')
    const [admin, setAdmin] = useState(false)
    const [errors, setErrors] = useState({price: false, time: false, type: false, tier: false, items: false});
    const [price, setPrice] = useState('')
    const [time, setTime] = useState('')
    const [type, setType] = useState('')
    const [tier, setTier] = useState('')
    const [items, setItems] = useState<{ name: string; included: boolean }[]>([]);
    const [currentName, setCurrentName] = useState('');
    const [currentIncluded, setCurrentIncluded] = useState(false);
    const [id, setId] = useState('')
    
    useEffect(() => {
            const storedEmail = sessionStorage.getItem("email");
            if (storedEmail) {
                setEmail(storedEmail)
            }

            const storedToken = sessionStorage.getItem("token");
            if (storedToken) {
                const decodedToken = JSON.parse(atob(storedToken.split('.')[1]));
                setAdmin(decodedToken.isAdmin);
            }
    }, []);

    const addItem = () => {
        if (!currentName.trim()) {
            alert("Namn måste fyllas i!");
            return;
        }
    
        setItems([...items, { name: currentName, included: currentIncluded }]);
        setCurrentName('');
        setCurrentIncluded(false);
    };
    
    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleMenu = () => {
        const newErrors = {
            price: !price.trim(),
            time: !time.trim(),
            type: !type.trim(),
            tier: !tier.trim(),
            name: false,
            items: items.length === 0,
        };
    
        setErrors(newErrors);
    
        if (Object.values(newErrors).includes(true)) {
            alert("Alla fält måste fyllas i!");
            return;
        }
    
        const id = Date.now().toString();
        const sendOrder: Data = {
            id,
            items: [
                {
                    items: items,
                    price: price,
                    time: time,
                    type: type,
                    tier: tier,
                },
            ],
        };
    
        CreateMenu(sendOrder);
    };

    const handleLogout = () => {
        sessionStorage.clear()
        window.location.href = "/";
    }

    const handleUser = () => {
        const sendUser: User = {
            firstname: firstname,
            lastname: lastname,
            tel: tel
        }
        alert("Användare uppdaterad");
        UpdateUser(sendUser);
    }

    const handleRemoveMenu = (id: string) => {
        axios.delete(`https://tm2znos4mf.execute-api.eu-north-1.amazonaws.com/admin/menu/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            }
        })
        .then(response => {
            console.log("Menu card removed:", response.data);
            alert("Menu card borttagen");
        })
        .catch(error => console.error(error));
    }

    return (
        <>
            {admin ? (
                <main>
                    <section className="admin__section">
                        <h1 className="admin__section-title">Skapa meny kort</h1>
                        <form className="menu__card-form">
                            <label htmlFor="price" className="menu__card-form-label">Pris *</label>
                            <input
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                type="text"
                                id="price"
                                placeholder="Pris"
                                className={errors.price ? "menu__card-input-error" : "menu__card-input"}
                            />

                            <label htmlFor="time" className="menu__card-form-label">Tid *</label>
                            <input
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                type="text"
                                id="time"
                                placeholder="Tid"
                                className={errors.time ? "menu__card-input-error" : "menu__card-input"}
                            />

                            <label htmlFor="type" className="menu__card-form-label">Typ *</label>
                            <input
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                type="text"
                                id="type"
                                placeholder="Typ"
                                className={errors.type ? "menu__card-input-error" : "menu__card-input"}
                            />

                            <label htmlFor="tier" className="menu__card-form-label">Nivå *</label>
                            <input
                                value={tier}
                                onChange={(e) => setTier(e.target.value)}
                                type="text"
                                id="tier"
                                placeholder="Nivå"
                                className={errors.tier ? "menu__card-input-error" : "menu__card-input"}
                            />
                            <label htmlFor="name" className="menu__card-form-label">Namn *</label>
                            <input
                                value={currentName}
                                onChange={(e) => setCurrentName(e.target.value)}
                                type="text"
                                id="name"
                                placeholder="Namn"
                                className={errors.items ? "menu__card-input-error" : "menu__card-input"}
                            />
                            <label htmlFor="included" className="menu__card-form-label">Included?</label>
                            <input
                                type="checkbox"
                                id="included"
                                checked={currentIncluded}
                                onChange={(e) => setCurrentIncluded(e.target.checked)}
                                className="menu__card-checkbox"
                            />
                            <button type="button" onClick={addItem} className="menu__card-form-btn">Lägg till item</button>
                            <ul>
                                {items.map((item, index) => (
                                    <li key={index}>
                                        {item.name} - {item.included ? "Included" : "Not included"}
                                        <button type="button" onClick={() => removeItem(index)}>Ta bort</button>
                                    </li>
                                ))}
                            </ul>

                            <button type="button" onClick={handleMenu} className="menu__card-form-btn">Skapa meny kort</button>
                            <button onClick={handleLogout} className="user__logout__section-btn">Logga ut</button>
                        </form>
                        <form className="menu__remove-form">
                            <label htmlFor="remove" className="menu__remove-form-label">Ta bort meny kort</label>
                            <input value={id} onChange={(e) => setId(e.target.value)} type="text" id="remove" placeholder="ID" className="menu__remove-form-input"/>
                            <button type="button" className="menu__remove-form-btn" onClick={() => handleRemoveMenu(id)}>Ta bort</button>
                        </form>
                    </section>
                </main>
            ) : (
                <main className="user__section">
                    <section className="user__section-form-wrapper">
                        <div className="user__section-form-email-wrapper">
                            <h1 className="user__section-form-email-title bold">E-post</h1>
                            <p className="user__section-form-email">{email}</p>
                        </div>
                        <h1 className="user__section-form-info">Personlig information</h1>
                        <form className="user__section-form">
                            <label htmlFor="fname">Förnamn *</label>
                            <input value={firstname} onChange={(e) => setFirstName(e.target.value)} type="text" id='fname' placeholder='Förnamn' className="user__section-form-input" />
                            <label htmlFor="lname">Efternamn *</label>
                            <input value={lastname} onChange={(e) => setLastName(e.target.value)} type="text" id='lname' placeholder='Efternamn' className="user__section-form-input" />
                            <label htmlFor="tel">Telefonnummer</label>
                            <input value={tel} onChange={(e) => setTel(e.target.value)} type="text" id='tel' placeholder='Telefonnummer' className="user__section-form-input" />
                        </form>
                        <button onClick={handleUser} className="user__section-form-btn">Spara</button>
                        <h1 className="user__logout__section-title">Logga ut</h1>
                        <button onClick={handleLogout} className="user__logout__section-btn">Logga ut</button>
                    </section>
                </main>
            )}
        </>
    )
}

export default UserComp
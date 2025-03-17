import { useEffect, useState } from 'react';
import './UserComp.css'
import { Link } from 'react-router-dom';

function UserComp() {
    const [email, setEmail] = useState('')
    
    useEffect(() => {
            const storedEmail = sessionStorage.getItem("email");
            if (storedEmail) {
                setEmail(storedEmail)
            }

        }, []);

    const handleLogout = () => {
        sessionStorage.clear()
        window.location.href = "/";
    }

    return (
        <>
            <main className="user__section">
                <section className="user__section-form-wrapper">
                    <div className="user__section-form-email-wrapper">
                        <h1 className="user__section-form-email-title bold">E-post</h1>
                        <p className="user__section-form-email">{email}</p>
                    </div>
                    <h1 className="user__section-form-info">Personlig information</h1>
                    <form className="user__section-form">
                        <label htmlFor="fname">Förnamn *</label>
                        <input type="text" id='fname' placeholder='Förnamn' className="user__section-form-input" />
                        <label htmlFor="lname">Efternamn *</label>
                        <input type="text" id='lname' placeholder='Efternamn' className="user__section-form-input" />
                    </form>
                    <button className="user__section-form-btn">Spara</button>
                    <h1 className="user__logout__section-title">Logga ut</h1>
                    <button onClick={handleLogout} className="user__logout__section-btn">Logga ut</button>
                </section>
            </main>
        </>
    )
}

export default UserComp
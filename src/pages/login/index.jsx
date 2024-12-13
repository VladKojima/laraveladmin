import { useState } from "react";
import style from './style.module.css';
import { api } from "../../api/api";

export function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function submit(event) {
        event.preventDefault();

        api.post("/login", { email, password })
            .then(res => {
                sessionStorage.setItem("token", res.data.token);
                onLogin();
            });
    }

    return <form className={style.form} onSubmit={submit}>
        <input value={email} onChange={({ target: { value } }) => setEmail(value)} placeholder="email" />
        <input value={password} onChange={({ target: { value } }) => setPassword(value)} placeholder="password" />

        <button type="submit">Войти</button>
    </form>
}
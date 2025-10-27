import { useState } from "react";
import style from "./Menu.module.css"
import Link from 'next/link'
export default function Menu(){
    const [open, setOpen] = useState(false);
    return(
            <div className={style.Menu}>
            <ul className={`${style.menuLinks} ${open ? style.active : ""}`}>
        <li><Link href="/nu">Início</Link></li>
        <li><Link href="/transacoes">Transações</Link></li>
        </ul>
        
        <button className={style.btnToggle} onClick={() => setOpen(!open)}>
        ☰
        </button>
        </div>
    );
}
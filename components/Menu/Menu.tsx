"use client";
import { useState } from "react";
import style from "./Menu.module.css"
import Link from 'next/link'
import { useIsMobile } from "@/hooks/useIsMobile";
export default function Menu() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("inicio");
    const isMobile = useIsMobile();
    
    return (
        <div className={style.Menu}>

            {isMobile ? (
                <>
                    <ul className={`${style.menuLinks} ${open ? style.active : style.inactive}`}>
                        <li
                            className={`${style.menuItem} ${active === "inicio" ? style.activeItem : ""}`}
                            onClick={() => setActive("inicio")}
                        >
                            <Link href="/">Início</Link>
                        </li>

                        <li
                            className={`${style.menuItem} ${active === "transacoes" ? style.activeItem : ""}`}
                            onClick={() => setActive("transacoes")}
                        >
                            <Link href="/transacoes">Transações</Link>
                        </li>
                    </ul>

                    <button className={style.btnToggle} onClick={() => setOpen(!open)}>
                        ☰
                    </button>
                </>
            ) : (
                <ul className={style.menuLinks}>
                    <li
                        className={`${style.menuItem} ${active === "inicio" ? style.activeItem : ""}`}
                        onClick={() => setActive("inicio")}
                    >
                        <Link href="/">Início</Link>
                    </li>

                    <li
                        className={`${style.menuItem} ${active === "transacoes" ? style.activeItem : ""}`}
                        onClick={() => setActive("transacoes")}
                    >
                        <Link href="/transacoes">Transações</Link>
                    </li>
                </ul>
            )}
        </div>
    );
}
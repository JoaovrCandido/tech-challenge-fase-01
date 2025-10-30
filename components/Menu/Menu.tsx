"use client";
import { useState } from "react";
import style from "./Menu.module.css";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePathname } from "next/navigation";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();

  // função pra fechar o menu
  const handleLinkClick = () => {
    if (isMobile) setOpen(false);
  };

  return (
    <div className={style.Menu}>
      {isMobile ? (
        <>
          <button className={style.btnToggle} onClick={() => setOpen(!open)}>
            ☰
          </button>

          <ul
            className={`${style.menuLinks} ${
              open ? style.active : style.inactive
            }`}
          >
            <li
              className={`${style.menuItem} ${
                pathname === "/" ? style.activeItem : ""
              }`}
            >
              <Link href="/" onClick={handleLinkClick}>
                Início
              </Link>
            </li>

            <li
              className={`${style.menuItem} ${
                pathname === "/transacoes" ? style.activeItem : ""
              }`}
            >
              <Link href="/transacoes" onClick={handleLinkClick}>
                Transações
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <ul className={style.menuLinks}>
          <li
            className={`${style.menuItem} ${
              pathname === "/" ? style.activeItem : ""
            }`}
          >
            <Link href="/">Início</Link>
          </li>

          <li
            className={`${style.menuItem} ${
              pathname === "/transacoes" ? style.activeItem : ""
            }`}
          >
            <Link href="/transacoes">Transações</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

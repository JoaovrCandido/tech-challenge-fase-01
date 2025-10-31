"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useIsMobile } from "@/hooks/useIsMobile";

import style from "./Menu.module.css";

interface MenuItem {
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { label: "Início", path: "/" },
  { label: "Transações", path: "/transacoes" },
];

export default function Menu() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const renderLinks = () => (
    <ul
      className={`${style.menuLinks} ${
        isMobile ? (open ? style.active : style.inactive) : ""
      }`}
    >
      {menuItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <li
            key={item.path}
            className={`${style.menuItem} ${isActive ? style.activeItem : ""}`}
          >
            <Link href={item.path}>{item.label}</Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className={style.Menu}>
      {isMobile ? (
        <>
          {renderLinks()}

          <button
            className={style.btnToggle}
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            ☰
          </button>
        </>
      ) : (
        renderLinks()
      )}
    </div>
  );
}


"use client";

import { useAccessibility } from "@/contexts/AccessibilityProvider";
import Header from "./components/Header/Header"; // Importe o componente "burro" que refatoramos

// Este é o componente que sua aplicação vai importar
export function HeaderContainer() {
  // 1. Pega as funções do contexto
  const { toggleDarkMode, toggleChangeFontSize } = useAccessibility();

  // 2. Renderiza o componente de apresentação "burro"
  //    passando as funções e o título que você quiser.
  return (
    <Header
      title="Banco FIAP"
      onToggleDarkMode={toggleDarkMode}
      onToggleFontSize={toggleChangeFontSize}
    />
  );
}
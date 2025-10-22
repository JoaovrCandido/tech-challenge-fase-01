"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// 1. Defina o "formato" dos dados que o contexto irá fornecer
interface AccessibilityContextType {
  theme: "light" | "dark";
  fontLevel: 0 | 1 | 2;
  toggleDarkMode: () => void;
  toggleChangeFontSize: () => void;
}

// 2. Crie o Context
// O valor inicial 'undefined' garante que o app quebre se você tentar
// usar o contexto sem um <Provider> por volta dele.
const AccessibilityContext = createContext<AccessibilityContextType | undefined>(
  undefined
);

// 3. Crie o componente Provider
interface AccessibilityProviderProps {
  children: ReactNode;
}

export function AccessibilityProvider({
  children,
}: AccessibilityProviderProps) {
  // Estado para o tema
  const [theme, setTheme] = useState<"light" | "dark">("light");
  // Estado para o nível da fonte
  const [fontLevel, setFontLevel] = useState<0 | 1 | 2>(0);

  // Função para alternar o tema
  const toggleDarkMode = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Função para alternar a fonte
  const toggleChangeFontSize = () => {
    // Alterna entre 0, 1 e 2
    setFontLevel((prevLevel) => ((prevLevel + 1) % 3) as 0 | 1 | 2);
  };

  // Efeito para aplicar o TEMA (dark/light)
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      // 🌙 Modo escuro
      root.style.setProperty("--color-bg", "#222222");
      root.style.setProperty("--color-text", "#f4f6f2");
      root.style.setProperty("--color-primary", "#0c6779");
      root.style.setProperty("--color-primary-light", "#004D61");
      root.style.setProperty("--color-secondary", "#333333");
    } else {
      // ☀️ Modo claro
      root.style.setProperty("--color-bg", "#e8f0e8");
      root.style.setProperty("--color-text", "#222222");
      root.style.setProperty("--color-primary", "#004D61");
      root.style.setProperty("--color-primary-light", "#0c6779");
      root.style.setProperty("--color-secondary", "#f4f6f2");
    }
  }, [theme]); // Roda sempre que o 'theme' mudar

  // Efeito para aplicar o TAMANHO DA FONTE
  useEffect(() => {
    const root = document.documentElement;

    switch (fontLevel) {
      case 0:
        // 🔹 Padrão
        root.style.setProperty("--font-size-sm", "0.875rem");
        root.style.setProperty("--font-size-md", "1rem");
        root.style.setProperty("--font-size-lg", "1.25rem");
        root.style.setProperty("--font-size-xl", "1.5rem");
        break;
      case 1:
        // 🔸 Maior
        root.style.setProperty("--font-size-sm", "1rem");
        root.style.setProperty("--font-size-md", "1.15rem");
        root.style.setProperty("--font-size-lg", "1.5rem");
        root.style.setProperty("--font-size-xl", "1.8rem");
        break;
      case 2:
        // 🔹 Menor
        root.style.setProperty("--font-size-sm", "0.75rem");
        root.style.setProperty("--font-size-md", "0.9rem");
        root.style.setProperty("--font-size-lg", "1.1rem");
        root.style.setProperty("--font-size-xl", "1.3rem");
        break;
    }
  }, [fontLevel]); // Roda sempre que o 'fontLevel' mudar

  // 4. Monte o valor que será fornecido pelo context
  const value = {
    theme,
    fontLevel,
    toggleDarkMode,
    toggleChangeFontSize,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

// 5. Crie um Hook customizado (Boa prática)
// Isso facilita o consumo do contexto e já faz a verificação
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      "useAccessibility deve ser usado dentro de um AccessibilityProvider"
    );
  }
  return context;
}
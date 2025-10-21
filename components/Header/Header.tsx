import style from "./Header.module.css";
import Image from "next/image";
import alterarfonte from "../../public/alterarfonte.png";
import modoclaroescuro from "../../public/modoclaroescuro.png";

export default function Header() {
  return (
    <header className={style.header}>
      <h1>Banco FIAP</h1>
      <div className={style.acessibilidade}>
        <Image
          className={style.tamanhofonte}
          src={alterarfonte}
          width={35}
          height={35}
          alt="botão para alterar o tamanho da fonte"
          // id="alterarfont"
          // onClick={trocarTamanhoFonte}
        />
        <Image
          className={style.claroescuro}
          src={modoclaroescuro}
          width={40}
          height={40}
          alt="botão para alterar o tema entre escuro e claro"
          // id="claroescuro"
          // onClick={toggleDarkMode}
        />
      </div>
    </header>
  );
}

//Troca as cores, mudando de modo claro para escuro

//let darkMode = false;

//function toggleDarkMode() {
//darkMode = !darkMode;

//if (darkMode) {
// Modo escuro
//  document.documentElement.style.setProperty("--color-bg", "#222222");
//  document.documentElement.style.setProperty("--color-text", "#f4f6f2");
//  document.documentElement.style.setProperty("--color-primary", "#0c6779");
//  document.documentElement.style.setProperty(
//    "--color-primary-light",
//     "#004D61"
//   );
//   document.documentElement.style.setProperty("--color-secondary", "#333333");
//  } else {
// Modo claro que são as valores originais
//   document.documentElement.style.setProperty("--color-bg", "#e8f0e8");
//   document.documentElement.style.setProperty("--color-text", "#222222");
//   document.documentElement.style.setProperty("--color-primary", "#004D61");
//   document.documentElement.style.setProperty(
//     "--color-primary-light",
//     "#0c6779"
//   );
//   document.documentElement.style.setProperty("--color-secondary", "#f4f6f2");
// }
//}

//Oferece 3 tamanhos de fontes
// 0 = padrão, 1 = maior, 2 = menor

//let nivelFonte = 0;

// function trocarTamanhoFonte() {
//    nivelFonte = (nivelFonte + 1) % 3; // alterna entre 0, 1, 2

//    switch (nivelFonte) {
//      case 0: // padrão
//       document.documentElement.style.setProperty('--font-size-sm', '0.875rem');
//       document.documentElement.style.setProperty('--font-size-md', '1rem');
//       document.documentElement.style.setProperty('--font-size-lg', '1.25rem');
//       document.documentElement.style.setProperty('--font-size-xl', '1.5rem');
//      break;
//  case 1: // maior
//      document.documentElement.style.setProperty('--font-size-sm', '1rem');
//      document.documentElement.style.setProperty('--font-size-md', '1.15rem');
//      document.documentElement.style.setProperty('--font-size-lg', '1.5rem');
//      document.documentElement.style.setProperty('--font-size-xl', '1.8rem');
//      break;
//  case 2: // menor
//     document.documentElement.style.setProperty('--font-size-sm', '0.75rem');
//      document.documentElement.style.setProperty('--font-size-md', '0.9rem');
//      document.documentElement.style.setProperty('--font-size-lg', '1.1rem');
//      document.documentElement.style.setProperty('--font-size-xl', '1.3rem');
//      break;
// }
//}

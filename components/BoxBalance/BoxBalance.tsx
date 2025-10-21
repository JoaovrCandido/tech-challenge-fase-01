import Image from "next/image";
import TotalBalance from "../TotalBalance/TotalBalance";
import olhofechado from "../../public/olhofechado.png";
import style from "./BoxBalance.module.css";

export default function BoxBalance() {
  return (
    <div className={style.boxSaldo}>
      <h2 className={style.boasvindas}>Seja bem-vindo(a)!</h2>
      <p className={style.data} id="dataAtual"></p>
      // FUNÇÃO QUE CHAMA A DATA ATUAL
      <div className={style.saldo}>
        <div className={style.saldoeolho}>
          <h4 className={style.conta}>Saldo</h4>

          <Image
            className={style.imgolho}
            src={olhofechado}
            width={35}
            height={35}
            alt="Esconder ou mostrar saldo"
            // onClick={() => {
            // alternarSaldo();
            // toggleOlho();
            // }}
          />
        </div>

        <TotalBalance />
      </div>
    </div>
  );
}

//Carrega a data quando o site carrega

//  document.addEventListener("DOMContentLoaded", function() {
//    const dataElemento = document.getElementById('dataAtual');
//    const agora = new Date();

//    const diasSemana = [
//       'Domingo', 'Segunda-feira', 'Terça-feira',
//       'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
//    ];

//   const diaSemana = diasSemana[agora.getDay()];
//   const dia = String(agora.getDate()).padStart(2, '0');
//  const mes = String(agora.getMonth() + 1).padStart(2, '0');
//   const ano = agora.getFullYear();

//   dataElemento.textContent = `${diaSemana}, ${dia}/${mes}/${ano}`;
// });

//Fecha e abre o olho do saldo

//function toggleOlho() {
//    const olho = document.getElementById('olho');
//   if (olho.src.includes('olhofechado.png')) {
//       olho.src = 'olhoaberto.png';
//  } else {
//     olho.src = 'olhofechado.png';
// }
//}

//Esconde e mostra o saldo

//let saldoVisivel = true;

//function alternarSaldo() {
//    const valorSaldo = document.getElementById("valor-saldo");
//    saldoVisivel = !saldoVisivel;

//    if (saldoVisivel) {
//      valorSaldo.textContent = "R$ 2.500,00";
//   } else {
//        valorSaldo.textContent = "••••••";
//     }
// }

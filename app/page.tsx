import TotalBalance from '@/components/TotalBalance/TotalBalance';

import style from './home.module.css'

export default function Home() {
  return (
    <section>
      <h1 className={style.title}>Bem-vindo</h1>

      <br />

      <TotalBalance />
    </section>
  );
}

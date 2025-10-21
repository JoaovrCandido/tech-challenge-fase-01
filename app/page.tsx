import TotalBalance from "@/components/TotalBalance/TotalBalance";
import BoxBalance from "@/components/BoxBalance/BoxBalance";
import NewTransaction from "@/components/NewTransaction/NewTransaction";
import Menu from "@/components/Menu/Menu";

export default function Home() {
  return (
    <section>
      <BoxBalance />
      <NewTransaction />
    </section>
  );
}

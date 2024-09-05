import Head from "next/head";
import Calender from "@/components/calender";
import "@/styles/global.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Calender</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Calender />
      </main>

    </div>
  );
}

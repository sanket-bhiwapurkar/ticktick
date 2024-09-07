import AddModal from "@/components/addModal";
import Calender from "@/components/calender";
import "@/styles/global.css";
import { AddTickFormProvider } from "context/addTickFormContext";

export const metadata = {
  title: "TickTick",
};

export default function Page() {
  return (
    <main className="p-3">
      <AddTickFormProvider>
        <Calender variant="input" />
        <AddModal />
      </AddTickFormProvider>
    </main>
  );
}

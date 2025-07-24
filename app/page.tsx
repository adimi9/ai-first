import Image from "next/image";
import { OkrTable } from "@/components/okr-table";

export default function Home() {
  return (
    <div>
      <div>
        <Image
          src="/banner.png"
          alt="Mountains that everybody love"
          width={1600}
          height={200}
          className="w-full"
          priority
        />
      </div>

      <div className="px-4">
        <h1 className="mt-6 text-xl font-bold">Welcome to OKReator</h1>
        <p className="mb-4 text-muted-foreground">
          Align goals, track progress and achieve results. Get started by
          searching for objectives, or filter using team, priority or status. 
        </p>
        <OkrTable />
      </div>
    </div>
  );
}

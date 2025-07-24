import Image from "next/image";
import MgmtDashboard from "@/components/mgmt-dashboard";

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
        <div className="flex justify-between items-start pt-4 pb-2 flex-wrap gap-4 px-4">
          <div>
            <h1 className="mt-6 text-xl font-bold">Welcome to OKReator</h1>
            <p className="mb-4 text-muted-foreground">
              Align goals, track progress and achieve results.
            </p>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-3 text-xs space-y-1 w-fit min-w-[180px]">
            <div className="text-[11px] text-gray-500 mb-1 italic">
              *Progress is a simple average of key results as of now.
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#cc3336' }} />
              <span className="text-gray-800">Below 30%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#ff681e' }} />
              <span className="text-gray-800">30–59%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: '#069c56' }} />
              <span className="text-gray-800">60% and above</span>
            </div>
          </div>
        </div>

        <MgmtDashboard />
      </div>
    </div>
  );
}

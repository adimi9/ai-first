"use client";
import { useState, Component, useEffect } from "react";
import { Plus, Minus, RotateCcw } from "lucide-react";
import mermaid from "mermaid";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import { Button } from "@/components/ui/button";

export default function DependencyPage() {
  const [loading, setLoading] = useState(true);

  const graph = `
  flowchart TD
  subgraph Key_Objectives["Key Objectives by Domain"]
      DG["Digital Governance\n(O4-O9)"]
      RM["Risk Management\n(O10, O11, O12, O18)"]
      AUD["Audit\n(O17, O19)"]
      PSP["Procurement & Supplier\n(O1-O2, O13-O16)"]
      DI_UDG["Data Insight & Upskilling\n(O20, O21)"]
      HR["HR Modernisation\n(O37-O40)"]
  end

  %% Key Dependencies
  O4["O4: Cut down waiver by 30%"]
  O8["O8: Improve usability and accessibility"]
  O10["O10: Improve risk assessment capabilities"]
  O11["O11: Improve governance oversight"]
  O12["O12: Increase velocity of project reviews"]
  O18["O18: Foster proactive risk management"]
  O17["O17: Optimise audit efficiency"]
  O19["O19: Transform ICT audit capability"]
  O20["O20: Timely generation of insights"]
  O21["O21: Upskilling digital governance officers"]
  O37["O37: Establish clear job roles and capability standards"]
  O38["O38: HR Modernisation"]
  O39["O39: Improve Career mobility"]
  O40["O40: Performance & Career Framework (P&CF)"]
  
  %% Primary Flow with labels
  O4 --> |"Enables"| O5O6["O5/O6: Enable rapid systems"]
  O5O6 --> |"Facilitates"| O8
  O8 --> |"Accelerates"| O20
  O20 --> |"Informs"| O10
  O10 --> |"Enhances"| O11
  O11 --> |"Supports"| O12
  
  %% Cross-domain influences with labels
  PSP --> |"Enhances"| O5O6
  O21 --> |"Facilitates"| O10
  O21 --> |"Supports"| O18
  O4 --> |"Mitigates risk for"| O17
  O17 --> |"Informs"| O19
  O18 --> |"Supports"| O10
  O20 --> |"Supports"| O21
  
  %% HR Modernisation dependencies
  O38 --> |"Enables"| O37
  O37 --> |"Supports"| O21
  O38 --> |"Enables"| O40
  O40 --> |"Facilitates"| O39
  O20 --> |"Informs"| O37
  O39 --> |"Enhances"| O5O6
  O37 --> |"Supports"| O15["O15: Uplift procurement competencies"]
  O39 --> |"Supports"| O18
  
  %% Domain Connections
  DG -.-> O4
  DG -.-> O8
  RM -.-> O10
  RM -.-> O11
  RM -.-> O12
  RM -.-> O18
  AUD -.-> O17
  AUD -.-> O19
  DI_UDG -.-> O20
  DI_UDG -.-> O21
  HR -.-> O37
  HR -.-> O38
  HR -.-> O39
  HR -.-> O40

  classDef dg fill:#F0D9FF,stroke:#9E4784,stroke-width:2px
  classDef rm fill:#D8F3DC,stroke:#2D6A4F,stroke-width:2px
  classDef aud fill:#B5EAD7,stroke:#2D6A4F,stroke-width:2px
  classDef psp fill:#FFCFD2,stroke:#B5838D,stroke-width:2px
  classDef di_udg fill:#FEF9C3,stroke:#CA8A04,stroke-width:2px
  classDef hr fill:#DBEAFE,stroke:#2563EB,stroke-width:2px
  classDef domain fill:#EFEFEF,stroke:#555555,stroke-width:1px
  
  class O4,O8,O5O6 dg
  class O10,O11,O12,O18 rm
  class O17,O19 aud
  class PSP,O15 psp
  class O20,O21 di_udg
  class O37,O38,O39,O40 hr
  class DG,RM,AUD,PSP,DI_UDG,HR,Key_Objectives domain
  `;

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
    });
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="size-full p-4">
      <div className="relative size-full cursor-move">
        <TransformWrapper limitToBounds={false}>
          <Controls />
          <TransformComponent
            wrapperStyle={{ height: "100%", width: "100%" }}
            contentStyle={{ height: "100%", width: "100%" }}
          >
            <Mermaid chart={graph} />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}

function Controls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
      <Button variant="outline" size="icon" onClick={() => zoomIn()}>
        <Plus />
      </Button>
      <Button variant="outline" size="icon" onClick={() => zoomOut()}>
        <Minus />
      </Button>
      <Button variant="outline" size="icon" onClick={() => resetTransform()}>
        <RotateCcw />
      </Button>
    </div>
  );
}

class Mermaid extends Component<{ chart: string }> {
  componentDidMount() {
    mermaid.contentLoaded();
  }
  render() {
    return <div className="mermaid size-full">{this.props.chart}</div>;
  }
}

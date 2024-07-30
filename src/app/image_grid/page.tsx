"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

export default function Page() {
  const [type, setType] = useState<"v" | "hh" | "vv" | "vh" | "vhh" | "vvv">(
    "v"
  );
  const [w, setW] = useState(4);
  const [h, setH] = useState(3);

  //ASSUME NORMAL CSS without TAILWIND COMPATIBLE WITH ANY WEBSITE. Flexbox is ok
  const htmlCode = useMemo(() => {
    switch (type) {
      case "v":
        return `
<div style="aspect-ratio: 1 / 1; ">
<div style="aspect-ratio: ${h} / ${w};  height: 100%; margin-left: auto; margin-right: auto;">

</div>
</div>
        `;
      case "vv":
        return `
<div style="display: flex;  gap: 0.5rem;">
<div style="aspect-ratio: ${h} / ${w}; width: 100%;">

</div>
<div style="aspect-ratio: ${h} / ${w}; width: 100%;">

</div>
</div>`;
      case "hh":
        return `
<div style="display: flex;  gap: 0.5rem;">
<div style="aspect-ratio: ${w} / ${h}; width: 100%;">

</div>
<div style="aspect-ratio: ${w} / ${h}; width: 100%;">

</div>
</div>`;
      case "vh":
        return `
<div style="display: flex;  gap: 0.5rem;">
<div style="aspect-ratio: ${h} / ${w}; width: ${
          100 / (1 + (w * w) / h / h)
        }%; height: 100%;">

</div>
<div style="aspect-ratio: ${w} / ${h}; width: ${
          100 - 100 / (1 + (w * w) / h / h)
        }%;  height: 100%;">

</div>
</div>`;
      case "vhh":
        return `
<div style="display: flex;  gap: 0.5rem;">
<div style="width: ${100 / (1 + (w * w) / h / h / 2)}%; height: 100%;">

</div>
<div style="display: flex; flex-direction: column; gap: 0.5rem; width: ${
          100 - 100 / (1 + (w * w) / h / h / 2)
        }%;">
<div style="aspect-ratio: ${w} / ${h}; height: 100%;">

</div>
<div style="aspect-ratio: ${w} / ${h}; height: 100%;">

</div>
</div>
</div>`;
      case "vvv":
        return `
<div style="display: flex;  gap: 0.5rem;">
<div style="aspect-ratio: ${h} / ${w}; width: 100%;">

</div>
<div style="aspect-ratio: ${h} / ${w}; width: 100%;">

</div>
<div style="aspect-ratio: ${h} / ${w}; width: 100%;">

</div>
</div>`;
    }
  }, [type]);

  return (
    <div className="w-full max-w-screen-sm my-4 mx-auto">
      <Input
        type="number"
        value={w}
        onChange={(e) => setW(parseInt(e.target.value))}
      />
      <Input
        type="number"
        value={h}
        onChange={(e) =>
          parseInt(e.target.value) <= w && setH(parseInt(e.target.value))
        }
      />
      <Select value={type} onValueChange={(value) => setType(value as any)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Layout" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="v">v</SelectItem>
          <SelectItem value="hh">hh</SelectItem>
          <SelectItem value="vv">vv</SelectItem>
          <SelectItem value="vh">vh</SelectItem>
          <SelectItem value="vhh">vhh</SelectItem>
          <SelectItem value="vvv">vvv</SelectItem>
        </SelectContent>
      </Select>
      <p className="whitespace-pre-wrap">{htmlCode}</p>
      <ImageGrid type={type} w={w} h={h} />
    </div>
  );
}

type ImageGridProps = {
  type: "v" | "hh" | "vv" | "vh" | "vhh" | "vvv";
  w: number;
  h: number;
};
function ImageGrid({ type, w, h }: ImageGridProps) {
  switch (type) {
    case "v":
      return (
        <div className=" aspect-square border border-slate-500">
          <div
            style={{ aspectRatio: `${h}/${w}` }}
            className={`bg-slate-500 h-full mx-auto`}
          ></div>
        </div>
      );
    case "vv":
      return (
        <div className="flex border border-slate-500 gap-2">
          <div
            style={{ aspectRatio: `${h}/${w}` }}
            className=" bg-slate-500 w-full"
          ></div>
          <div
            style={{ aspectRatio: `${h}/${w}` }}
            className=" bg-slate-500 w-full"
          ></div>
        </div>
      );
    case "hh":
      return (
        <div className="flex border border-slate-500 gap-2">
          <div
            style={{ aspectRatio: `${w}/${h}` }}
            className=" bg-slate-500 w-full"
          ></div>
          <div
            style={{ aspectRatio: `${w}/${h}` }}
            className=" bg-slate-500 w-full"
          ></div>
        </div>
      );
    case "vh":
      return (
        <div className="flex border border-slate-500 gap-2">
          <div
            style={{
              aspectRatio: `${h}/${w}`,
              width: `${100 / (1 + (w * w) / h / h)}%`,
            }}
            className="bg-slate-500 h-full"
          ></div>
          <div
            style={{
              aspectRatio: `${w}/${h}`,
              width: `${100 - 100 / (1 + (w * w) / h / h)}%`,
            }}
            className=" bg-slate-500 h-full"
          ></div>
        </div>
      );
    case "vhh":
      return (
        <div className="flex border border-slate-500 gap-2">
          <div
            style={{ width: `${100 / (1 + (w * w) / h / h / 2)}%` }}
            className=" bg-slate-500 min-h-full"
          ></div>
          {/* solve gap with compromised aspect  */}
          <div
            style={{ width: `${100 - 100 / (1 + (w * w) / h / h / 2)}%` }}
            className="flex flex-col gap-2"
          >
            <div
              style={{ aspectRatio: `${w}/${h}` }}
              className=" bg-slate-500 h-full"
            ></div>
            <div
              style={{ aspectRatio: `${w}/${h}` }}
              className="bg-slate-500 h-full"
            ></div>
          </div>
        </div>
      );
    case "vvv":
      return (
        <div className="flex border border-slate-500 gap-2">
          <div
            style={{ aspectRatio: `${h}/${w}` }}
            className=" bg-slate-500 w-full"
          ></div>
          <div
            style={{ aspectRatio: `${h}/${w}` }}
            className=" bg-slate-500 w-full"
          ></div>
          <div
            style={{ aspectRatio: `${h}/${w}` }}
            className=" bg-slate-500 w-full"
          ></div>
        </div>
      );
  }
}

"use client";

import { useEditorContext } from "@/components/contexts/editor";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUp,
  Check,
  ChevronDown,
  CircleHelp,
  Cross,
  Loader2,
  Mail,
  SpellCheck,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const {
    query,
    setQuery,
    exemplary,
    guidance,
    draft,
    setDraft,
    article,
    setArticle,
  } = useEditorContext();

  const [operation, setOperation] = useState<"fix" | "ask">("fix");
  const [newDraft, setNewDraft] = useState("");
  const [status, setStatus] = useState<"waiting" | "idle">("idle");
  const [open, setOpen] = useState(false);
  const [fixQuery, setFixQuery] = useState(
    "Please return sentence with correct grammar and spell. Only return result."
  );

  const onFix = async () => {
    setStatus("waiting");
    if (!draft) return;
    try {
      const res = await fetch(
        `/api/cowriter/fix?input=${encodeURIComponent(
          draft
        )}&query=${encodeURIComponent(fixQuery)}`
      );
      const data = await res.json();
      console.log(data.text);
      setNewDraft(data.text);
      setOpen(true);
      setStatus("idle");
    } catch (error) {
      console.error(error);
      setStatus("idle");
    }
  };
  const onAsk = async () => {
    setStatus("waiting");
    if (!draft || !query) return;
    try {
      const res = await fetch(
        `/api/cowriter/ask?input=${encodeURIComponent(
          draft
        )}&query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      console.log(data.text);
      setNewDraft(data.text);
      setStatus("idle");
    } catch (error) {
      console.error(error);
      setStatus("idle");
    }
  };

  const accept = () => {
    setDraft(newDraft);
  };

  const EditorElem = (
    <div className="flex flex-col flex-grow gap-4">
      <Textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        className="flex-grow resize-none"
        placeholder="Write something..."
      />
      <Input
        value={operation === "fix" ? fixQuery : query}
        onChange={(e) =>
          operation === "fix"
            ? setFixQuery(e.target.value)
            : setQuery(e.target.value)
        }
        placeholder={
          operation === "fix" ? "How it should be fixed?" : "Ask a question..."
        }
      />
      <div className="flex justify-end gap-4 mb-4">
        <div className="flex items-center">
          {status === "idle" ? (
            operation === "fix" ? (
              <Button className={"rounded-r-none gap-4"} onClick={onFix}>
                <SpellCheck size={20} />
                Fix
              </Button>
            ) : (
              <Button className={"rounded-r-none gap-4"} onClick={onAsk}>
                <CircleHelp size={20} />
                Ask
              </Button>
            )
          ) : (
            <Button disabled className={"rounded-r-none gap-4"}>
              <Loader2 className="animate-spin" size={20} />
              Generating...
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className={"rounded-l-none border-l-0 px-2"}>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setOperation("fix")}>
                Fix
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOperation("ask");
                  setNewDraft("");
                }}
              >
                Ask
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );

  const onAccept = () => {
    setDraft(newDraft);
    setOpen(false);
  };

  const onReject = () => {
    setNewDraft(draft);
    setOpen(false);
  };

  return (
    <main className="flex flex-col gap-4 w-full flex-grow my-8 px-8">
      {operation === "fix" ? (
        EditorElem
      ) : (
        //
        <div className="flex gap-8 flex-grow">
          <div className="flex w-1/2">{EditorElem}</div>
          <div className="flex flex-col w-1/2">
            <h2 className="scroll-m-20  pb-2 pt-4 text-3xl font-semibold tracking-tight ">
              Feedback
            </h2>
            <ScrollArea className="flex-grow rounded-md border h-[calc(100vh-190px)]">
              <ReactMarkdown className="markdown flex-grow min-h-0 ">
                {newDraft}
              </ReactMarkdown>
            </ScrollArea>
          </div>
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col max-w-screen max-h-screen ">
          <DialogHeader>
            <DialogTitle>Accept Change?</DialogTitle>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto">
            <ReactDiffViewer oldValue={draft} newValue={newDraft} />
          </div>
          <DialogFooter className="justify-end">
            <Button variant="secondary" className={"gap-4"} onClick={onReject}>
              <X size={20} />
              Reject
            </Button>
            <Button className={"gap-4"} onClick={onAccept}>
              <Check size={20} />
              Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

"use client";

import { useEditorContext } from "@/components/contexts/editor";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ReactDiffViewer from "react-diff-viewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const {
    criteria,
    exemplary,
    guidance,
    draft,
    setDraft,
    article,
    setArticle,
  } = useEditorContext();

  const [newDraft, setNewDraft] = useState("");
  const [newArticle, setNewArticle] = useState("");
  const [diffView, setDiffView] = useState(true);

  const onFix = async () => {
    console.log(draft);
    const res = await fetch(
      `/api/cowriter/prettier?input=${encodeURIComponent(draft)}`
    );
    const data = await res.json();
    console.log(data.text);
    setNewDraft(data.text);
    setDiffView(true);
  };
  const onAppend = async () => {
    console.log(draft);
    const res = await fetch(
      `/api/cowriter/append?input=${encodeURIComponent(
        draft
      )}&criteria=${encodeURIComponent(criteria)}`
    );
    const data = await res.json();
    console.log(data.text);
    setNewDraft(data.text);
    setDiffView(true);
  };
  const onEvaluate = async () => {
    console.log(draft);
    const res = await fetch(
      `/api/cowriter/evaluate?input=${encodeURIComponent(
        draft
      )}&criteria=${encodeURIComponent(criteria)}`
    );
    const data = await res.json();
    console.log(data.text);
    setNewDraft(data.text);
    setDiffView(false);
  };

  const accept = () => {
    setDraft(newDraft);
  };
  const onFixArticle = async () => {
    const res = await fetch(
      `/api/cowriter/prettier?input=${encodeURIComponent(article)}`
    );
    const data = await res.json();
    console.log(data.text);
    setNewArticle(data.text);
    setDiffView(true);
  };
  const onGenerateArticle = async () => {
    const res = await fetch(
      `/api/cowriter/generate?input=${encodeURIComponent(
        article
      )}&exemplary=${encodeURIComponent(exemplary)}`
    );
    const data = await res.json();
    console.log(data.text);
    setNewArticle(data.text);
    setDiffView(true);
  };
  const onEvaluateArticle = async () => {
    const res = await fetch(
      `/api/cowriter/evaluate?input=${encodeURIComponent(
        article
      )}&criteria=${encodeURIComponent(criteria)}`
    );
    const data = await res.json();
    console.log(data.text);
    setNewArticle(data.text);
    setDiffView(false);
  };
  const acceptArticle = () => {
    setArticle(newArticle);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Tabs defaultValue="draft" className="w-full">
        <TabsList>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="article">Article</TabsTrigger>
        </TabsList>
        <TabsContent value="draft">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-4">
              <Button onClick={onFix}>Fix</Button>
              <Button onClick={onAppend}>Append</Button>
              <Button onClick={onEvaluate}>Evaluate</Button>
            </div>
            <div className="flex flex-col gap-0">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="h-96"
              />
              {/* <p className="whitespace-pre-wrap bg-slate-100 p-4">{newDraft}</p> */}
              <div className="relative">
                <Button
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={accept}
                >
                  <ArrowUp />
                </Button>
                {diffView ? (
                  <ReactDiffViewer oldValue={draft} newValue={newDraft} />
                ) : (
                  <p className="whitespace-pre-wrap bg-slate-100 p-4">
                    {newDraft}
                  </p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="article">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-4">
              <Button onClick={onGenerateArticle}>Generate</Button>
              <Button onClick={onFixArticle}>Fix</Button>
              <Button onClick={onEvaluate}>Evaluate</Button>
            </div>
            <div className="flex flex-col gap-0">
              <Textarea
                value={article}
                onChange={(e) => setArticle(e.target.value)}
                className="h-96"
              />
              {/* <p className="whitespace-pre-wrap bg-slate-100 p-4">{newDraft}</p> */}
              <div className="relative">
                <Button
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={acceptArticle}
                >
                  <ArrowUp />
                </Button>
                {diffView ? (
                  <ReactDiffViewer oldValue={article} newValue={newArticle} />
                ) : (
                  <p className="whitespace-pre-wrap bg-slate-100 p-4">
                    {newDraft}
                  </p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

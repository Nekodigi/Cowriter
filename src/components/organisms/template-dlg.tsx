"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext, useState } from "react";
import { EditorContext, useEditorContext } from "../contexts/editor";

export const TemplateDialog = () => {
  const {
    criteria,
    exemplary,
    guidance,
    setCriteria,
    setExemplary,
    setGuidance,
  } = useEditorContext();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Specifications</DialogTitle>
          <Tabs defaultValue="criteria" className="flex flex-col ">
            <TabsList className="self-start">
              <TabsTrigger value="criteria">Criteria</TabsTrigger>
              <TabsTrigger value="exemplary">Exemplary </TabsTrigger>
              <TabsTrigger value="guidance">Guidance</TabsTrigger>
            </TabsList>
            <TabsContent value="criteria" className="flex flex-col gap-2">
              <Textarea
                className="h-96"
                placeholder="Please provide criteria of article in markdown..."
                value={criteria}
                onChange={(e) => setCriteria(e.target.value)}
              />
            </TabsContent>
            <TabsContent value="exemplary" className="mt-0 flex flex-col gap-2">
              <Textarea
                className="h-96"
                placeholder="Please provide exemplary article..."
                value={exemplary}
                onChange={(e) => setExemplary(e.target.value)}
              />
            </TabsContent>
            <TabsContent value="guidance" className="mt-0 flex flex-col gap-2">
              <Textarea
                className="h-96"
                placeholder="Please write if you have any request for editing style..."
                value={guidance}
                onChange={(e) => setGuidance(e.target.value)}
              />
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

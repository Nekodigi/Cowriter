"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type EditorContextType = {
  query: string;
  exemplary: string;
  guidance: string;
  setQuery: (query: string) => void;
  setExemplary: (exemplary: string) => void;
  setGuidance: (guidance: string) => void;
  draft: string;
  setDraft: (draft: string) => void;
  article: string;
  setArticle: (article: string) => void;
};

export const EditorContext = createContext<EditorContextType | undefined>(
  undefined
);

export const EditorProvider = EditorContext.Provider;

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error(
      "useEditorContext must be used within a EditorContextProvider"
    );
  }
  return context;
};

export const EditorContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [query, _setQuery] = useState("");
  const [exemplary, _setExemplary] = useState("");
  const [guidance, _setGuidance] = useState("");
  const [draft, _setDraft] = useState("");
  const [article, _setArticle] = useState("");

  useEffect(() => {
    _setQuery(localStorage.getItem("query") || "");
    _setExemplary(localStorage.getItem("exemplary") || "");
    _setGuidance(localStorage.getItem("guidance") || "");
    _setDraft(localStorage.getItem("draft") || "");
    _setArticle(localStorage.getItem("article") || "");
  }, []);

  const setQuery = (query: string) => {
    _setQuery(query);
    localStorage.setItem("query", query);
  };
  const setExemplary = (exemplary: string) => {
    _setExemplary(exemplary);
    localStorage.setItem("exemplary", exemplary);
  };
  const setGuidance = (guidance: string) => {
    _setGuidance(guidance);
    localStorage.setItem("guidance", guidance);
  };
  const setDraft = (draft: string) => {
    _setDraft(draft);
    localStorage.setItem("draft", draft);
  };
  const setArticle = (article: string) => {
    _setArticle(article);
    localStorage.setItem("article", article);
  };

  return (
    <EditorProvider
      value={{
        query,
        exemplary,
        guidance,
        setQuery,
        setExemplary,
        setGuidance,
        draft,
        setDraft,
        article,
        setArticle,
      }}
    >
      {children}
    </EditorProvider>
  );
};

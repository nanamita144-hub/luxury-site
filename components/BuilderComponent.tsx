"use client";

import { Content, isPreviewing } from "@builder.io/sdk-react";

interface BuilderPageProps {
  content: object | null;
  model: string;
  apiKey: string;
}

export function RenderBuilderContent({ content, model, apiKey }: BuilderPageProps) {
  if (!content && !isPreviewing()) {
    return null;
  }

  return (
    <Content
      content={content ?? undefined}
      model={model}
      apiKey={apiKey}
    />
  );
}

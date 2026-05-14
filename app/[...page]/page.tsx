import { fetchOneEntry, getBuilderSearchParams, isPreviewing } from "@builder.io/sdk-react";
import { RenderBuilderContent } from "@/components/BuilderComponent";
import { notFound } from "next/navigation";

const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY!;

interface PageProps {
  params: Promise<{ page: string[] }>;
  searchParams: Promise<Record<string, string>>;
}

export default async function BuilderPage({ params, searchParams }: PageProps) {
  const { page } = await params;
  const search = await searchParams;

  const content = await fetchOneEntry({
    model: "page",
    apiKey: BUILDER_API_KEY,
    userAttributes: {
      urlPath: "/" + (page?.join("/") ?? ""),
    },
    options: getBuilderSearchParams(search),
  });

  if (!content && !isPreviewing()) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505]">
      <RenderBuilderContent content={content} model="page" apiKey={BUILDER_API_KEY} />
    </main>
  );
}

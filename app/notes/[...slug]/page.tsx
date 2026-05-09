import { notFound } from "next/navigation";
import { getAllNotePaths, getNoteByPath } from "@/lib/notes";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import type { Metadata } from "next";

import Callout from "@/components/Callout";
import Section from "@/components/Section";
import MathBlock from "@/components/MathBlock";
import Sketch from "@/components/Sketch";
import NoteHeader from "@/components/NoteHeader";

interface PageProps {
  params: { slug: string[] };
}

// Map the MDX components available in content
const mdxComponents = {
  Callout,
  Section,
  MathBlock,
  Sketch,
};

// Generate all static paths for notes
export async function generateStaticParams() {
  const paths = getAllNotePaths();
  return paths.map((filePath) => ({
    slug: filePath.replace(/\.(mdx|md)$/, "").split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const notePath = params.slug.join("/");
  const note = getNoteByPath(notePath);

  if (!note) return { title: "Not Found · STELLA" };

  return {
    title: `${note.title} · STELLA`,
    description: note.description,
    keywords: note.tags,
  };
}

export default function NotePage({ params }: PageProps) {
  const notePath = params.slug.join("/");
  const note = getNoteByPath(notePath);

  if (!note) {
    notFound();
  }

  return (
    <article className="page-enter">
      <NoteHeader
        title={note.title}
        category={note.category}
        description={note.description}
        date={note.date}
        readingTime={note.readingTime}
        tags={note.tags}
      />

      {/* MDX Content */}
      <div className="prose prose-stella max-w-none">
        <MDXRemote
          source={note.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath, remarkGfm],
              rehypePlugins: [
                rehypeKatex,
                rehypeSlug,
              ],
            },
          }}
        />
      </div>

      {/* Note footer */}
      <footer className="mt-16 pt-8 border-t border-white/4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-ink-600 font-mono">
            {note.category} · STELLA Knowledge
          </div>
          {note.date && (
            <div className="text-xs text-ink-600 font-mono">
              Last updated:{" "}
              {new Date(note.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}
        </div>
      </footer>
    </article>
  );
}

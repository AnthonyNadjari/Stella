import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

export interface NoteMetadata {
  title: string;
  category: string;
  description: string;
  tags: string[];
  date: string;
  readingTime: string;
  slug: string;
  path: string; // full path relative to notes dir, e.g. "equity/basket-skew"
}

export interface Note extends NoteMetadata {
  content: string;
}

function walkDir(dir: string, base: string = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const relativePath = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...walkDir(path.join(dir, entry.name), relativePath));
    } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
      files.push(relativePath);
    }
  }

  return files;
}

export function getAllNotePaths(): string[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return walkDir(NOTES_DIR);
}

export function getAllNotes(): NoteMetadata[] {
  const filePaths = getAllNotePaths();

  return filePaths
    .map((filePath) => {
      const fullPath = path.join(NOTES_DIR, filePath);
      const fileContents = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(fileContents);
      const notePath = filePath.replace(/\.(mdx|md)$/, "");
      const stats = readingTime(content);

      return {
        title: data.title || "Untitled",
        category: data.category || "General",
        description: data.description || "",
        tags: data.tags || [],
        date: data.date ? String(data.date) : "",
        readingTime: stats.text,
        slug: notePath.split("/").pop() || "",
        path: notePath,
      } as NoteMetadata;
    })
    .sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getNoteByPath(notePath: string): Note | null {
  const mdxPath = path.join(NOTES_DIR, `${notePath}.mdx`);
  const mdPath = path.join(NOTES_DIR, `${notePath}.md`);

  let fullPath: string;
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    title: data.title || "Untitled",
    category: data.category || "General",
    description: data.description || "",
    tags: data.tags || [],
    date: data.date ? String(data.date) : "",
    readingTime: stats.text,
    slug: notePath.split("/").pop() || "",
    path: notePath,
    content,
  };
}

export function getNotesByCategory(): Record<string, NoteMetadata[]> {
  const notes = getAllNotes();
  const byCategory: Record<string, NoteMetadata[]> = {};

  for (const note of notes) {
    if (!byCategory[note.category]) {
      byCategory[note.category] = [];
    }
    byCategory[note.category].push(note);
  }

  return byCategory;
}

export function getSearchIndex(): Array<{
  title: string;
  description: string;
  path: string;
  category: string;
  tags: string[];
  content: string;
}> {
  const filePaths = getAllNotePaths();

  return filePaths.map((filePath) => {
    const fullPath = path.join(NOTES_DIR, filePath);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(fileContents);
    const notePath = filePath.replace(/\.(mdx|md)$/, "");

    // Strip MDX components and markdown syntax for searchable text
    const strippedContent = content
      .replace(/<[^>]+>/g, " ")
      .replace(/[#*`$\\{}\[\]]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 500);

    return {
      title: data.title || "",
      description: data.description || "",
      path: notePath,
      category: data.category || "",
      tags: data.tags || [],
      content: strippedContent,
    };
  });
}

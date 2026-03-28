import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

export interface Section {
  level: 2 | 3;
  text: string;
  id: string;
}

export interface NoteMetadata {
  title: string;
  category: string;
  description: string;
  tags: string[];
  date: string;
  readingTime: string;
  slug: string;
  path: string;
  sections: Section[];
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

function extractSections(content: string): Section[] {
  const lines = content.split("\n");
  const sections: Section[] = [];
  let inCodeBlock = false;
  for (const line of lines) {
    if (line.startsWith("```")) { inCodeBlock = !inCodeBlock; continue; }
    if (inCodeBlock) continue;
    const m = line.match(/^(#{2,3})\s+(.+)$/);
    if (m) {
      const text = m[2].replace(/[*_`[\]]/g, "").trim();
      sections.push({
        level: m[1].length as 2 | 3,
        text,
        id: text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      });
    }
  }
  return sections;
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
        sections: extractSections(content),
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
  if (fs.existsSync(mdxPath)) fullPath = mdxPath;
  else if (fs.existsSync(mdPath)) fullPath = mdPath;
  else return null;

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
    sections: extractSections(content),
  };
}

export function getNotesByCategory(): Record<string, NoteMetadata[]> {
  const notes = getAllNotes();
  const byCategory: Record<string, NoteMetadata[]> = {};
  for (const note of notes) {
    if (!byCategory[note.category]) byCategory[note.category] = [];
    byCategory[note.category].push(note);
  }
  return byCategory;
}

export function getSearchIndex(): Array<{
  title: string; description: string; path: string; category: string; tags: string[]; content: string;
}> {
  return getAllNotePaths().map((filePath) => {
    const fullPath = path.join(NOTES_DIR, filePath);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(fileContents);
    const notePath = filePath.replace(/\.(mdx|md)$/, "");
    const strippedContent = content
      .replace(/<[^>]+>/g, " ").replace(/[#*`$\\{}\[\]]/g, " ").replace(/\s+/g, " ").trim().slice(0, 500);
    return {
      title: data.title || "", description: data.description || "",
      path: notePath, category: data.category || "", tags: data.tags || [], content: strippedContent,
    };
  });
}

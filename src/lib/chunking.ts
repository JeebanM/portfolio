// src/lib/chunking.ts
// Heading-aware markdown chunker for jeeban_ai knowledge base

export interface DocumentChunk {
  text: string;
  source: string;   // e.g. "education/class_10"
  category: string; // e.g. "education"
  title: string;    // e.g. "Class X – ICSE"
  chunkIndex: number;
}

/**
 * Sanitize common encoding artifacts that appear when Unicode
 * characters (en-dash, em-dash, arrows) get mis-encoded on Windows.
 */
function sanitize(text: string): string {
  return text
    // en-dash variants
    .replace(/â\??\??â??\??/g, '–')
    .replace(/â€"/g, '–')
    .replace(/â\x80\x93/g, '–')
    // em-dash variants
    .replace(/â€"/g, '—')
    .replace(/â\x80\x94/g, '—')
    // right arrow variants
    .replace(/â\??\??'/g, '→')
    .replace(/â†'/g, '→')
    .replace(/â\x86\x92/g, '→')
    // smart quotes
    .replace(/â€œ/g, '"')
    .replace(/â€/g, '"')
    .replace(/â€˜/g, "'")
    .replace(/â€™/g, "'")
    // trophy / medal emojis that got garbled
    .replace(/dY\?+/g, '🏆')
    .replace(/d[YX]\?[+\-*]/g, '🏆')
    // arrow variants used as list bullets
    .replace(/â\+'/g, '→')
    // generic replacement: remaining â?? sequences
    .replace(/â\?{1,2}[^\s]/g, '-')
    // cleanup leftover garbage sequences
    .replace(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\uFFFF]/g, '')
    .trim();
}

/**
 * Split markdown content into heading-aware chunks.
 * Each H1/H2/H3 heading starts a new chunk.
 * If a section is large (>1200 chars), it's further split by paragraphs.
 */
export function chunkMarkdown(
  rawContent: string,
  source: string // e.g. "education/class_10"
): DocumentChunk[] {
  const content = sanitize(rawContent);
  const category = source.split('/')[0]; // e.g. "education"

  // Split on markdown headings (H1, H2, H3)
  const headingRegex = /^(#{1,3})\s+(.+)$/m;
  const lines = content.split('\n');

  const sections: { title: string; body: string }[] = [];
  let currentTitle = source.replace(/\//g, ' / '); // fallback title
  let currentLines: string[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      // Save previous section if it has content
      if (currentLines.length > 0) {
        const body = currentLines.join('\n').trim();
        if (body.length > 0) {
          sections.push({ title: currentTitle, body });
        }
      }
      currentTitle = sanitize(match[2]);
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  // Push final section
  if (currentLines.length > 0) {
    const body = currentLines.join('\n').trim();
    if (body.length > 0) {
      sections.push({ title: currentTitle, body });
    }
  }

  // If no headings found, treat entire file as one chunk
  if (sections.length === 0) {
    const body = content.trim();
    if (body.length > 0) {
      sections.push({ title: currentTitle, body });
    }
  }

  const chunks: DocumentChunk[] = [];

  for (const section of sections) {
    // If section body is small enough, keep as single chunk
    if (section.body.length <= 1200) {
      chunks.push({
        text: `${section.title}\n\n${section.body}`,
        source,
        category,
        title: section.title,
        chunkIndex: chunks.length,
      });
    } else {
      // Split large sections by double-newline (paragraphs)
      const paragraphs = section.body
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      let buffer = '';
      for (const para of paragraphs) {
        if ((buffer + '\n\n' + para).length > 1200 && buffer.length > 0) {
          chunks.push({
            text: `${section.title}\n\n${buffer}`,
            source,
            category,
            title: section.title,
            chunkIndex: chunks.length,
          });
          buffer = para;
        } else {
          buffer = buffer ? buffer + '\n\n' + para : para;
        }
      }
      if (buffer.length > 0) {
        chunks.push({
          text: `${section.title}\n\n${buffer}`,
          source,
          category,
          title: section.title,
          chunkIndex: chunks.length,
        });
      }
    }
  }

  return chunks;
}

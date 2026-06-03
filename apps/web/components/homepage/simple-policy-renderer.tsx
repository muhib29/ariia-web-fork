'use client';

import React from 'react';

type PolicyBlock =
  | { type: 'h2' | 'h3' | 'h4' | 'p'; text: string; key: string }
  | { type: 'ul' | 'ol'; items: string[]; key: string };

function renderInlineBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return <strong key={`${part}-${index}`} className="font-semibold">{boldMatch[1]}</strong>;
    }

    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
  });
}

function cleanLine(line: string) {
  return line.trim().replace(/^static$/i, '');
}

function parsePolicyContent(content: string): PolicyBlock[] {
  const blocks: PolicyBlock[] = [];
  const lines = content.split('\n');
  let index = 0;

  while (index < lines.length) {
    const line = cleanLine(lines[index] ?? '');
    if (!line) {
      index += 1;
      continue;
    }

    const h4 = line.match(/^####\s+(.+)$/);
    if (h4) {
      blocks.push({ type: 'h4', text: h4[1], key: `h4-${index}` });
      index += 1;
      continue;
    }

    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      blocks.push({ type: 'h3', text: h3[1], key: `h3-${index}` });
      index += 1;
      continue;
    }

    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      blocks.push({ type: 'h2', text: h2[1], key: `h2-${index}` });
      index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length) {
        const itemLine = cleanLine(lines[index] ?? '');
        const item = itemLine.match(/^[-*]\s+(.+)$/);
        if (!item) break;
        items.push(item[1]);
        index += 1;
      }
      blocks.push({ type: 'ul', items, key: `ul-${index}` });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length) {
        const itemLine = cleanLine(lines[index] ?? '');
        const item = itemLine.match(/^\d+\.\s+(.+)$/);
        if (!item) break;
        items.push(item[1]);
        index += 1;
      }
      blocks.push({ type: 'ol', items, key: `ol-${index}` });
      continue;
    }

    blocks.push({ type: 'p', text: line, key: `p-${index}` });
    index += 1;
  }

  return blocks;
}

export function SimplePolicyRenderer({ content }: { content: string }) {
  const blocks = parsePolicyContent(content);

  return (
    <>
      {blocks.map((block) => {
        if (block.type === 'h2') {
          return <h2 key={block.key} className="text-2xl font-bold mt-8 mb-4">{renderInlineBold(block.text)}</h2>;
        }

        if (block.type === 'h3') {
          return <h3 key={block.key} className="text-xl font-bold mt-6 mb-2">{renderInlineBold(block.text)}</h3>;
        }

        if (block.type === 'h4') {
          return <h4 key={block.key} className="font-bold mt-4 mb-2">{renderInlineBold(block.text)}</h4>;
        }

        if (block.type === 'ul') {
          return (
            <ul key={block.key} className="list-disc pl-6 space-y-1 mb-4">
              {block.items.map((item, index) => (
                <li key={`${block.key}-${index}`} className="text-gray-800 text-base leading-relaxed mb-1">
                  {renderInlineBold(item)}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol key={block.key} className="list-decimal pl-6 space-y-1 mb-4">
              {block.items.map((item, index) => (
                <li key={`${block.key}-${index}`} className="text-gray-800 text-base leading-relaxed mb-1">
                  {renderInlineBold(item)}
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === 'p') {
          return <p key={block.key} className="text-gray-800 text-base leading-relaxed mb-4">{renderInlineBold(block.text)}</p>;
        }

        return null;
      })}
    </>
  );
}

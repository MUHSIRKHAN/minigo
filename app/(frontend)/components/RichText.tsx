import type { ReactNode } from "react";
import type { LexicalContent, LexicalNode } from "../lib/payload";
import Link from "next/link";

type Props = {
  content: LexicalContent;
  className?: string;
};

function renderText(node: LexicalNode, key: number) {
  let el: ReactNode = node.text ?? "";
  const format = typeof node.format === "number" ? node.format : 0;

  if (format & 1) el = <strong key={`b-${key}`}>{el}</strong>;
  if (format & 2) el = <em key={`i-${key}`}>{el}</em>;
  if (format & 8) el = <u key={`u-${key}`}>{el}</u>;
  if (format & 4) el = <s key={`s-${key}`}>{el}</s>;
  if (format & 16) el = <code key={`c-${key}`}>{el}</code>;

  return <span key={key}>{el}</span>;
}

function linkHref(node: LexicalNode): string {
  return node.fields?.url || node.url || "#";
}

function renderNodes(nodes: LexicalNode[] | undefined): ReactNode[] {
  if (!nodes?.length) return [];

  return nodes.map((node, i) => {
    switch (node.type) {
      case "text":
        return renderText(node, i);
      case "linebreak":
        return <br key={i} />;
      case "paragraph":
        return <p key={i}>{renderNodes(node.children)}</p>;
      case "heading": {
        const Tag = (node.tag || "h2") as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
        return <Tag key={i}>{renderNodes(node.children)}</Tag>;
      }
      case "list": {
        const ListTag = node.listType === "number" ? "ol" : "ul";
        return <ListTag key={i}>{renderNodes(node.children)}</ListTag>;
      }
      case "listitem":
        return <li key={i}>{renderNodes(node.children)}</li>;
      case "quote":
        return <blockquote key={i}>{renderNodes(node.children)}</blockquote>;
      case "link":
      case "autolink":
        return (
          <Link
            key={i}
            href={linkHref(node)}
            target={node.fields?.newTab ? "_blank" : undefined}
            rel={node.fields?.newTab ? "noopener noreferrer" : undefined}
          >
            {renderNodes(node.children)}
          </Link>
        );
      default:
        if (node.children?.length) {
          return <div key={i}>{renderNodes(node.children)}</div>;
        }
        return null;
    }
  });
}

export default function RichText({ content, className }: Props) {
  if (!content?.root?.children) return null;
  return <div className={className}>{renderNodes(content.root.children)}</div>;
}

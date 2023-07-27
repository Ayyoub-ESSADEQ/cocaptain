export default function extractCodeBlockContent(markdownText: string): string | null {
    const codeBlockRegex = /```[\s\S]+?\n([\s\S]+?)\n```/g;
    const matches = codeBlockRegex.exec(markdownText);
    if (matches && matches.length > 1) {
      const codeBlockContent = matches[1];
      return codeBlockContent.trim();
    }
    return null;
  }
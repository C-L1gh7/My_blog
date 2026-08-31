export function getFirstContentImage(markdown = "") {
  const htmlImg = markdown.match(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/i);
  if (htmlImg?.[1]) return htmlImg[1];

  const markdownImg = markdown.match(/!\[[^\]]*]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/);
  return markdownImg?.[1];
}

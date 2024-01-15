export function htmlToText(html: string) {
  if (typeof window === 'undefined') {
    return "";  // sunucu tarafında render edilirken boş bir string döndür
  }
  const element = document.createElement('div');
  element.innerHTML = html;
  return element.textContent || "";
}

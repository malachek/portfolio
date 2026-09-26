/** Dev-only: a 16:9 gradient data URI to stand in for key art until real assets land. */
export function placeholderArt(from: string, to: string): string {
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'>" +
    "<defs><linearGradient id='g' x2='1' y2='1'>" +
    `<stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/>` +
    "</linearGradient></defs><rect width='16' height='9' fill='url(#g)'/></svg>";
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

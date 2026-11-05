export function hasServicePrice(html, service, price) {
  return [...html.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)].some(([, card]) =>
    card.includes(`<span>${service}</span>`) && card.includes(`<strong>${price}</strong>`));
}

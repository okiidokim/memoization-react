export function resizeImage(url: string, max = 200): string {
  const u = new URL(url);
  const m = u.pathname.match(/^\/id\/([^/]+)\/(\d+)\/(\d+)(\.\w+)?$/);

  if (!m) {
    throw new Error('Picsum URL 형식이 아님');
  }

  const [, id, wStr, hStr, ext = ''] = m;
  const w = parseInt(wStr, 10);
  const h = parseInt(hStr, 10);
  if (!w || !h) throw new Error('width/height가 유효하지 않습니다.');

  let newW: number, newH: number;
  if (w >= h) {
    newW = max;
    newH = Math.max(1, Math.round(h * (max / w)));
  } else {
    newH = max;
    newW = Math.max(1, Math.round(w * (max / h)));
  }

  u.pathname = `/id/${id}/${newW}/${newH}${ext}`;
  return u.toString();
}

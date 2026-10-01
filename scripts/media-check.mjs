// Dev helper: print what media.malachek.com returns for a clip (status, type, length, range support).
const h = process.argv[2] ?? '4dd3d3ae56b170bec92f22b4f777b5288b179c98';
for (const u of [`https://media.malachek.com/live/${h}.mp4`, `https://media.malachek.com/live/v2/${h}.mp4`]) {
  const r = await fetch(u, { headers: { Range: 'bytes=0-15' } });
  const buf = Buffer.from(await r.arrayBuffer());
  console.log(u, '\n ', r.status, r.headers.get('content-type'), 'range:', r.headers.get('content-range'), 'accept-ranges:', r.headers.get('accept-ranges'), 'cache:', r.headers.get('cf-cache-status'), 'bytes:', buf.subarray(0, 16).toString('hex'), JSON.stringify(buf.subarray(0, 16).toString('latin1')));
}

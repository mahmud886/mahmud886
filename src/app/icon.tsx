import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

/** The site's mark: a solid dot on ink, like the logo in the header. */
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: '#0c0c0c', borderRadius: 102 }}>
        <div style={{ width: 225, height: 225, borderRadius: 9999, background: '#f3f3f0' }} />
      </div>
    ),
    size
  );
}

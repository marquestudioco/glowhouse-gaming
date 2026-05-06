import { ImageResponse } from 'next/og';

export const size        = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div style={{
      background: '#0A0612',
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 4,
    }}>
      <div style={{
        color: '#00E5FF',
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: '-0.5px',
        fontFamily: 'sans-serif',
      }}>G</div>
    </div>,
    { ...size }
  );
}

import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT, ZONE} from '../theme';

const useS = (delay: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping: 16, mass: 0.75}});
};

/** Daftar ❌ bertumpuk. */
export const XList: React.FC<{items: string[]; top: number; delays: number[]}> = ({items, top, delays}) => (
  <div style={{position: 'absolute', left: ZONE.marginX, right: ZONE.marginX, top, display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center'}}>
    {items.map((it, i) => (
      <XRow key={i} text={it} delay={delays[i] ?? 0} />
    ))}
  </div>
);

const XRow: React.FC<{text: string; delay: number}> = ({text, delay}) => {
  const s = useS(delay);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 22,
        background: C.CARD_WHITE,
        borderRadius: 999,
        padding: '14px 34px 14px 16px',
        boxShadow: '0 10px 26px rgba(25,41,59,0.12)',
        opacity: s,
        transform: `translateX(${(1 - s) * -60}px) scale(${0.9 + 0.1 * s})`,
        fontFamily: FONT,
      }}
    >
      <div style={{width: 64, height: 64, borderRadius: 32, background: C.ALERT_RED, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <svg width={30} height={30} viewBox="0 0 30 30">
          <path d="M5 5 L25 25 M25 5 L5 25" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
        </svg>
      </div>
      <span style={{fontWeight: 800, fontSize: 46, color: C.NAVY, letterSpacing: 0.5}}>{text}</span>
    </div>
  );
};

/** Kartu perbandingan SURAT PESANAN vs FAKTUR PBF. */
export const CompareCard: React.FC<{top: number; delay?: number}> = ({top, delay = 0}) => {
  const s = useS(delay);
  const frame = useCurrentFrame();
  const rows: [string, string, string, boolean][] = [
    ['Produk', 'Amoxicillin', 'Amoxicillin', false],
    ['Qty', '5 dus', '7 dus', true],
    ['ED', '2028', '4 bln lagi', true],
  ];
  const arrow = interpolate(frame - delay - 20, [0, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        right: 70,
        top,
        background: C.CARD_WHITE,
        borderRadius: 36,
        overflow: 'hidden',
        fontFamily: FONT,
        boxShadow: `0 ${10 + 20 * s}px ${30 + 30 * s}px rgba(25,41,59,${0.1 + 0.08 * s})`,
        transform: `translateY(${(1 - s) * 80}px)`,
        opacity: Math.min(1, s * 1.5),
      }}
    >
      <div style={{display: 'grid', gridTemplateColumns: '0.8fr 1fr 1fr'}}>
        <div style={{background: C.BRAND_BLUE}} />
        {['SURAT PESANAN', 'FAKTUR PBF'].map((h) => (
          <div key={h} style={{background: C.BRAND_BLUE, color: '#fff', fontWeight: 800, fontSize: 36, padding: '28px 10px', textAlign: 'center'}}>
            {h}
          </div>
        ))}
        {rows.map(([k, a, b, bad], i) => (
          <React.Fragment key={k}>
            {[k, a, b].map((v, j) => (
              <div
                key={j}
                style={{
                  background: bad ? '#FBE3E0' : i % 2 ? '#F4F7FC' : '#FFFFFF',
                  color: bad && j === 2 ? C.ALERT_RED : j === 0 ? '#7A8BA6' : C.NAVY,
                  fontWeight: j === 0 ? 700 : bad && j === 2 ? 800 : 700,
                  fontSize: bad && j === 2 ? 44 : 38,
                  padding: '30px 18px',
                  textAlign: j === 0 ? 'left' : 'center',
                  paddingLeft: j === 0 ? 34 : 18,
                  fontVariantNumeric: 'tabular-nums',
                  position: 'relative',
                }}
              >
                {v}
                {bad && j === 2 && (
                  <svg width={70} height={40} viewBox="0 0 70 40" style={{position: 'absolute', left: -38, top: '50%', marginTop: -20, opacity: arrow}}>
                    <path d="M4 20 L52 20 M38 6 L56 20 L38 34" stroke={C.ALERT_RED} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const Counter: React.FC<{value: number; delay: number; dur?: number; x: number; y: number; size?: number; color?: string}> = ({
  value,
  delay,
  dur = 30,
  x,
  y,
  size = 96,
  color = C.ALERT_RED,
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame - delay, [0, dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const eased = 1 - Math.pow(1 - t, 3);
  const v = Math.round((value * eased) / 1000) * 1000;
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', fontFamily: FONT, fontWeight: 800, fontSize: size, color, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap'}}>
      Rp {v.toLocaleString('id-ID')}
    </div>
  );
};

/** Avatar bulat berisi kepala karakter. children = <svg> kepala. */
export const AvatarBubble: React.FC<{x: number; y: number; size?: number; delay?: number; children: React.ReactNode; ring?: string}> = ({
  x,
  y,
  size = 220,
  delay = 0,
  children,
  ring = C.ALERT_RED,
}) => {
  const s = useS(delay);
  return (
    <div
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: size / 2,
        background: C.BG_LIGHT,
        border: `10px solid ${ring}`,
        overflow: 'hidden',
        boxShadow: '0 14px 30px rgba(25,41,59,0.2)',
        transform: `scale(${s})`,
      }}
    >
      {children}
    </div>
  );
};

/** Bubble chat telepon. */
export const ChatBubble: React.FC<{x: number; y: number; w?: number; name: string; text: string; delay?: number; tail?: 'left' | 'right'}> = ({
  x,
  y,
  w = 640,
  name,
  text,
  delay = 0,
  tail = 'left',
}) => {
  const s = useS(delay);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        background: C.CARD_WHITE,
        borderRadius: 34,
        borderBottomLeftRadius: tail === 'left' ? 6 : 34,
        borderBottomRightRadius: tail === 'right' ? 6 : 34,
        padding: '26px 34px',
        fontFamily: FONT,
        boxShadow: '0 14px 30px rgba(25,41,59,0.16)',
        transform: `scale(${s})`,
        transformOrigin: tail === 'left' ? 'bottom left' : 'bottom right',
      }}
    >
      <div style={{fontWeight: 700, fontSize: 32, color: C.BRAND_BLUE, marginBottom: 6}}>{name}</div>
      <div style={{fontWeight: 600, fontSize: 40, color: C.NAVY, lineHeight: 1.3}}>{text}</div>
    </div>
  );
};

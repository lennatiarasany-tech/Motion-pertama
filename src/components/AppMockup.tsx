import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from '../theme';

export type MockRow = {
  produk: string;
  sp: string;
  datang: string;
  harga: string;
  ed: string;
  status: string;
  bad?: 'status' | 'harga' | 'ed';
};

export const ROWS: MockRow[] = [
  {produk: 'Amoxicillin 500 mg', sp: '0', datang: '2', harga: '38.000', ed: '01/2028', status: 'Luar SP', bad: 'status'},
  {produk: 'Vitamin C 500 mg', sp: '6', datang: '6', harga: '+12%', ed: '09/2027', status: 'Harga ↑', bad: 'harga'},
  {produk: 'Antasida Tablet', sp: '8', datang: '8', harga: '9.000', ed: '< 1 thn', status: 'ED ↓', bad: 'ed'},
];

/**
 * Mockup menu Penerimaan Barang (placeholder UI bila public/screens/penerimaan.png belum ada).
 * Lebar 940px (≥85% dari 1080).
 */
export const AppMockup: React.FC<{top: number; delay?: number; highlight?: number[]}> = ({top, delay = 0, highlight = []}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 16, mass: 0.75}});
  const cols = ['Produk', 'SP', 'Datang', 'Harga', 'ED', 'Status'];
  const grid = '2.2fr 0.65fr 1.05fr 1.15fr 1.25fr 1.45fr';
  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        width: 940,
        top,
        background: C.CARD_WHITE,
        borderRadius: 30,
        overflow: 'hidden',
        fontFamily: FONT,
        boxShadow: `0 ${10 + 20 * s}px ${30 + 30 * s}px rgba(25,41,59,${0.12 + 0.08 * s})`,
        transform: `translateY(${(1 - s) * 80}px)`,
        opacity: Math.min(1, s * 1.5),
      }}
    >
      {/* app bar */}
      <div style={{background: C.BRAND_BLUE, color: '#fff', padding: '22px 30px', display: 'flex', alignItems: 'center', gap: 16}}>
        <div style={{width: 46, height: 46, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width={28} height={28} viewBox="0 0 28 28">
            <rect x={10} y={2} width={8} height={24} rx={3} fill={C.BRAND_BLUE} />
            <rect x={2} y={10} width={24} height={8} rx={3} fill={C.BRAND_BLUE} />
          </svg>
        </div>
        <div style={{fontWeight: 800, fontSize: 38}}>Penerimaan Barang</div>
        <div style={{marginLeft: 'auto', fontWeight: 700, fontSize: 32, opacity: 0.85}}>SP-0412</div>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: grid, background: '#EEF3FB', padding: '16px 20px', fontWeight: 700, fontSize: 32, color: '#7A8BA6'}}>
        {cols.map((c) => (
          <div key={c} style={{textAlign: c === 'Produk' ? 'left' : 'center'}}>{c}</div>
        ))}
      </div>
      {ROWS.map((r, i) => {
        const hl = highlight.includes(i);
        const red = (k: MockRow['bad']) => r.bad === k;
        return (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: grid,
              alignItems: 'center',
              padding: '22px 20px',
              fontSize: 32,
              fontWeight: 600,
              color: C.NAVY,
              borderTop: '2px solid #EEF3FB',
              background: hl ? 'rgba(255,216,77,0.28)' : '#fff',
              outline: hl ? `6px solid ${C.HIGHLIGHT}` : 'none',
              outlineOffset: -6,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            <div style={{fontWeight: 700, lineHeight: 1.15}}>{r.produk}</div>
            <div style={{textAlign: 'center'}}>{r.sp}</div>
            <div style={{textAlign: 'center'}}>{r.datang}</div>
            <div style={{textAlign: 'center', color: red('harga') ? C.ALERT_RED : undefined, fontWeight: red('harga') ? 800 : 600}}>{r.harga}</div>
            <div style={{textAlign: 'center', color: red('ed') ? C.ALERT_RED : undefined, fontWeight: red('ed') ? 800 : 600, lineHeight: 1.1}}>{r.ed}</div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <span
                style={{
                  background: r.bad ? C.ALERT_RED : C.SUCCESS,
                  color: '#fff',
                  borderRadius: 999,
                  padding: '4px 12px',
                  fontWeight: 700,
                  fontSize: 32,
                  whiteSpace: 'nowrap',
                }}
              >
                {r.status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

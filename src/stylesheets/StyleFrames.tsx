import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Karyawan, Kasir, Owner, Place, Sales} from '../characters';
import {Background} from '../components/Background';
import {AppMockup} from '../components/AppMockup';
import {AvatarBubble, ChatBubble, CompareCard, Counter, XList} from '../components/Cards';
import {Chip} from '../components/Chip';
import {Headline} from '../components/Headline';
import {Box, CashierDesk, CircleAnnotation, Clipboard, PaperProp, Pen, Phone} from '../components/Props';
import {Subtitle} from '../components/Subtitle';
import {C, FONT} from '../theme';

/** Kamera: zoom pelan 1.00→1.04 sepanjang scene. */
const Camera: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const z = interpolate(frame, [0, durationInFrames], [1, 1.04]);
  return <AbsoluteFill style={{transform: `scale(${z})`, transformOrigin: '50% 60%', ...style}}>{children}</AbsoluteFill>;
};

const useSpr = (delay: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping: 16, mass: 0.75}});
};

/* ───────────── 1. CAST SHEET ───────────── */
export const SFCast: React.FC = () => {
  const swatches: [string, string][] = [
    [C.NAVY, 'NAVY'],
    [C.BRAND_BLUE, 'BLUE'],
    [C.ALERT_RED, 'RED'],
    [C.SUCCESS, 'GREEN'],
    [C.HIGHLIGHT, 'STABILO'],
  ];
  const cast: {x: number; name: string; el: React.ReactNode}[] = [
    {x: 150, name: 'OWNER', el: <Owner pose="point" expression="smile" />},
    {x: 405, name: 'KARYAWAN', el: <Karyawan pose="holdPaper" expression="smile" holding="clipboard" />},
    {x: 670, name: 'SALES PBF', el: <Sales pose="carry" walkPhase={0} expression="neutral" holding="box" />},
    {x: 930, name: 'KASIR', el: <Kasir pose="idle" expression="neutral" />},
  ];
  return (
    <Background clouds sun>
      <Camera>
        <Headline kicker="CAST SERI" lines={['APOTEK', '_DIGITAL_']} size={116} />
        {/* palet */}
        <div style={{position: 'absolute', top: 690, left: 80, right: 80, display: 'flex', justifyContent: 'space-between'}}>
          {swatches.map(([c, n]) => (
            <div key={n} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, fontFamily: FONT}}>
              <div style={{width: 130, height: 130, borderRadius: 65, background: c, boxShadow: '0 10px 22px rgba(25,41,59,0.15)'}} />
              <div style={{fontWeight: 700, fontSize: 32, color: C.NAVY}}>{n}</div>
            </div>
          ))}
        </div>
        <div style={{position: 'absolute', top: 920, left: 80, right: 80, textAlign: 'center', fontFamily: FONT, color: C.NAVY}}>
          <div style={{fontWeight: 800, fontSize: 56}}>POPPINS EXTRABOLD</div>
          <div style={{fontWeight: 700, fontSize: 40, color: C.KICKER}}>Poppins Bold · chip &amp; angka Rp 3.750.000</div>
        </div>
        {cast.map((c) => (
          <React.Fragment key={c.name}>
            <Place x={c.x} scale={0.6}>
              {c.el}
            </Place>
            <Chip text={c.name} variant={c.name === 'SALES PBF' ? 'navy' : 'blue'} x={c.x} y={1240} size={32} />
          </React.Fragment>
        ))}
      </Camera>
      <Subtitle text="Karakter sama di *semua* video seri" />
    </Background>
  );
};

/* ───────────── 2. SCENE 1 — HOOK ───────────── */
export const SFHook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  // dus jatuh + bounce
  const drop = spring({frame: frame - 20, fps, config: {damping: 9, mass: 0.7}});
  const boxY = interpolate(drop, [0, 1], [760, 1236]);
  const shake = frame > 34 && frame < 46 ? Math.sin(frame * 2.3) * 6 : 0;
  return (
    <Background>
      <Camera style={{transform: `translate(${shake}px, ${shake * 0.6}px) scale(${1 + frame / 3000})`}}>
        <Headline kicker="APOTEK INI" lines={['STOK *ED*', 'NUMPUK,', '*RUGI* *JUTAAN*']} />
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute'}}>
          <ellipse cx={760} cy={1700} rx={210} ry={18} fill={C.NAVY} opacity={0.12} />
          <Box x={680} y={1700} />
          <Box x={860} y={1700} />
          <Box x={690} y={1580} label="ED 4 BLN" />
          <Box x={870} y={1580} />
          <Box x={760} y={1460} label="ED 4 BLN" />
          <Box x={780} y={boxY} rot={interpolate(drop, [0, 1], [-24, 7])} label="ED 4 BLN" />
        </svg>
        <Place x={300} scale={0.95}>
          <Owner pose="shocked" expression="shocked" />
        </Place>
        <Chip text="😱 kok bisa numpuk gini?" variant="yellow" x={720} y={1080} delay={30} />
      </Camera>
      <Subtitle text="Stok *ED* numpuk di gudang…" />
    </Background>
  );
};

/* ───────────── 3. SCENE 3 — BURU-BURU (slow-mo) ───────────── */
export const SFRush: React.FC = () => {
  const frame = useCurrentFrame();
  const ring = interpolate(frame, [30, 44], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const slip = useSpr(10);
  return (
    <Background>
      <Camera>
        <Headline lines={['DICEK *SEADANYA,*', 'LANGSUNG', 'TANDA TANGAN']} size={100} />
        {/* dunia di-desaturasi 40% saat slow-motion */}
        <AbsoluteFill style={{filter: 'saturate(0.6)'}}>
          <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute'}}>
            <ellipse cx={560} cy={1700} rx={120} ry={14} fill={C.NAVY} opacity={0.12} />
            <Box x={560} y={1700} w={150} h={105} />
            <Box x={560} y={1595} w={150} h={105} />
            <Box x={560} y={1490} w={150} h={105} />
            {/* 2 dus selipan */}
            <Box x={560} y={interpolate(slip, [0, 1], [1300, 1385])} w={150} h={105} rot={-2} />
            <Box x={interpolate(slip, [0, 1], [700, 560])} y={1280} w={150} h={105} rot={3} />
          </svg>
          <Place x={250} scale={0.9}>
            <Karyawan pose="sign" expression="worried" holding="clipboard" />
          </Place>
          <Place x={850} scale={0.9}>
            <Sales pose="point" expression="smile" flip rightProp={<PaperProp x={10} y={0} rot={90} />} />
          </Place>
        </AbsoluteFill>
        {/* vignette */}
        <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0) 45%, rgba(22,38,56,0.45) 100%)'}} />
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute'}}>
          <CircleAnnotation cx={560} cy={1278} rx={135} ry={135} progress={ring} />
        </svg>
        <Chip text="tanda tangan aja ya, Kak 🙏" variant="yellow" x={1000} y={720} anchor="right" delay={4} />
        <Chip text="+2 dus di luar SP" variant="red" x={560} y={1080} delay={44} />
      </Camera>
      <Subtitle text="Dicek *seadanya*, langsung tanda tangan" />
    </Background>
  );
};

/* ───────────── 4. SCENE 4 — TERBONGKAR ───────────── */
export const SFReveal: React.FC = () => (
  <Background>
    <Camera>
      <div style={{position: 'absolute', top: 232, left: 0, right: 0, textAlign: 'center', fontFamily: FONT, fontWeight: 700, fontSize: 44, color: C.KICKER}}>
        BEBERAPA BULAN KEMUDIAN…
      </div>
      <XList top={310} items={['TIDAK ADA DI SP', 'ED TINGGAL 4 BULAN', 'NGGAK LAKU, NUMPUK']} delays={[0, 10, 20]} />
      <CompareCard top={680} delay={8} />
      <Counter value={3750000} delay={20} x={420} y={1250} />
      <Chip text="rugi" variant="red" x={420} y={1360} delay={40} size={36} />
      <AvatarBubble x={880} y={1290} size={230} delay={30}>
        <svg width="100%" height="100%" viewBox="-95 -668 190 190">
          <Owner expression="shocked" />
        </svg>
      </AvatarBubble>
    </Camera>
    <Subtitle text="Nggak laku, numpuk, *rugi* *jutaan*" />
  </Background>
);

/* ───────────── 5. SCENE 5 — TWIST (malam, satu-satunya BG_DARK) ───────────── */
export const SFTwist: React.FC = () => (
  <Background mode="dark">
    <Camera>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 420px 1380px, rgba(255,216,77,0.22) 0, rgba(255,216,77,0) 420px)'}} />
      <Headline lines={['TAPI CELAHNYA', 'DI CARA KITA', '^TERIMA^ ^BARANG^']} color="#FFFFFF" size={100} />
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute'}}>
        {/* meja kecil + lampu */}
        <rect x={700} y={1470} width={300} height={26} rx={10} fill="#2B4560" />
        <rect x={720} y={1496} width={22} height={204} rx={8} fill="#22384F" />
        <rect x={958} y={1496} width={22} height={204} rx={8} fill="#22384F" />
        <path d="M 790 1262 L 640 1470 L 1000 1470 L 880 1262 Z" fill={C.HIGHLIGHT} opacity={0.12} />
        <rect x={800} y={1456} width={130} height={16} rx={8} fill="#3A5876" />
        <rect x={858} y={1290} width={14} height={170} rx={7} fill="#3A5876" />
        <path d="M 770 1290 Q 835 1200 900 1290 Z" fill={C.BRAND_BLUE} />
        <ellipse cx={835} cy={1290} rx={56} ry={10} fill={C.HIGHLIGHT} />
      </svg>
      <Place x={430} scale={1}>
        <Owner pose="holdPaper" expression="suspicious" holding="paper" />
      </Place>
      <Chip text="faktur sudah ditandatangani" variant="white" x={540} y={760} size={34} />
    </Camera>
    <Subtitle text="Celahnya ada di cara kita *terima* *barang*" />
  </Background>
);

/* ───────────── 5a. SCENE 5 — telepon & RETUR? dicoret ───────────── */
export const SFPhone: React.FC = () => {
  const frame = useCurrentFrame();
  const strike = interpolate(frame, [36, 48], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Background>
      <Camera>
        <div style={{position: 'absolute', top: 220, height: 400, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{position: 'relative', fontFamily: FONT, fontWeight: 800, fontSize: 150, color: C.NAVY, letterSpacing: 1}}>
            RETUR?
            <svg width="110%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{position: 'absolute', left: '-5%', top: 0}}>
              <line x1={0} y1={62} x2={100 * strike} y2={62 - 20 * strike} stroke={C.ALERT_RED} strokeWidth={9} strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{strokeWidth: 18}} />
            </svg>
          </div>
        </div>
        <ChatBubble x={300} y={720} w={700} name="Sales PBF" text="Maaf Bu, fakturnya sudah ditandatangani apotek 🙏" tail="left" delay={6} />
        <Place x={300} scale={0.95}>
          <Owner pose="phone" expression="worried" rightProp={<Phone />} />
        </Place>
      </Camera>
      <Subtitle text="Mau retur? *Ditolak*" />
    </Background>
  );
};

/* ───────────── 6. SCENE 6 — SOLUSI ───────────── */
export const SFSolution: React.FC = () => (
  <Background sun clouds>
    <Camera>
      <Headline kicker="PAKAI APOTEK DIGITAL" kickerColor={C.BRAND_BLUE} lines={['BARANG MASUK', 'LANGSUNG', '_DICOCOKKAN_']} size={104} />
      <AppMockup top={660} highlight={[0, 1, 2]} />
      <Place x={190} scale={0.8}>
        <Owner pose="thumbsUp" expression="smile" />
      </Place>
      {[
        ['🚫 produk di luar SP', 1290],
        ['📈 harga naik diam-diam', 1385],
        ['⏳ ED kurang dari setahun', 1480],
      ].map(([t, y], i) => (
        <div key={i}>
          <Chip text={t as string} variant="white" x={1000} y={y as number} anchor="right" delay={6 + i * 8} />
        </div>
      ))}
      <Chip text="⚡ cek cepat walau lagi ramai" variant="blue" x={1000} y={1590} anchor="right" delay={34} />
      {/* centang hijau */}
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute'}}>
        {[1290, 1385, 1480].map((y) => (
          <g key={y} transform={`translate(${398} ${y})`}>
            <circle r={26} fill={C.SUCCESS} />
            <path d="M -11 0 L -3 9 L 12 -8" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
      </svg>
    </Camera>
    <Subtitle text="Barang masuk *langsung* *dicocokkan*" />
  </Background>
);

/* ───────────── 7. SCENE 7 — CTA ───────────── */
export const SFCta: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame / 6) * 0.03;
  return (
    <Background sun>
      <Camera>
        <Headline lines={['STOK ~AMAN.~', 'MODAL ~AMAN.~']} size={116} />
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute'}}>
          {/* sunburst halus */}
          <g transform="translate(540 860)" opacity={0.18}>
            {Array.from({length: 16}).map((_, i) => (
              <path key={i} d="M 0 0 L -40 -420 L 40 -420 Z" fill={C.HIGHLIGHT} transform={`rotate(${i * 22.5 + frame * 0.2})`} />
            ))}
          </g>
          {/* shield */}
          <g transform="translate(540 860)">
            <path d="M 0 -170 L 140 -120 Q 140 90 0 170 Q -140 90 -140 -120 Z" fill={C.SUCCESS} />
            <path d="M 0 -170 L 140 -120 Q 140 90 0 170 Z" fill="#1E9E64" />
            <path d="M -58 0 L -14 44 L 64 -44" stroke="#fff" strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
        {/* logo resmi */}
        <div style={{position: 'absolute', top: 1066, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 34}}>
          <Img src={staticFile('logo-apotek-digital.png')} style={{height: 92}} />
          <span style={{fontFamily: FONT, fontWeight: 700, fontSize: 40, color: C.KICKER}}>×</span>
          <Img src={staticFile('logo-digikes.png')} style={{height: 74}} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: 1180,
            left: 540,
            transform: `translateX(-50%) scale(${pulse})`,
            background: C.BRAND_BLUE,
            color: '#fff',
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 52,
            padding: '24px 64px',
            borderRadius: 999,
            boxShadow: '0 16px 34px rgba(45,100,207,0.35)',
            whiteSpace: 'nowrap',
          }}
        >
          Coba GRATIS
        </div>
        <Place x={200} scale={0.72}>
          <Owner pose="point" expression="smile" />
        </Place>
        <Place x={890} scale={0.72}>
          <Karyawan pose="thumbsUp" expression="smile" />
        </Place>
      </Camera>
      <Subtitle text="Coba *gratis* Apotek Digital" />
    </Background>
  );
};

/* Kasir cameo (scene 2) — dipakai juga sebagai style frame tambahan */
export const SFSetup: React.FC = () => (
  <Background>
    <Camera>
      <Headline kicker="SETIAP HARI" lines={['APOTEK RAMAI,', 'YANG JAGA', 'CUMA *2* *ORANG*']} size={100} />
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute'}}>
        {[760, 880, 1000].map((x, i) => (
          <g key={x} transform={`translate(${x} 1700) scale(${0.62 - i * 0.02})`} fill={C.NAVY} opacity={0.4}>
            <circle cx={0} cy={-470} r={64} />
            <path d="M -72 -390 Q 0 -410 72 -390 L 82 -200 L -82 -200 Z" />
            <rect x={-56} y={-210} width={44} height={210} rx={20} />
            <rect x={12} y={-210} width={44} height={210} rx={20} />
          </g>
        ))}
      </svg>
      <Place x={250} y={1640} scale={0.8}>
        <Kasir pose="idle" expression="neutral" />
      </Place>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute'}}>
        <CashierDesk x={250} y={1700} />
      </svg>
      <Place x={520} scale={0.8}>
        <Karyawan pose="holdPaper" expression="worried" holding="clipboard" />
      </Place>
      <Chip text="antre 8 pasien" variant="red" x={880} y={1250} />
    </Camera>
    <Subtitle text="Yang jaga cuma *dua* *orang*" />
  </Background>
);

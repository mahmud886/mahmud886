import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { caseStudies, experience, profile, saas, shortCompany } from '@/lib/data';

/*
 * Open Graph cards, drawn like the site's hero: a paper page with a dark rounded card.
 * Rendered at build time by next/og (Satori), so every flex container is explicit and
 * fonts are static TTFs (Satori reads neither WOFF2 nor variable fonts).
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = 'image/png';

const PAPER = '#f3f3f0';
const INK = '#0c0c0c';
const MUTED = '#7b7b77';
const CARD = '#0c0c0c';
const CARD_INK = '#f3f3f0';
const CARD_MUTED = '#8c8c88';

const dir = join(process.cwd(), 'src/lib/og');
const file = (...p: string[]) => readFile(join(dir, ...p));
const jpeg = async (name: string) => `data:image/jpeg;base64,${(await file('shots', `${name}.jpg`)).toString('base64')}`;

async function fonts() {
  const [inter5, inter8, allura, mono, cormorant] = await Promise.all([
    file('fonts', 'InterTight-500.ttf'),
    file('fonts', 'InterTight-800.ttf'),
    file('fonts', 'Allura-400.ttf'),
    file('fonts', 'GeistMono-500.ttf'),
    file('fonts', 'CormorantGaramond-Italic-500.ttf'),
  ]);
  return [
    { name: 'Inter', data: inter5, weight: 500 as const, style: 'normal' as const },
    { name: 'Inter', data: inter8, weight: 800 as const, style: 'normal' as const },
    { name: 'Allura', data: allura, weight: 400 as const, style: 'normal' as const },
    { name: 'Mono', data: mono, weight: 500 as const, style: 'normal' as const },
    { name: 'Cormorant', data: cormorant, weight: 500 as const, style: 'italic' as const },
  ];
}

const host = profile.site.replace(/^https?:\/\//, '');

function Label({ children, color = MUTED, size = 15 }: { children: React.ReactNode; color?: string; size?: number }) {
  return <div style={{ display: 'flex', fontFamily: 'Mono', fontSize: size, letterSpacing: 2.2, textTransform: 'uppercase', color, whiteSpace: 'nowrap' }}>{children}</div>;
}

function Brand() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 18, height: 18, borderRadius: 9, background: INK }} />
      <div style={{ display: 'flex', fontSize: 22, fontWeight: 800, letterSpacing: -0.6, textTransform: 'uppercase' }}>
        {profile.firstName}
        <span style={{ fontWeight: 500, marginLeft: 6 }}>{profile.lastName}</span>
      </div>
    </div>
  );
}

function Url({ path = '' }: { path?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', height: 46, padding: '0 20px', borderRadius: 23, background: INK, color: PAPER, fontSize: path.length > 26 ? 15 : 17, fontWeight: 800, letterSpacing: 0.2, whiteSpace: 'nowrap' }}>
        {host}
        {path}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 23, border: `2px solid ${INK}`, fontSize: 22, fontWeight: 800 }}>↗</div>
    </div>
  );
}

/** The paper page with a dark card on the right. */
function Frame({ left, card, cardWidth = 560 }: { left: React.ReactNode; card: React.ReactNode; cardWidth?: number }) {
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', background: PAPER, color: INK, fontFamily: 'Inter', padding: 36 }}>
      <div style={{ display: 'flex', flex: 1, padding: '14px 36px 10px 20px' }}>{left}</div>
      <div
        style={{
          display: 'flex',
          position: 'relative',
          width: cardWidth,
          height: '100%',
          borderRadius: 34,
          background: CARD,
          color: CARD_INK,
          overflow: 'hidden',
        }}
      >
        {card}
      </div>
    </div>
  );
}

/** A screenshot in a dark browser frame. */
function Shot({ src, w, h, label, style }: { src: string; w: number; h: number; label?: string; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: w,
        borderRadius: 16,
        overflow: 'hidden',
        border: '1.5px solid rgba(243,243,240,0.18)',
        background: '#1a1a1a',
        boxShadow: '0 30px 60px rgba(0,0,0,0.55)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 22, padding: '0 12px', background: '#161616' }}>
        <div style={{ width: 7, height: 7, borderRadius: 4, border: '1px solid rgba(243,243,240,0.4)' }} />
        <div style={{ width: 7, height: 7, borderRadius: 4, border: '1px solid rgba(243,243,240,0.4)' }} />
        <div style={{ width: 7, height: 7, borderRadius: 4, border: '1px solid rgba(243,243,240,0.4)' }} />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori draws plain <img> */}
      <img src={src} width={w} height={h} style={{ objectFit: 'cover', objectPosition: 'top' }} alt="" />
      {label && (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            left: 14,
            bottom: 14,
            padding: '7px 14px',
            borderRadius: 999,
            background: 'rgba(12,12,12,0.86)',
            color: CARD_INK,
            fontFamily: 'Mono',
            fontSize: 13,
            letterSpacing: 1.6,
            textTransform: 'uppercase',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

// Satori lays a fragment out as a flex row, so every slot gets a real container.
const COL: React.CSSProperties = { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%' };
const FILL: React.CSSProperties = { display: 'flex', position: 'relative', width: '100%', height: '100%' };

const render = async (node: React.ReactElement) => new ImageResponse(node, { ...OG_SIZE, fonts: await fonts() });

/* ------------------------------------------------------------------ home */

export async function homeOg() {
  const [portrait, a, b, c] = await Promise.all([jpeg('portrait'), ...saas.slice(0, 3).map((p) => jpeg(p.slug))]);
  return render(
    <Frame
      left={
        <div style={COL}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori draws plain <img> */}
            <img src={portrait} width={62} height={62} style={{ borderRadius: 31, border: `2px solid ${INK}` }} alt="" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Brand />
              <Label size={13}>Software Engineer · Dhaka · Remote</Label>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontFamily: 'Allura', fontSize: 128, lineHeight: 0.9, marginLeft: -4 }}>Hello.</div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 18, fontSize: 52, fontWeight: 800, lineHeight: 0.94, letterSpacing: -2.2, textTransform: 'uppercase' }}>
              <span>I build SaaS</span>
              <span>products that ship.</span>
            </div>
            <div style={{ display: 'flex', marginTop: 20, fontSize: 21, lineHeight: 1.35, color: '#3a3a38', maxWidth: 470 }}>
              {profile.years}+ years with React, Next.js & TypeScript — multi-tenant under the hood, beautifully animated on the surface.
            </div>
          </div>
          <Url />
        </div>
      }
      card={
        <div style={FILL}>
          <div style={{ display: 'flex', position: 'absolute', left: 30, top: 28, right: 30, justifyContent: 'space-between' }}>
            <Label color={CARD_MUTED} size={14}>SaaS I build</Label>
            <Label color={CARD_INK} size={14}>10+ products</Label>
          </div>
          <Shot src={c} w={330} h={206} style={{ left: 196, top: 84, transform: 'rotate(4deg)' }} />
          <Shot src={b} w={360} h={225} label="RestaurantOS" style={{ left: 40, top: 168, transform: 'rotate(-3deg)' }} />
          <Shot src={a} w={400} h={250} label="PartsPilot" style={{ left: 120, top: 288 }} />
        </div>
      }
    />
  );
}

/* ------------------------------------------------------------------ case study */

const titleSize = (t: string) => (t.length <= 8 ? 104 : t.length <= 11 ? 88 : t.length <= 14 ? 74 : 62);

export async function projectOg(slug: string) {
  const i = caseStudies.findIndex((p) => p.slug === slug);
  const p = caseStudies[i] ?? caseStudies[0];
  const shot = await jpeg(p.slug);
  const isLive = /live|beta/i.test(p.status);
  return render(
    <Frame
      cardWidth={540}
      left={
        <div style={COL}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Brand />
            <Label size={14}>
              Case {String(i + 1).padStart(2, '0')} / {String(caseStudies.length).padStart(2, '0')}
            </Label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Label size={15}>{p.kind}</Label>
            <div style={{ display: 'flex', marginTop: 12, fontSize: titleSize(p.title), fontWeight: 800, lineHeight: 0.9, letterSpacing: -4 }}>{p.title}.</div>
            <div style={{ display: 'flex', marginTop: 18, fontFamily: 'Cormorant', fontStyle: 'italic', fontSize: 30, lineHeight: 1.12, maxWidth: 520 }}>{p.tagline}</div>
            <div style={{ display: 'flex', marginTop: 26, borderTop: `2px solid ${INK}` }}>
              {p.metrics.map((m, k) => (
                <div key={m.label} style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingTop: 12, paddingLeft: k ? 14 : 0, borderLeft: k ? '1px solid rgba(12,12,12,0.15)' : 'none' }}>
                  <div style={{ display: 'flex', fontSize: 40, fontWeight: 800, letterSpacing: -1.8, lineHeight: 1 }}>{m.value}</div>
                  <div style={{ display: 'flex', marginTop: 6, fontFamily: 'Mono', fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase', color: MUTED, lineHeight: 1.3 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
          <Url path={`/projects/${p.slug}`} />
        </div>
      }
      card={
        <div style={FILL}>
          <div style={{ display: 'flex', position: 'absolute', left: 30, top: 28, right: 30, justifyContent: 'space-between', alignItems: 'center' }}>
            <Label color={CARD_MUTED} size={14}>{p.association}</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, border: `1.5px solid ${CARD_INK}`, fontFamily: 'Mono', fontSize: 13, letterSpacing: 1.6, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: CARD_INK, opacity: isLive ? 1 : 0.5 }} />
              {p.status}
            </div>
          </div>
          <Shot src={shot} w={600} h={375} label={p.screens[0].label} style={{ left: 30, top: 96 }} />
          <div style={{ display: 'flex', position: 'absolute', left: 30, bottom: 26, gap: 8, flexWrap: 'wrap', width: 480 }}>
            {p.stack.slice(0, 4).map((s) => (
              <div key={s} style={{ display: 'flex', padding: '6px 12px', borderRadius: 999, border: '1px solid rgba(243,243,240,0.25)', fontSize: 14, color: CARD_INK }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}

/* ------------------------------------------------------------------ experience */

export async function workOg(slug: string) {
  const j = experience.find((x) => x.slug === slug) ?? experience[0];
  const company = shortCompany(j.company);
  return render(
    <Frame
      cardWidth={460}
      left={
        <div style={COL}>
          <Brand />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Label size={15}>Experience · {j.period}</Label>
            <div style={{ display: 'flex', marginTop: 12, fontSize: company.length > 14 ? 70 : 86, fontWeight: 800, lineHeight: 0.92, letterSpacing: -3.5 }}>{company}.</div>
            <div style={{ display: 'flex', marginTop: 16, fontFamily: 'Cormorant', fontStyle: 'italic', fontSize: 36 }}>{j.role}</div>
            <div style={{ display: 'flex', marginTop: 18, fontSize: 21, lineHeight: 1.35, color: '#3a3a38', maxWidth: 560 }}>{j.summary}</div>
          </div>
          <Url path={`/work/${j.slug}`} />
        </div>
      }
      card={
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', padding: 34 }}>
          <Label color={CARD_MUTED} size={14}>What I used</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {j.tech.slice(0, 8).map((t) => (
              <div key={t} style={{ display: 'flex', padding: '9px 16px', borderRadius: 999, border: '1px solid rgba(243,243,240,0.3)', fontSize: 19 }}>
                {t}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', fontFamily: 'Allura', fontSize: 92, lineHeight: 1 }}>{j.current ? 'Now.' : 'Shipped.'}</div>
        </div>
      }
    />
  );
}

/* ------------------------------------------------------------------ resume */

export async function resumeOg() {
  const portrait = await jpeg('portrait');
  const stats = [
    { v: `${profile.years}+`, l: 'Years' },
    { v: '2M+', l: 'Daily users' },
    { v: '10+', l: 'Products' },
  ];
  return render(
    <Frame
      cardWidth={430}
      left={
        <div style={COL}>
          <Brand />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Label size={15}>2 pages · ATS-ready · PDF</Label>
            <div style={{ display: 'flex', marginTop: 10, fontSize: 132, fontWeight: 800, lineHeight: 0.86, letterSpacing: -6 }}>Resume.</div>
            <div style={{ display: 'flex', marginTop: 22, fontSize: 30, fontWeight: 800, letterSpacing: -0.8, textTransform: 'uppercase' }}>{profile.fullName}</div>
            <div style={{ display: 'flex', marginTop: 6, fontFamily: 'Cormorant', fontStyle: 'italic', fontSize: 30 }}>{profile.headline}</div>
          </div>
          <Url path="/resume" />
        </div>
      }
      card={
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '44px 34px 36px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori draws plain <img> */}
          <img src={portrait} width={200} height={200} style={{ borderRadius: 100, border: `3px solid ${CARD_INK}` }} alt="" />
          <div style={{ display: 'flex', width: '100%', borderTop: '1px solid rgba(243,243,240,0.2)' }}>
            {stats.map((s, k) => (
              <div key={s.l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, paddingTop: 18, borderLeft: k ? '1px solid rgba(243,243,240,0.2)' : 'none' }}>
                <div style={{ display: 'flex', fontSize: 46, fontWeight: 800, letterSpacing: -2 }}>{s.v}</div>
                <Label color={CARD_MUTED} size={12}>{s.l}</Label>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', fontSize: 19, color: CARD_MUTED }}>React · Next.js · TypeScript · SaaS</div>
        </div>
      }
    />
  );
}

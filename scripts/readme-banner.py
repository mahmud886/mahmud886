#!/usr/bin/env python3
"""
Draws the profile README banner (.github/readme/banner-{light,dark}.svg) in the style of
the site's hero: one rounded card with tabs carved out of two corners, the script
"Hello." and the wave line sculpture.

Display type is converted to vector paths (GitHub shows SVGs as images, so web fonts
can't load); small labels use the viewer's system fonts.

    pip install fonttools && python3 scripts/readme-banner.py
"""
import math
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "src/lib/og/fonts"
OUT = ROOT / ".github/readme"

W, H, R = 1280, 420, 28

THEMES = {
    # GitHub's own page colours, so the carved tabs read as cut-outs of the card.
    "light": dict(page="#ffffff", card="#0c0c0c", ink="#f3f3f0", muted="#8c8c88", tab_ink="#0c0c0c", tab_muted="#63635f", pill="#0c0c0c", pill_ink="#ffffff"),
    "dark": dict(page="#0d1117", card="#f0f0ec", ink="#0c0c0c", muted="#63635f", tab_ink="#f0f0ec", tab_muted="#9a9a95", pill="#f0f0ec", pill_ink="#0d1117"),
}


def text_path(font_file: str, text: str, size: float, x: float, y: float, tracking: float = 0) -> tuple[str, float]:
    """SVG path data for `text` with its baseline at (x, y); returns (d, advance width)."""
    font = TTFont(FONTS / font_file)
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    scale = size / font["head"].unitsPerEm
    pen = SVGPathPen(glyphs)
    cursor = x
    for ch in text:
        name = cmap.get(ord(ch))
        if name is None:
            continue
        glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, cursor, y)))
        cursor += glyphs[name].width * scale + tracking
    return pen.getCommands(), cursor - x


def wave_lines(cx: float, cy: float, scale: float, lines: int = 30, pts: int = 72) -> list[tuple[str, float]]:
    """The site's 'Frontend' form (a wave sheet), projected like LineSculpture does."""
    raw = []
    for l in range(lines):
        row = []
        for p in range(pts):
            t = p / (pts - 1)
            x = (t - 0.5) * 2.6
            z = (l / (lines - 1) - 0.5) * 2.6
            y = 0.34 * math.sin(2.1 * x + 1.2 * z) * math.cos(1.5 * z - 0.7 * x) + 0.12 * math.sin(4 * x)
            row.append((x, y, z))
        raw.append(row)
    flat = [q for row in raw for q in row]
    mx = sum(q[0] for q in flat) / len(flat)
    my = sum(q[1] for q in flat) / len(flat)
    mz = sum(q[2] for q in flat) / len(flat)
    rad = max(math.dist(q, (mx, my, mz)) for q in flat)
    ry, rx, D = -0.62, 0.36, 3.4
    cyr, syr, cxr, sxr = math.cos(ry), math.sin(ry), math.cos(rx), math.sin(rx)
    out = []
    for row in raw:
        coords, depth = [], 0.0
        for x, y, z in row:
            x, y, z = (x - mx) / rad, (y - my) / rad, (z - mz) / rad
            x1 = x * cyr + z * syr
            z1 = -x * syr + z * cyr
            y2 = y * cxr - z1 * sxr
            z2 = y * sxr + z1 * cxr
            f = D / (D - z2)
            coords.append(f"{cx + x1 * f * scale:.1f},{cy - y2 * f * scale:.1f}")
            depth += z2
        out.append((" ".join(coords), depth / len(row)))
    return out


def tab_path(w: float, h: float, r: float) -> str:
    """A tab hugging the top-left corner, with concave fillets where it meets the card."""
    return (
        f"M0 0H{w + r}A{r} {r} 0 0 0 {w} {r}V{h - r}A{r} {r} 0 0 1 {w - r} {h}"
        f"H{r}A{r} {r} 0 0 0 0 {h + r}Z"
    )


def banner(c: dict) -> str:
    hello, _ = text_path("Allura-400.ttf", "Hello.", 150, 34, 262)
    first, wfirst = text_path("InterTight-800.ttf", "IQBAL", 19, 50, 39)
    last, _ = text_path("InterTight-500.ttf", "MAHMUD", 19, 50 + wfirst + 6, 39)
    lines = wave_lines(905, 205, 250)
    lo = min(d for _, d in lines)
    hi = max(d for _, d in lines)
    sculpture = "\n".join(
        f'<polyline class="l" style="animation-delay:{0.15 + i * 0.035:.2f}s" stroke-opacity="{0.18 + 0.72 * (d - lo) / (hi - lo):.2f}" pathLength="1" points="{pts}"/>'
        for i, (pts, d) in enumerate(lines)
    )
    nav = ""
    x = 222
    for label, w, on in (("SAAS", 64, True), ("WORK", 70, False), ("LAB", 54, False)):
        fill = c["tab_ink"] if on else "none"
        ink = c["page"] if on else c["tab_ink"]
        nav += f'<rect x="{x}" y="15" width="{w}" height="32" rx="16" fill="{fill}" stroke="{c["tab_ink"]}" stroke-opacity="{1 if on else 0.35}"/>'
        nav += f'<text x="{x + w / 2}" y="35.5" text-anchor="middle" class="s" font-size="11.5" font-weight="700" letter-spacing="1" fill="{ink}">{label}</text>'
        x += w + 6

    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="Hello. Iqbal Mahmud — Software Engineer building SaaS products and fast, animated web apps with React, Next.js and TypeScript.">
  <title>Iqbal Mahmud — Software Engineer</title>
  <style>
    .s {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; }}
    .m {{ font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; letter-spacing: 2px; }}
    .l {{ fill: none; stroke: {c["ink"]}; stroke-width: 1.1; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 1.6s cubic-bezier(.16,1,.3,1) forwards; }}
    .float {{ animation: float 7s ease-in-out 2s infinite alternate; }}
    .rise {{ opacity: 0; animation: rise 1.1s cubic-bezier(.16,1,.3,1) forwards; }}
    .pulse {{ animation: pulse 2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }}
    @keyframes draw {{ to {{ stroke-dashoffset: 0; }} }}
    @keyframes float {{ to {{ transform: translate(-10px, 8px); }} }}
    @keyframes rise {{ from {{ opacity: 0; transform: translateY(14px); }} to {{ opacity: 1; transform: none; }} }}
    @keyframes pulse {{ 50% {{ opacity: .35; transform: scale(.7); }} }}
    @media (prefers-reduced-motion: reduce) {{
      .l {{ animation: none; stroke-dashoffset: 0; }}
      .float, .pulse {{ animation: none; }}
      .rise {{ animation: none; opacity: 1; }}
    }}
  </style>

  <rect width="{W}" height="{H}" rx="{R}" fill="{c["card"]}"/>

  <g class="float">
{sculpture}
  </g>

  <text x="40" y="118" class="m rise" font-size="13" fill="{c["muted"]}">SOFTWARE ENGINEER · DHAKA · REMOTE</text>
  <path class="rise" style="animation-delay:.15s" fill="{c["ink"]}" d="{hello}"/>
  <text x="40" y="312" class="s rise" style="animation-delay:.3s" font-size="23" font-weight="600" fill="{c["ink"]}">I build SaaS products and fast, animated web apps.</text>
  <text x="40" y="346" class="m rise" style="animation-delay:.42s" font-size="13" fill="{c["muted"]}">REACT · NEXT.JS · TYPESCRIPT · {7}+ YEARS</text>
  <text x="40" y="382" class="m rise" style="animation-delay:.54s" font-size="12" fill="{c["muted"]}">NOW → PARTSPILOT · RESTAURANTOS · PURECART</text>

  <g>
    <circle class="pulse" cx="1056" cy="113.5" r="4.5" fill="{c["ink"]}"/>
    <text x="1072" y="118" class="m" font-size="12" fill="{c["ink"]}">AVAILABLE FOR WORK</text>
  </g>

  <!-- top-left tab: name + chapters -->
  <path fill="{c["page"]}" d="{tab_path(430, 64, 24)}"/>
  <circle cx="30" cy="32" r="9" fill="{c["tab_ink"]}"/>
  <path fill="{c["tab_ink"]}" d="{first}"/>
  <path fill="{c["tab_ink"]}" d="{last}"/>
  {nav}

  <!-- bottom-right tab: the site -->
  <path fill="{c["page"]}" transform="translate({W} {H}) scale(-1 -1)" d="{tab_path(330, 70, 24)}"/>
  <rect x="980" y="366" width="236" height="42" rx="21" fill="{c["pill"]}"/>
  <text x="1098" y="392" text-anchor="middle" class="s" font-size="14" font-weight="700" fill="{c["pill_ink"]}">mahmud886.vercel.app</text>
  <circle cx="1246" cy="387" r="21" fill="none" stroke="{c["tab_ink"]}" stroke-width="1.5"/>
  <text x="1246" y="393" text-anchor="middle" class="s" font-size="16" font-weight="700" fill="{c["tab_ink"]}">↗</text>
</svg>
"""


for name, colours in THEMES.items():
    (OUT / f"banner-{name}.svg").write_text(banner(colours))
    print(f"wrote banner-{name}.svg ({(OUT / f'banner-{name}.svg').stat().st_size // 1024} KB)")

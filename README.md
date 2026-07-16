# Salon Bené — Website

A hand-built site for **Salon Bené Inc.**, the family-owned hair salon in
Clock Tower Plaza, Melville, NY (1 Schwab Rd #4 · 631-673-5151).

## Design

The look is drawn directly from the salon's storefront signage: a lacquer-black
oval with silver copperplate script. The site commits to that palette
throughout — lacquer black (`#0e0e10`), aged ivory (`#f3efe7`), brushed silver
(`#b9bac2`) and a candlelight champagne accent (`#c8a468`) — with:

- **Pinyon Script** for the logotype (closest web match to the sign's script)
- **Cormorant Garamond** for editorial headings
- **Jost** for body text and letterspaced UI labels

Interactions are all dependency-free vanilla JS: a script-logo entry loader,
scroll-reveal choreography, hero parallax, a cursor-following image peek on the
services list, an auto-rotating review carousel, a services marquee, and an
"open now" note computed from the salon's real hours. Reduced-motion
preferences are respected throughout.

## Photography

All photography was generated with **Higgsfield** (Soul v2) to match the
salon's moody, candle-lit elegance, and is served from Higgsfield's CDN.
To self-host the images instead, run:

```sh
./scripts/localize-images.sh
```

from the repo root on a machine with normal internet access. It downloads each
image into `assets/img/` and rewrites `index.html` to the local paths.

## Running

It's a fully static site — no build step. Open `index.html` directly, or:

```sh
python3 -m http.server 8000
```

and visit <http://localhost:8000>.

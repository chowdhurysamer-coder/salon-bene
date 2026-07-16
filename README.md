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

All artwork is original, hand-drawn inline SVG — drifting silk-strand line art
in the hero, an engraved art-deco crest of the storefront oval, and a set of
stroke-drawn service icons. No stock photos and no imagery pretending to be
the real interior.

Interactions are dependency-free vanilla JS: a script-logo entry loader,
scroll-reveal choreography, hero parallax, a cursor-following engraved card on
the services list, an auto-rotating review carousel (real Yelp/Google quotes),
a services marquee, and an hours table that highlights today and shows a live
"open now" note. Reduced-motion preferences are respected throughout, and the
page ships LocalBusiness JSON-LD for search.

## Running

It's a fully static site — no build step. Open `index.html` directly, or:

```sh
python3 -m http.server 8000
```

and visit <http://localhost:8000>.

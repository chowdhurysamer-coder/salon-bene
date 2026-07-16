#!/usr/bin/env bash
# Downloads the Higgsfield-hosted photography into assets/img/ and rewrites
# index.html to reference the local copies. Run from the repo root.
set -euo pipefail

BASE="https://d8j0ntlcm91z4.cloudfront.net/user_3GYBS62dxIIG18Q4M3dG53faoa7"

declare -A IMAGES=(
  ["hero-salon.png"]="hf_20260716_015251_74ee08c5-da57-4816-9b0b-f02afca365c2.png"
  ["hero-salon.webp"]="hf_20260716_015251_74ee08c5-da57-4816-9b0b-f02afca365c2_min.webp"
  ["craft-hands.webp"]="hf_20260716_015253_c31604cb-25b9-4c6e-bf12-fa10d49a526e_min.webp"
  ["color-balayage.webp"]="hf_20260716_015255_0fcfcff7-a7cb-418b-882f-8491ac15eebf_min.webp"
  ["mens-grooming.webp"]="hf_20260716_015305_09b79bec-07ca-4cfa-a492-4aa21b11026c_min.webp"
  ["wash-ritual.webp"]="hf_20260716_015309_82916be5-cb21-46d6-992d-8c0c694321e7_min.webp"
  ["detail-candelabra.webp"]="hf_20260716_015310_68657669-a7bb-4c61-97e2-23d6e6a73fc3_min.webp"
)

mkdir -p assets/img
for local in "${!IMAGES[@]}"; do
  remote="${IMAGES[$local]}"
  echo "· $local"
  curl -fsSL -o "assets/img/$local" "$BASE/$remote"
  sed -i.bak "s|$BASE/$remote|assets/img/$local|g" index.html
done
rm -f index.html.bak
echo "Done — images localized to assets/img/."

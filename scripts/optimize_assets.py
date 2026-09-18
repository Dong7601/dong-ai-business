"""Encode existing site images as WebP; preserve the PNG originals."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
names = ["hero", "training", "consulting", "japan", "background", "dong", "what-i-do", "site-logo-symbol-dong-v2"]
before = after = 0
for name in names:
    source = root / "assets" / (name + ".png")
    target = source.with_suffix(".webp")
    with Image.open(source) as image:
        image.save(target, "WEBP", quality=85, method=6, lossless=name.startswith("site-logo"))
    before += source.stat().st_size
    after += target.stat().st_size
    print(f"{name}: {source.stat().st_size:,} -> {target.stat().st_size:,} bytes")
print(f"Total: {before:,} -> {after:,} bytes ({(1-after/before)*100:.1f}% smaller)")

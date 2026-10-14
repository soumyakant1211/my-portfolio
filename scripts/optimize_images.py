"""Convert JPEG/PNG images in public/ to resized WebP files for faster page loads.

Usage:
    python scripts/optimize_images.py                 # every .jpg/.jpeg/.png in public/
    python scripts/optimize_images.py public/new.jpg  # specific files

Each image is written next to the original with a .webp extension. Originals are
left in place; delete them once the components reference the .webp version.
Requires Pillow (pip install Pillow).
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

PUBLIC_DIR = Path(__file__).resolve().parent.parent / "public"
SOURCE_SUFFIXES = {".jpg", ".jpeg", ".png"}
MAX_WIDTH = 800
QUALITY = 80


def optimize_image(input_path: Path, max_width: int = MAX_WIDTH, quality: int = QUALITY) -> Path:
    output_path = input_path.with_suffix(".webp")
    with Image.open(input_path) as img:
        # Apply EXIF rotation so phone photos don't end up sideways
        img = ImageOps.exif_transpose(img)
        if img.width > max_width:
            new_height = round(img.height * max_width / img.width)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        img.save(output_path, "WEBP", quality=quality, method=6)

    before = input_path.stat().st_size / 1024
    after = output_path.stat().st_size / 1024
    print(f"{input_path.name} ({before:.0f} KB) -> {output_path.name} ({after:.0f} KB)")
    return output_path


def main(args: list[str]) -> int:
    if args:
        paths = [Path(a).resolve() for a in args]
    else:
        paths = sorted(p for p in PUBLIC_DIR.iterdir() if p.suffix.lower() in SOURCE_SUFFIXES)

    if not paths:
        print("No images to optimize.")
        return 0

    failed = False
    for path in paths:
        try:
            optimize_image(path)
        except (OSError, ValueError) as exc:
            print(f"Failed to optimize {path}: {exc}", file=sys.stderr)
            failed = True
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))

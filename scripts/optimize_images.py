import os
from PIL import Image

def optimize_image(input_path, output_path, max_width=800, quality=80):
    if not os.path.exists(input_path):
        print(f"File not found: {input_path}")
        return
    
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary (e.g. for PNG with alpha channel moving to WEBP)
            # WebP supports alpha, but if saving as JPEG we'd convert. We keep it as is if saving to WEBP.
            
            # Calculate new size while preserving aspect ratio
            width, height = img.size
            if width > max_width:
                new_width = max_width
                new_height = int((max_width / width) * height)
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Save compressed file
            img.save(output_path, "WEBP", quality=quality, method=4)
            print(f"Successfully optimized: {input_path} -> {output_path}")
            
    except Exception as e:
        print(f"Error optimizing {input_path}: {e}")

if __name__ == "__main__":
    public_dir = os.path.join(os.path.dirname(__file__), "..", "public")
    
    # Files to optimize
    img1 = os.path.join(public_dir, "award_photo_1.JPG")
    img2 = os.path.join(public_dir, "award_photo_2.png")
    
    # Optimized output paths
    out1 = os.path.join(public_dir, "award_photo_1_optimized.webp")
    out2 = os.path.join(public_dir, "award_photo_2.webp")  # I'll just name the second one .webp to match what I'll link
    
    optimize_image(img1, out1)
    optimize_image(img2, out2)

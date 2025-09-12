#!/usr/bin/env python3

import os
from PIL import Image


def _has_transparency(img):
    """
    Check if image has transparency
    """
    return img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info)


def compress_images(max_width=800, max_height=800, quality=85, target_size_kb=100):
    """
    Compress PNG images from _marketing/icon folder and move them to public/character folder
    
    Args:
        max_width: Maximum width in pixels (default: 800)
        max_height: Maximum height in pixels (default: 800)
        quality: JPEG quality for conversion (1-100, default: 85)
        target_size_kb: Target file size in KB (default: 100)
    """
    # Define source and destination directories relative to script location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    source_dir = os.path.join(script_dir, "icon")
    dest_dir = os.path.join(project_root, "public", "character")
    
    # Create destination directory if it doesn't exist
    os.makedirs(dest_dir, exist_ok=True)
    
    # Get all PNG files in the source directory (not subdirectories)
    png_files = [f for f in os.listdir(source_dir) 
                 if f.lower().endswith('.png') and os.path.isfile(os.path.join(source_dir, f))]
    
    if not png_files:
        print("No PNG files found in the source directory.")
        return
    
    print(f"Found {len(png_files)} PNG files to compress:")
    
    for filename in png_files:
        source_path = os.path.join(source_dir, filename)
        dest_path = os.path.join(dest_dir, filename)
        
        try:
            # Open and compress the image
            with Image.open(source_path) as img:
                # Get original file size
                original_size = os.path.getsize(source_path)
                
                # Resize image if it's too large
                if img.width > max_width or img.height > max_height:
                    img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
                
                # Try different compression strategies
                best_img = None
                best_size = float('inf')
                best_format = None
                
                # Strategy 1: Optimized PNG
                if img.mode in ('RGBA', 'LA', 'P'):
                    png_img = img.convert('RGBA')
                else:
                    png_img = img.convert('RGB')
                
                temp_png = dest_path.replace('.png', '_temp.png')
                png_img.save(temp_png, 'PNG', optimize=True, compress_level=9)
                png_size = os.path.getsize(temp_png)
                
                if png_size < best_size:
                    best_size = png_size
                    best_img = temp_png
                    best_format = 'PNG'
                
                # Strategy 2: Convert to JPEG if no transparency needed
                if img.mode != 'RGBA' or not _has_transparency(img):
                    rgb_img = img.convert('RGB')
                    temp_jpg = dest_path.replace('.png', '_temp.jpg')
                    rgb_img.save(temp_jpg, 'JPEG', quality=quality, optimize=True)
                    jpg_size = os.path.getsize(temp_jpg)
                    
                    if jpg_size < best_size:
                        if best_img and best_img != temp_jpg:
                            os.remove(best_img)
                        best_size = jpg_size
                        best_img = temp_jpg
                        best_format = 'JPEG'
                    else:
                        os.remove(temp_jpg)
                
                # If still too large, try more aggressive compression
                if best_size > target_size_kb * 1024:
                    for q in [70, 50, 30, 20]:
                        if img.mode != 'RGBA' or not _has_transparency(img):
                            rgb_img = img.convert('RGB')
                            temp_aggressive = dest_path.replace('.png', f'_temp_q{q}.jpg')
                            rgb_img.save(temp_aggressive, 'JPEG', quality=q, optimize=True)
                            aggressive_size = os.path.getsize(temp_aggressive)
                            
                            if aggressive_size < best_size:
                                if best_img:
                                    os.remove(best_img)
                                best_size = aggressive_size
                                best_img = temp_aggressive
                                best_format = f'JPEG (Q{q})'
                            else:
                                os.remove(temp_aggressive)
                            
                            if best_size <= target_size_kb * 1024:
                                break
                
                # Move the best result to final destination
                if best_img:
                    if best_format.startswith('JPEG'):
                        final_dest = dest_path.replace('.png', '.jpg')
                    else:
                        final_dest = dest_path
                    
                    os.rename(best_img, final_dest)
                    
                    # Clean up any remaining temp files
                    for temp_file in [temp_png]:
                        if os.path.exists(temp_file) and temp_file != final_dest:
                            os.remove(temp_file)
                
                # Get compressed file size and show results
                if best_img:
                    final_size = os.path.getsize(final_dest if 'final_dest' in locals() else dest_path)
                    compression_ratio = (1 - final_size / original_size) * 100
                    final_filename = os.path.basename(final_dest if 'final_dest' in locals() else dest_path)
                    
                    print(f"✓ {filename} → {final_filename}: {original_size:,} bytes → {final_size:,} bytes ({compression_ratio:.1f}% reduction) [{best_format}]")
                else:
                    print(f"✗ Failed to compress {filename}")
                
        except Exception as e:
            print(f"✗ Error processing {filename}: {str(e)}")
    
    print(f"\nCompression completed! Files saved to: {dest_dir}")

if __name__ == "__main__":
    import sys
    
    # Default parameters
    max_width = 200
    max_height = 200
    quality = 45
    target_size_kb = 20  # Target 60KB for very small files
    
    # Parse command line arguments if provided
    if len(sys.argv) > 1:
        try:
            if '--aggressive' in sys.argv:
                # Aggressive compression for very small files
                max_width = 400
                max_height = 400
                quality = 70
                target_size_kb = 30
                print("Using aggressive compression settings...")
            elif '--web' in sys.argv:
                # Web-optimized compression
                max_width = 600
                max_height = 600
                quality = 80
                target_size_kb = 100
                print("Using web-optimized compression settings...")
            elif '--custom' in sys.argv:
                # Custom parameters
                idx = sys.argv.index('--custom')
                if len(sys.argv) > idx + 4:
                    max_width = int(sys.argv[idx + 1])
                    max_height = int(sys.argv[idx + 2])
                    quality = int(sys.argv[idx + 3])
                    target_size_kb = int(sys.argv[idx + 4])
                    print(f"Using custom settings: {max_width}x{max_height}, quality={quality}, target={target_size_kb}KB")
        except (ValueError, IndexError):
            print("Invalid arguments. Using default settings.")
    
    print(f"Compression settings: Max size: {max_width}x{max_height}, Quality: {quality}, Target: {target_size_kb}KB\n")
    compress_images(max_width, max_height, quality, target_size_kb)
    
    print("\n=== Usage Examples ===")
    print("python compress_image.py                    # Default settings")
    print("python compress_image.py --aggressive       # Very small files (30KB target)")
    print("python compress_image.py --web              # Web optimized (100KB target)")
    print("python compress_image.py --custom 400 400 60 50  # Custom: 400x400, quality=60, target=50KB")

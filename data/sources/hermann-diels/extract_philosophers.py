#!/usr/bin/env python3
"""
Extract philosopher texts from band1.txt based on manifest.json
Only extracts philosophers with hasFragmente: true
"""

import json
import os
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).parent
MANIFEST_PATH = BASE_DIR / "manifest.json"
BAND1_PATH = BASE_DIR / "band1.txt"
OUTPUT_DIR = BASE_DIR / "philosophers"

def main():
    # Read manifest
    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    # Create output directory
    OUTPUT_DIR.mkdir(exist_ok=True)

    # Read band1.txt
    with open(BAND1_PATH, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    extracted = []

    # Extract each philosopher with fragments
    for philo in manifest['philosophers']:
        if not philo['hasFragmente']:
            continue

        number = philo['number']
        name = philo['name']
        start_line = philo['startLine']
        end_line = philo['endLine']

        # Extract lines (convert from 1-based to 0-based indexing)
        philo_lines = lines[start_line - 1:end_line]

        # Create filename
        filename = f"{number:0>2s}-{name.replace(' ', '_').replace('/', '-')}.txt"
        output_path = OUTPUT_DIR / filename

        # Write to file
        with open(output_path, 'w', encoding='utf-8') as f:
            f.writelines(philo_lines)

        # Calculate stats
        line_count = len(philo_lines)
        file_size = output_path.stat().st_size

        extracted.append({
            'number': number,
            'name': name,
            'filename': filename,
            'line_count': line_count,
            'file_size': file_size,
            'start_line': start_line,
            'end_line': end_line
        })

        print(f"[OK] Extracted {number:>3s}. {name:30s} ({line_count:5d} lines, {file_size:7d} bytes)")

    # Create INDEX.md
    create_index(extracted, manifest)

    print(f"\n[OK] Extracted {len(extracted)} philosophers with fragments")
    print(f"[OK] Created INDEX.md")

def create_index(extracted, manifest):
    """Create INDEX.md with listing of all extracted files"""

    index_path = OUTPUT_DIR / "INDEX.md"

    with open(index_path, 'w', encoding='utf-8') as f:
        f.write("# Extracted Philosophers from Hermann Diels\n\n")
        f.write("**Source**: Die Fragmente der Vorsokratiker (1912), Band 1\n\n")
        f.write(f"**Total philosophers in manifest**: {len(manifest['philosophers'])}\n")
        f.write(f"**Philosophers with fragments**: {len(extracted)}\n")
        f.write(f"**Extracted**: {len(extracted)}\n\n")

        f.write("## Extracted Files\n\n")
        f.write("| # | Philosopher | File | Lines | Size (KB) | Range |\n")
        f.write("|---|-------------|------|------:|----------:|-------|\n")

        for item in extracted:
            f.write(f"| {item['number']} | {item['name']} | `{item['filename']}` | "
                   f"{item['line_count']:,} | {item['file_size']/1024:.1f} | "
                   f"{item['start_line']}–{item['end_line']} |\n")

        f.write("\n## Notes\n\n")
        f.write("- Only philosophers with `hasFragmente: true` were extracted\n")
        f.write("- Line numbers are preserved from the original band1.txt\n")
        f.write("- Files contain the complete text for each philosopher including:\n")
        f.write("  - A. LEBEN UND LEHRE (Life and Teachings)\n")
        f.write("  - B. FRAGMENTE (Fragments)\n")
        f.write("- Text is in German with Greek quotations\n")

if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""
Update manifest to mark which philosophers have fragments (section B)
"""
import json
import re

def check_for_fragments(file_path, manifest_path):
    """Check which philosopher sections contain 'B. FRAGMENTE'"""

    # Load manifest
    with open(manifest_path, 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    # Read the text file
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Pattern for fragment sections
    fragment_pattern = re.compile(r'^\s*B\.\s+(FRAGMENTE|FR\.|FRAGMENTS)', re.IGNORECASE)

    # Check each philosopher
    for phil in manifest['philosophers']:
        start = phil['startLine'] - 1  # Convert to 0-indexed
        end = phil['endLine']

        has_fragments = False
        for line_num in range(start, min(end, len(lines))):
            if fragment_pattern.search(lines[line_num]):
                has_fragments = True
                break

        phil['hasFragmente'] = has_fragments

    # Save updated manifest
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    return manifest

def display_results(manifest):
    """Display which philosophers have fragments"""
    print("\nPhilosophers with fragments:")
    print("-" * 70)
    with_fragments = [p for p in manifest['philosophers'] if p['hasFragmente']]
    for phil in with_fragments:
        print(f"  {phil['number']:>3}. {phil['name']:<45}")

    print(f"\nTotal: {len(with_fragments)} philosophers with fragments out of {len(manifest['philosophers'])}")

    print("\nPhilosophers without fragments:")
    print("-" * 70)
    without_fragments = [p for p in manifest['philosophers'] if not p['hasFragmente']]
    for phil in without_fragments:
        print(f"  {phil['number']:>3}. {phil['name']:<45}")

if __name__ == '__main__':
    file_path = 'data/sources/hermann-diels/band1.txt'
    manifest_path = 'data/sources/hermann-diels/manifest.json'

    print("Checking for fragment sections in each philosopher...")
    manifest = check_for_fragments(file_path, manifest_path)

    display_results(manifest)

    print(f"\nManifest updated: {manifest_path}")

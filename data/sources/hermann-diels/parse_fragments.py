#!/usr/bin/env python3
"""
Parse B. FRAGMENTE sections from Diels philosophers files.
Extract DK numbers, Greek text, and German translations.
"""
import re
import json
from pathlib import Path

def parse_heraclitus_fragments(filepath):
    """
    Parse Heraclitus fragments from 12-Heraclitus.txt

    Structure:
    - Line starts with number: DK fragment number (e.g., "1 [2 Βγν.]")
    - Followed by source citation
    - Greek text in curly braces or plain
    - German translation after blank line (starts with number + period)
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Find B. FRAGMENTE section
    start_idx = None
    for i, line in enumerate(lines):
        if line.strip() == 'B. FRAGMENTE.':
            start_idx = i
            break

    if not start_idx:
        print("B. FRAGMENTE section not found!")
        return []

    # Find end (C. section)
    end_idx = len(lines)
    for i in range(start_idx, len(lines)):
        if lines[i].strip().startswith('C.'):
            end_idx = i
            break

    print(f"B. FRAGMENTE section: lines {start_idx}-{end_idx}")

    # Extract fragments
    fragments = []
    current_fragment = None
    in_greek = False
    greek_text = []

    for i in range(start_idx, end_idx):
        line = lines[i].rstrip()

        # Skip header
        if 'HPAK_AEITOY' in line or 'ΦΥΣΕΩΣ' in line:
            continue

        # Fragment number line (starts with digit(s) followed by space and bracket)
        match = re.match(r'^(\d+)\s+\[', line)
        if match:
            # Save previous fragment
            if current_fragment:
                current_fragment['greek'] = ' '.join(greek_text).strip()
                fragments.append(current_fragment)

            # Start new fragment
            dk_number = match.group(1)
            current_fragment = {
                'dk_number': f'B.{dk_number}',
                'line': start_idx + i + 1,
                'source_line': line
            }
            greek_text = []
            in_greek = True
            continue

        # Collect Greek text (has Greek characters)
        if in_greek and current_fragment:
            # Check if line has Greek characters
            if any('Ͱ' <= c <= 'Ͽ' or 'ἀ' <= c <= '῿' for c in line):
                # Remove leading/trailing whitespace and punctuation markers
                clean_line = line.strip()
                if clean_line:
                    greek_text.append(clean_line)

    # Save last fragment
    if current_fragment:
        current_fragment['greek'] = ' '.join(greek_text).strip()
        fragments.append(current_fragment)

    return fragments

def main():
    phil_dir = Path('data/sources/hermann-diels/philosophers')
    heraclitus_file = phil_dir / '12-Heraclitus.txt'

    if not heraclitus_file.exists():
        print(f"File not found: {heraclitus_file}")
        return

    print("Parsing Heraclitus fragments...")
    fragments = parse_heraclitus_fragments(heraclitus_file)

    print(f"\nExtracted {len(fragments)} fragments")

    # Save to JSON
    output_file = phil_dir / '12-Heraclitus-fragments.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(fragments, f, ensure_ascii=False, indent=2)

    print(f"Saved to: {output_file}")

if __name__ == '__main__':
    main()

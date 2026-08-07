#!/usr/bin/env python3
"""Extract Diogenes Cynicus chapter from Burley PDF"""

import sys
try:
    import PyPDF2
except ImportError:
    print("ERROR: PyPDF2 not installed. Install with: pip install PyPDF2")
    sys.exit(1)

pdf_path = "data/sources/walter-burley/BLV_177_Gualteri_Burlaei_liber_De_vita_et_moribus_philosophorum.pdf"
output_path = "data/sources/walter-burley/latin_raw/diogenes_cynicus.txt"

print(f"Opening PDF: {pdf_path}")

try:
    with open(pdf_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        total_pages = len(pdf_reader.pages)
        print(f"Total pages: {total_pages}")

        # Cap. XLIX starts at page 197 (physical page ~209 with frontmatter)
        # We need to find it by searching for "Diogenes" in pages around 197

        start_page = None
        end_page = None

        # Search for start (around page 200-220 in PDF index)
        print("\nSearching for 'Cap. XLIX' or 'Diogenes'...")
        for i in range(200, min(230, total_pages)):
            try:
                text = pdf_reader.pages[i].extract_text()
                if 'Cap. XLIX' in text or ('Diogenes' in text and 'cynicus' in text.lower()):
                    start_page = i
                    print(f"Found start at PDF page {i+1}")
                    break
            except Exception as e:
                print(f"Error reading page {i}: {e}")
                continue

        if not start_page:
            print("ERROR: Could not find Cap. XLIX Diogenes")
            sys.exit(1)

        # Find end (next chapter Cap. L or similar)
        print("Searching for next chapter...")
        for i in range(start_page + 1, min(start_page + 20, total_pages)):
            try:
                text = pdf_reader.pages[i].extract_text()
                # Look for next chapter number
                if 'Cap. L' in text or 'Cap. LI' in text:
                    end_page = i - 1
                    print(f"Found end at PDF page {i}")
                    break
            except Exception as e:
                continue

        if not end_page:
            end_page = min(start_page + 10, total_pages - 1)
            print(f"Using default end page: {end_page+1}")

        # Extract text
        print(f"\nExtracting pages {start_page+1} to {end_page+1}...")
        extracted_text = []

        for i in range(start_page, end_page + 1):
            try:
                page_text = pdf_reader.pages[i].extract_text()
                extracted_text.append(page_text)
                print(f"  Page {i+1}: {len(page_text)} chars")
            except Exception as e:
                print(f"  Error on page {i+1}: {e}")

        full_text = "\n\n".join(extracted_text)

        # Write output
        with open(output_path, 'w', encoding='utf-8') as out:
            out.write(full_text)

        print(f"\n✅ Extracted {len(full_text)} characters to {output_path}")
        print(f"✅ Total lines: {full_text.count(chr(10)) + 1}")

except FileNotFoundError:
    print(f"ERROR: PDF file not found: {pdf_path}")
    sys.exit(1)
except Exception as e:
    print(f"ERROR: {e}")
    sys.exit(1)

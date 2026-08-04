#!/usr/bin/env python3
"""
Extract Latin text from Walter Burley PDF
Extracts only the Latin text (left pages), ignoring Spanish translation and German footnotes
"""

import sys
import re

def extract_latin_from_pdf(pdf_path, output_path):
    """
    Extract Latin text from PDF using basic text extraction
    This is a placeholder - requires pdfplumber or PyPDF2
    """

    try:
        import pdfplumber

        print(f"Opening PDF: {pdf_path}")

        with pdfplumber.open(pdf_path) as pdf:
            total_pages = len(pdf.pages)
            print(f"Total pages: {total_pages}")

            latin_text = []

            # Skip first few pages (title, etc.)
            start_page = 5  # Adjust based on where actual text starts

            for i, page in enumerate(pdf.pages[start_page:], start=start_page):
                if i % 10 == 0:
                    print(f"Processing page {i}/{total_pages}...")

                text = page.extract_text()

                if text:
                    # Basic cleanup
                    lines = text.split('\n')

                    # Try to identify Latin vs Spanish sections
                    # Latin typically on even pages or left side
                    # This is a simple heuristic - may need adjustment

                    for line in lines:
                        # Skip German footnotes (contain German words)
                        if any(word in line.lower() for word in ['diog.', 'laert.', 'vgl.', 'bd.', 'nr.']):
                            continue

                        # Skip page numbers
                        if line.strip().isdigit():
                            continue

                        # Skip very short lines
                        if len(line.strip()) < 10:
                            continue

                        # Add line if it looks like Latin
                        # (Contains Latin-looking words)
                        if any(word in line for word in ['philosophorum', 'philosophus', 'dicitur', 'enim', 'autem', 'ait', 'quid']):
                            latin_text.append(line)

            # Write to output
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write('\n'.join(latin_text))

            print(f"\nExtracted {len(latin_text)} lines of Latin text")
            print(f"Saved to: {output_path}")

            return True

    except ImportError:
        print("ERROR: pdfplumber not installed")
        print("Install with: pip install pdfplumber")
        return False
    except Exception as e:
        print(f"ERROR: {e}")
        return False

if __name__ == '__main__':
    pdf_path = '../../../BLV_177_Gualteri_Burlaei_liber_De_vita_et_moribus_philosophorum.pdf'
    output_path = 'latin_text_raw.txt'

    extract_latin_from_pdf(pdf_path, output_path)

# How to Extract Latin Text from Walter Burley PDF

## Problem

The PDF is 400+ pages, and we can only read 20 pages at a time with the Read tool.
Manual extraction would require ~20 separate read operations.

## Solutions

### Option 1: Manual extraction (slow but accurate)

Read PDF in 20-page chunks and manually copy Latin text:

```bash
# Read pages 1-20, 21-40, 41-60, etc.
# Extract Latin paragraphs
# Append to latin_text.txt
```

**Pros:** Accurate, can filter out Spanish and footnotes  
**Cons:** 20+ operations, time-consuming

### Option 2: Python script with pdfplumber (recommended)

```bash
# Install dependencies
pip install pdfplumber

# Run extraction script
python extract_latin_text.py
```

This will:
- Open the PDF automatically
- Extract all text
- Filter out Spanish (right column) and German footnotes
- Save to `latin_text_raw.txt`

**Pros:** Fast, automated  
**Cons:** Requires Python library installation

### Option 3: OCR tools

Use external OCR tool:
- Adobe Acrobat (Extract Text)
- Tesseract OCR
- Google Cloud Vision API

**Pros:** Very accurate  
**Cons:** Requires external tools

### Option 4: Online PDF to Text converters

Upload PDF to:
- https://www.ilovepdf.com/pdf_to_text
- https://pdftotext.com/
- https://www.zamzar.com/convert/pdf-to-txt/

**Pros:** No installation needed  
**Cons:** Privacy concerns (uploading document), less control over filtering

## Recommended Approach

**Step 1:** Try Python script (Option 2)

```bash
cd data/sources/walter-burley
pip install pdfplumber
python extract_latin_text.py
```

**Step 2:** If that fails, use manual extraction with Read tool

**Step 3:** Clean up extracted text:
- Remove footnotesභාෂා
- Separate chapters (Cap. I, Cap. II, etc.)
- Remove Spanish translation
- Keep only Latin text

## Expected Output

```
latin_text_raw.txt          # Full raw extracted text
latin_text_cleaned.txt      # Cleaned, Latin-only
latin_text_chapters/        # Separated by chapter (optional)
  cap_01_thales.txt
  cap_02_solon.txt
  ...
```

## Post-Processing

Once we have the raw Latin text, we can:

1. **Separate by philosopher** - Split at "Cap. I", "Cap. II", etc.
2. **Clean formatting** - Remove extra whitespace, fix line breaks
3. **Add metadata** - Philosopher names, dates, etc.
4. **Create index** - List of all philosophers with byte offsets

This can be done with a simpler script or manually.

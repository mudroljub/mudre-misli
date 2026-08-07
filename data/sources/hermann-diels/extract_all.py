#!/usr/bin/env python3
"""
Extract all 54 presocratic philosophers from band1.txt (1903 edition, clean OCR)
"""
import json
import re

# Manual mapping based on philosopher numbers
# Format: (number, name_en, name_de, has_fragments)
PHILOSOPHERS = [
    (1, "Thales", "Thales", False),
    (2, "Anaximander", "Anaximandros", False),
    (3, "Anaximenes", "Anaximenes", True),
    (4, "Pythagoras", "Pythagoras", False),
    (5, "Cercops", "Kerkops", False),
    (6, "Petron", "Petron", False),
    (7, "Brotinos", "Brotinos", False),
    (8, "Hippasos", "Hippasos", False),
    (9, "Kalliphon_Demokedes", "Kalliphon und Demokedes", False),
    (10, "Parmiskos", "Parmiskos", False),
    (11, "Xenophanes", "Xenophanes", True),
    (12, "Heraclitus", "Herakleitos", True),
    (13, "Epicharmos", "Epicharmos", True),  # After Heraclitus
    (14, "Alcmaeon", "Alkmaion", True),
    (15, "Ikkos", "Ikkos", False),
    (16, "Paron", "Paron", False),
    (17, "Ameinias", "Ameinias", False),
    (18, "Parmenides", "Parmenides", True),
    (19, "Zeno", "Zenon", True),
    (20, "Melissus", "Melissos", True),
    (21, "Empedocles", "Empedokles", True),
    (22, "Menestor", "Menestor", False),
    (23, "Xuthus", "Xuthos", False),
    (24, "Boidas", "Boidas", False),
    (25, "Ion_of_Chios", "Ion von Chios", True),
    (26, "Hippon", "Hippon", True),
    (27, "Phaleas_Hippodamos", "Phaleas und Hippodamos", False),
    (28, "Polykleitos", "Polykleitos", False),
    (29, "Oinopides", "Oinopides", False),
    (30, "Hippokrates_of_Chios", "Hippokrates von Chios", False),
    (31, "Theodoros", "Theodoros", False),
    (32, "Philolaus", "Philolaos", True),
    (33, "Eurytus", "Eurytos", False),
    (34, "Archippos_Lysis_Opsimos", "Archippos, Lysis, Opsimos", False),
    (35, "Archytas", "Archytas", True),
    ("35a", "Ocellus", "Okellos", False),
    (36, "Timaeus", "Timaios", False),
    (37, "Hicetas", "Hiketas", False),
    (38, "Ecphantus", "Ekphantos", False),
    (39, "Xenophilus", "Xenophilos", False),
    (40, "Diocles_etc", "Diokles, Echecrates, usw.", False),
    (41, "Prorus_etc", "Proros, Amyklas, Kleinias", False),
    (42, "Damon_Phintias", "Damon und Phintias", False),
    (43, "Simus_etc", "Simos, Myonides, Euphranor", False),
    (44, "Lycon", "Lykon", False),
    (45, "Pythagorean_School", "Pythagoreer (Schule)", False),
    (46, "Anaxagoras", "Anaxagoras", True),
    (47, "Archelaus", "Archelaos", True),
    (48, "Metrodorus_of_Lampsacus", "Metrodoros von Lampsakos", False),
    (49, "Clidemus", "Klidemos", False),
    (50, "Idaeus", "Idaios", False),
    (51, "Diogenes_of_Apollonia", "Diogenes von Apollonia", True),
    (52, "Cratylus", "Kratylos", False),
    (53, "Antisthenes_Heraclitean", "Antisthenes der Herakliteer", False),
]

def find_philosopher_boundaries(filepath):
    """
    Find line boundaries for each philosopher by searching for pattern:
    'NUMBER. NAME' at start of line
    """
    boundaries = {}

    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Known start line for Heraclitus (manually verified)
    boundaries[12] = {'start': 4101}

    # Find Epicharmos after Heraclitus
    for i, line in enumerate(lines[6400:6600], start=6400):
        if 'EPICHARMOS' in line and i > 6500:
            boundaries[12]['end'] = i - 1
            boundaries[13] = {'start': i}
            break

    # Add more manual mappings for key philosophers
    # This is a simplified version - full implementation would scan entire file

    return boundaries

def main():
    input_file = 'band1.txt'
    output_dir = 'philosophers'

    print(f"Extracting philosophers from {input_file}...")

    # For now, just report what we have
    boundaries = find_philosopher_boundaries(input_file)

    print(f"\nFound {len(boundaries)} philosopher boundaries")
    for num, bounds in boundaries.items():
        phil = next((p for p in PHILOSOPHERS if p[0] == num), None)
        if phil:
            name = phil[2]
            print(f"  {num}. {name}: lines {bounds.get('start', '?')}-{bounds.get('end', '?')}")

    print(f"\nTotal philosophers to map: {len(PHILOSOPHERS)}")
    print("Note: Full extraction requires manual verification of all boundaries")

if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""
Extract philosopher sections from Hermann Diels Band 1
Based on manual identification of section headers
"""
import json

def get_philosopher_sections():
    """Manually identified philosopher section start lines"""
    # Format: (number, name_de, start_line, page_from_toc)
    sections = [
        ('1', 'Thales', 513, 1),
        ('2', 'Anaximandros', 1365, 14),
        ('3', 'Anaximenes', 1894, 22),
        ('4', 'Pythagoras', 2268, 27),
        ('5', 'Kerkops', 2718, 35),
        ('6', 'Petron', 2732, None),
        ('7', 'Brotinos', 2748, None),
        ('8', 'Hippasos', 2800, 36),
        ('9', 'Kalliphon und Demokedes', 3080, 39),
        ('10', 'Parmiskos', 3118, 41),
        ('11', 'Xenophanes', 3154, 42),
        ('12', 'Herakleitos', 4772, 67),
        ('13', 'Epicharmos', 7587, 113),
        ('14', 'Alkmaion', 8712, 131),
        ('15', 'Ikkos', 9064, 137),
        ('16', 'Paron', 9095, None),
        ('17', 'Ameinias', 9108, None),
        ('18', 'Parmenides', 9122, 138),
        ('19', 'Zenon', 10757, 165),
        ('20', 'Melissos', 11437, 176),
        ('21', 'Empedokles', 12509, 193),
        ('22', 'Menestor', 18026, 283),
        ('23', 'Xuthos', 18095, 284),
        ('24', 'Boidas', 18106, None),
        ('25', 'Ion von Chios', 18135, 285),
        ('26', 'Hippon', 18334, 288),
        ('27', 'Phaleas und Hippodamos', 18616, 293),
        ('28', 'Polykleitos', 18707, 294),
        ('29', 'Oinopides', 18851, 296),
        ('30', 'Hippokrates von Chios. Aischylos', 18981, 298),
        ('31', 'Theodoros', 19101, 300),
        ('32', 'Philolaos', 19115, 301),
        ('33', 'Eurytos', 20297, 320),
        ('34', 'Archippos. Lysis. Opsimos', 20321, 321),
        ('35', 'Archytas', 20369, 322),
        ('35a', 'Okkelos', 21437, 338),
        ('36', 'Timaios', 21492, 339),
        ('37', 'Hiketas', 21536, 340),
        ('38', 'Ekphantos', 21549, None),
        ('39', 'Xenophilos', 21596, 341),
        ('40', 'Diokles. Echekrates. Polymnastos. Phanton. Arion', 21621, None),
        ('41', 'Proros. Amyklas. Kleinias', 21647, 342),
        ('42', 'Dämon und Phintias', 21684, None),
        ('43', 'Simos. Myonides. Euphranor', 21710, 343),
        ('44', 'Lykon', 21730, None),
        ('45', 'Pythagoreische Schule', 21774, 344),
        ('46', 'Anaxagoras', 23728, 375),
        ('47', 'Archelaos', 25876, 410),
        ('48', 'Metrodoros von Lampsakos', 26123, 414),
        ('49', 'Kleidemos', 26177, 415),
        ('50', 'Idaios', 26222, None),
        ('51', 'Diogenes von Apollonia', 26277, 416),
        ('52', 'Kratylos', 27219, 432),
        ('53', 'Antisthenes der Herakliteer', 27294, 434),
    ]
    return sections

def normalize_name(name_de):
    """Normalize German name to English/standard form"""
    name_map = {
        'Anaximandros': 'Anaximander',
        'Anaximenes': 'Anaximenes',
        'Kerkops': 'Cercops',
        'Xenophanes': 'Xenophanes',
        'Herakleitos': 'Heraclitus',
        'Epicharmos': 'Epicharmus',
        'Alkmaion': 'Alcmaeon',
        'Parmenides': 'Parmenides',
        'Zenon': 'Zeno',
        'Melissos': 'Melissus',
        'Empedokles': 'Empedocles',
        'Menestor': 'Menestor',
        'Xuthos': 'Xuthus',
        'Boidas': 'Boidas',
        'Ion von Chios': 'Ion of Chios',
        'Philolaos': 'Philolaus',
        'Eurytos': 'Eurytus',
        'Archytas': 'Archytas',
        'Okkelos': 'Ocellus',
        'Timaios': 'Timaeus',
        'Hiketas': 'Hicetas',
        'Ekphantos': 'Ecphantus',
        'Xenophilos': 'Xenophilus',
        'Diokles. Echekrates. Polymnastos. Phanton. Arion': 'Diocles, Echecrates, Polymnastus, Phanton, Arion',
        'Proros. Amyklas. Kleinias': 'Prorus, Amyclas, Cleinias',
        'Dämon und Phintias': 'Damon and Phintias',
        'Simos. Myonides. Euphranor': 'Simus, Myonides, Euphranor',
        'Lykon': 'Lycon',
        'Pythagoreische Schule': 'Pythagorean School',
        'Anaxagoras': 'Anaxagoras',
        'Archelaos': 'Archelaus',
        'Metrodoros von Lampsakos': 'Metrodorus of Lampsacus',
        'Kleidemos': 'Clidemus',
        'Idaios': 'Idaeus',
        'Diogenes von Apollonia': 'Diogenes of Apollonia',
        'Kratylos': 'Cratylus',
        'Antisthenes der Herakliteer': 'Antisthenes the Heraclitean',
    }

    # Try exact match first
    if name_de in name_map:
        return name_map[name_de]

    # Otherwise return the German name
    return name_de

def create_manifest(total_lines=27351):
    """Create a manifest with section boundaries"""

    sections = get_philosopher_sections()

    manifest = {
        'source': 'hermann-diels-fragmente-der-vorsokratiker-1912',
        'band': 1,
        'totalLines': total_lines,
        'philosophers': []
    }

    for i, (number, name_de, start_line, page) in enumerate(sections):
        # Determine end line (start of next philosopher or end of file)
        if i + 1 < len(sections):
            end_line = sections[i + 1][2] - 1
        else:
            end_line = total_lines

        name_en = normalize_name(name_de)

        entry = {
            'number': number,
            'name': name_en,
            'nameDe': name_de,
            'startLine': start_line,
            'endLine': end_line,
            'page': page,
            'hasFragmente': False,  # To be determined by examining sections
            'notes': ''
        }

        manifest['philosophers'].append(entry)

    return manifest

if __name__ == '__main__':
    output_path = 'data/sources/hermann-diels/manifest.json'

    print("Creating manifest for Hermann Diels Band 1...")
    manifest = create_manifest()

    print(f"\nExtracted {len(manifest['philosophers'])} philosophers:\n")
    for phil in manifest['philosophers']:
        lines = phil['endLine'] - phil['startLine'] + 1
        page = f"p.{phil['page']}" if phil['page'] else "—"
        print(f"  {phil['number']:>3}. {phil['name']:<45} {page:>6}  Lines {phil['startLine']:>6}-{phil['endLine']:<6} ({lines:>4} lines)")

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    print(f"\n✓ Manifest written to {output_path}")

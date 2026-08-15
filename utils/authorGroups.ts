// Author organization for Sidebar based on philosophical schools and periods

export interface AuthorGroup {
  titleKey: string; // Translation key
  title: string; // English fallback
  period: string;
  subgroups?: {
    titleKey: string; // Translation key
    title: string; // English fallback
    authors: string[];
  }[];
  authors?: string[];
}

export const authorGroups: AuthorGroup[] = [
  {
    titleKey: 'ancientSages',
    title: 'Ancient Wisdom',
    period: '7-6. vek p.n.e.',
    authors: [
      'Pittacus',
      'Solon',
      'Bias of Priene',
      'Cleobulus',
      'Cleobulina',
      'Chilon of Sparta',
      'Anacharsis',
      'Epimenides',
      'Ferekid'
    ]
  },
  {
    titleKey: 'presocratics',
    title: 'Presocratics',
    period: '6-5. vek p.n.e.',
    subgroups: [
      {
        titleKey: 'ionianSchool',
        title: 'Ionian School',
        authors: ['Thales', 'Anaximander', 'Anaximenes']
      },
      {
        titleKey: 'pythagoreans',
        title: 'Pythagoreans',
        authors: ['Pythagoras']
      },
      {
        titleKey: 'eleatics',
        title: 'Eleatics',
        authors: ['Parmenides', 'Zeno of Elea']
      },
      {
        titleKey: 'atomists',
        title: 'Atomists',
        authors: ['Leucippus', 'Democritus']
      },
      {
        titleKey: 'others',
        title: 'Others',
        authors: ['Heraclitus', 'Empedocles', 'Anaxagoras', 'Xenophanes']
      }
    ]
  },
  {
    titleKey: 'athenianPhilosophy',
    title: 'Athenian Philosophy',
    period: '5-3. vek p.n.e.',
    subgroups: [
      {
        titleKey: 'sophists',
        title: 'Sophists',
        authors: ['Gorgias', 'Protagoras']
      },
      {
        titleKey: 'socratics',
        title: 'Socratics',
        authors: ['Socrates', 'Xenophon', 'Aristippus', 'Antisthenes']
      },
      {
        titleKey: 'platonicAcademy',
        title: 'Platonic Academy',
        authors: ['Plato', 'Xenocrates', 'Menedemus']
      },
      {
        titleKey: 'aristotelianSchool',
        title: 'Aristotelian School',
        authors: ['Aristotle', 'Theophrastus', 'Eudoxus']
      }
    ]
  },
  {
    titleKey: 'hellenisticSchools',
    title: 'Hellenistic Schools',
    period: '4-3. vek p.n.e.',
    subgroups: [
      {
        titleKey: 'cynics',
        title: 'Cynics',
        authors: ['Diogenes', 'Crates of Thebes', 'Hiparhija', 'Metrocles', 'Monimus']
      },
      {
        titleKey: 'stoics',
        title: 'Stoics',
        authors: ['Zeno of Citium', 'Cleanthes', 'Chrysippus', 'Aristo of Chios', 'Sphaerus']
      },
      {
        titleKey: 'skeptics',
        title: 'Skeptics',
        authors: ['Anaxarchus', 'Pyrrho', 'Timon of Phlius']
      },
      {
        titleKey: 'epicureans',
        title: 'Epicureans',
        authors: ['Epicurus']
      }
    ]
  }
];

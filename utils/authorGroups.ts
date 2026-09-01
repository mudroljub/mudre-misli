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
      'Pherecydes of Syros'
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
        authors: ['Pythagoras', 'Philolaus']
      },
      {
        titleKey: 'eleatics',
        title: 'Eleatics',
        authors: ['Parmenides', 'Zeno of Elea', 'Melissus']
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
        authors: ['Socrates', 'Xenophon', 'Aristippus', 'Antisthenes', 'Euclid of Megara']
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
      },
      {
        titleKey: 'rhetoricians',
        title: 'Rhetoricians',
        authors: ['Demosthenes']
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
        authors: ['Diogenes', 'Crates of Thebes', 'Hipparchia of Maroneia', 'Metrocles', 'Monimus']
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
      },
      {
        titleKey: 'others',
        title: 'Others',
        authors: ['Archimedes']
      }
    ]
  },
  {
    titleKey: 'romanPhilosophy',
    title: 'Roman Philosophy',
    period: '1-2. vek',
    subgroups: [
      {
        titleKey: 'romanStoics',
        title: 'Roman Stoics',
        authors: ['Seneca', 'Musonius Rufus', 'Epictetus']
      },
      {
        titleKey: 'romanEclectics',
        title: 'Roman Eclectics',
        authors: ['Cicero']
      },
      {
        titleKey: 'romanEpicureans',
        title: 'Roman Epicureans',
        authors: ['Lucretius']
      }
    ]
  },
  {
    titleKey: 'lateAntiquity',
    title: 'Late Antiquity',
    period: '2-3. vek',
    authors: ['Plotinus', 'Iamblichus'],
    subgroups: [
      {
        titleKey: 'romanStoics',
        title: 'Roman Stoics',
        authors: ['MarcusAurelius']
      }
    ]
  }
];

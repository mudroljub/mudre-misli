export interface DictionaryEntry {
  greek: string;
  stsl: string;
  sr: string;
}

const plainText = (value: string): string => value.replace(/\*+/gu, '').trim();

export const parseDictionary = (content: string): DictionaryEntry[] => content
  .replace(/<!--[\s\S]*?-->/gu, '')
  .split('\n')
  .filter((line) => line.trim().startsWith('|'))
  .slice(2)
  .map((line) => line.split('|').slice(1, -1).map((column) => column.trim()))
  .filter((columns) => columns.length >= 3)
  .map(([greek, stsl, sr]) => ({ greek, stsl, sr }));

export const findDictionaryEntry = (content: string, greekTerm: string): DictionaryEntry | undefined => {
  const normalizedTerm = plainText(greekTerm);
  return parseDictionary(content).find((entry) => plainText(entry.greek) === normalizedTerm);
};

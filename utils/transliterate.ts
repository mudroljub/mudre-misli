const replacLatDoublesSr = (text: string) => text
  .replace(/lj/g, 'љ')
  .replace(/Lj/g, 'Љ')
  .replace(/LJ/g, 'Љ')
  .replace(/nj/g, 'њ')
  .replace(/Nj/g, 'Њ')
  .replace(/NJ/g, 'Њ')
  .replace(/dž/g, 'џ')
  .replace(/Dž/g, 'Џ')
  .replace(/DŽ/g, 'Џ');

const replacLatDoublesStsl = (text: string) => text
  .replace(/lj/g, 'ль')
  .replace(/Lj/g, 'Ль')
  .replace(/LJ/g, 'Ль')
  .replace(/nj/g, 'нь')
  .replace(/Nj/g, 'Нь')
  .replace(/NJ/g, 'Нь');

const replacCyrDoubles = (text: string) => text
  .replace(/оу/g, 'u')
  .replace(/Оу/g, 'U')
  .replace(/ОУ/g, 'U');

const latCyrDict: Record<string, string> = {
  'A': 'А', 'a': 'а',
  'B': 'Б', 'b': 'б',
  'C': 'Ц', 'c': 'ц',
  'Č': 'Ч', 'č': 'ч',
  'Ć': 'Ћ', 'ć': 'ћ',
  'D': 'Д', 'd': 'д',
  'Đ': 'Ђ', 'đ': 'ђ',
  'E': 'Е', 'e': 'е',
  'Ě': 'Ѣ', 'ě': 'ѣ',
  'F': 'Ф', 'f': 'ф',
  'G': 'Г', 'g': 'г',
  'H': 'Х', 'h': 'х',
  'I': 'И', 'i': 'и',
  'Y': 'Ы', 'y': 'ы',
  'J': 'Ј', 'j': 'ј',
  'K': 'К', 'k': 'к',
  'L': 'Л', 'l': 'л',
  'M': 'М', 'm': 'м',
  'N': 'Н', 'n': 'н',
  'O': 'О', 'o': 'о',
  'P': 'П', 'p': 'п',
  'R': 'Р', 'r': 'р',
  'S': 'С', 's': 'с',
  'Ś': 'Сь', 'ś': 'сь',
  'Š': 'Ш', 'š': 'ш',
  'T': 'Т', 't': 'т',
  'U': 'У', 'u': 'у',
  'V': 'В', 'v': 'в',
  'Z': 'З', 'z': 'з',
  'Ź': 'Зь', 'ź': 'зь',
  'Ž': 'Ж', 'ž': 'ж',
};

const cyrLatDict: Record<string, string> = {
  'А': 'A', 'а': 'a',
  'Б': 'B', 'б': 'b',
  'В': 'V', 'в': 'v',
  'Г': 'G', 'г': 'g',
  'Д': 'D', 'д': 'd',
  'Е': 'E', 'е': 'e', 'Є': 'E', 'є': 'e',
  'Ж': 'Ž', 'ж': 'ž',
  'Ꙃ': 'Dz', 'ꙃ': 'dz', 'Ѕ': 'Dz', 'ѕ': 'dz',
  'Ꙁ': 'Z', 'ꙁ': 'z', 'З': 'Z', 'з': 'z',
  'И': 'I', 'и': 'i', 'І': 'I', 'і': 'i',
  'Ї': 'J', 'ї': 'j',
  'К': 'K', 'к': 'k',
  'Л': 'L', 'л': 'l',
  'М': 'M', 'м': 'm',
  'Н': 'N', 'н': 'n',
  'О': 'O', 'о': 'o',
  'П': 'P', 'п': 'p',
  'Р': 'R', 'р': 'r',
  'С': 'S', 'с': 's',
  'Т': 'T', 'т': 't',
  'Ѹ': 'U', 'ѹ': 'u', 'Ꙋ': 'U', 'ꙋ': 'u', 'У': 'U', 'у': 'u',
  'Ф': 'F', 'ф': 'f',
  'Х': 'H', 'х': 'h',
  'Ѡ': 'O', 'ѡ': 'o',
  'Ѿ': 'Ot', 'ѿ': 'ot',
  'Щ': 'Št', 'щ': 'št',
  'Ц': 'C', 'ц': 'c',
  'Ч': 'Č', 'ч': 'č',
  'Ш': 'Š', 'ш': 'š',
  'Ꙑ': 'Y', 'ꙑ': 'y', 'Ы': 'Y', 'ы': 'y',
  'Ѣ': 'Ě', 'ѣ': 'ě',
  'Ю': 'Ju', 'ю': 'ju',
  'Ꙗ': 'Ja', 'ꙗ': 'ja',
  'Ѥ': 'Je', 'ѥ': 'je',
  'Ѧ': 'Ę', 'ѧ': 'ę',
  'Ѩ': 'Ję', 'ѩ': 'ję',
  'Ѫ': 'Ǫ', 'ѫ': 'ǫ',
  'Ѭ': 'Jǫ', 'ѭ': 'jǫ',
  'Ѱ': 'Ps', 'ѱ': 'ps',
  'Ѳ': 'Th', 'ѳ': 'th',
  'Ꙉ': 'Ǵ', 'ꙉ': 'ǵ',
  'Ћ': 'Ć', 'ћ': 'ć',
  'Ђ': 'Đ', 'ђ': 'đ',
  'Ј': 'J', 'ј': 'j',
  'Љ': 'Lj', 'љ': 'lj',
  'Њ': 'Nj', 'њ': 'nj',
  'Џ': 'Dž', 'џ': 'dž',
  'Ѯ': 'X', 'ѯ': 'x',
};

export const toLatinic = (text: string): string =>
  [...text].map(x => cyrLatDict[x] || x).join('');

const romanNumeralPattern = /[IVXLCDM]+/g;
const validRomanNumeralPattern = /^(?=[IVXLCDM]+$)M{0,4}(?:CM|CD|D?C{0,3})(?:XC|XL|L?X{0,3})(?:IX|IV|V?I{0,3})$/;

const shouldPreserveRomanNumeral = (text: string, numeral: string, offset: number): boolean => {
  if (!validRomanNumeralPattern.test(numeral)) return false;

  const before = text.slice(0, offset);
  const after = text.slice(offset + numeral.length);

  return numeral.length > 1
    || /^\.\d/.test(after)
    || /^[–—-][IVXLCDM]+/.test(after)
    || /[IVXLCDM]+[–—-]$/.test(before)
    || /(?:cap\.|knjiga|book)\s*$/i.test(before)
    || /(?:^|\n)\s*$/.test(before) && /^[.)](?:\s|$)/.test(after);
};

const toCyrillic = (text: string): string => {
  const preserved: string[] = [];
  const protectedText = text.replace(romanNumeralPattern, (numeral, offset: number) => {
    if (!shouldPreserveRomanNumeral(text, numeral, offset)) return numeral;
    const marker = String.fromCodePoint(0xE000 + preserved.length);
    preserved.push(numeral);
    return marker;
  });

  return [...protectedText]
    .map(x => {
      const markerIndex = x.codePointAt(0)! - 0xE000;
      return markerIndex >= 0 && markerIndex < preserved.length
        ? preserved[markerIndex]
        : latCyrDict[x] || x;
    })
    .join('');
};

export type Script = 'lat' | 'cyr';
export type TransliterateLanguage = 'sr' | 'stsl';

export function transliterate(text: string, script: Script, lang: TransliterateLanguage): string {
  if (script === 'lat') {
    return toLatinic(replacCyrDoubles(text));
  } else {
    return toCyrillic(lang === 'sr' ? replacLatDoublesSr(text) : replacLatDoublesStsl(text));
  }
}

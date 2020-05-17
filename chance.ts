import * as ch from "chance";

// each word have average 5~6 chars
export function generateRandomWordsAndSentence(
  wordCount: number,
  sentenceLength: number
): [string[], string] {
  const chance = ch.Chance();
  const words = chance.unique(chance.word, wordCount);
  const sentence = chance.sentence({ words: sentenceLength });
  return [words, sentence];
}

export function generateShortStrings(
  keywordCount: number,
  length: number,
  pool: string = "abcde"
): [string[], string] {
  const chance = ch.Chance();
  const words: string[] = [];
  for (let i = 0; i < keywordCount; i++) {
    const word = chance.string({ pool });
    words.push(word);
  }
  const sentence = chance.string({ length, pool });
  return [words, sentence];
}

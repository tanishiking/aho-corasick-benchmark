import { Trie as ACTrie, Emit } from "@tanishiking/aho-corasick";
import { Trie } from "./trie/trie";

import * as yargs from "yargs";
import * as bench from "benchmark";

import { generateShortStrings, generateRandomWordsAndSentence } from "./chance";

function main(
  kind: "sentence" | "string",
  keywordCount: number,
  length: number,
  pool: string
) {
  let keywords: string[] = [];
  let target: string = "";
  if (kind === "sentence") {
    [keywords, target] = generateRandomWordsAndSentence(keywordCount, length);
  } else {
    [keywords, target] = generateShortStrings(keywordCount, length, pool);
  }

  const trie = new Trie(keywords);
  const acTrie = new ACTrie(keywords);
  acTrie.parseText("a"); // build failure state

  let indexMatched: string[] = [];
  let trieMatched: string[] = [];
  let acMatched: Emit[] = [];
  const suite = new bench.Suite();
  suite
    .add("indexOf loop", () => {
      const matched: string[] = [];
      keywords.forEach((word) => {
        if (target.indexOf(word) >= 0) matched.push(word);
      });
      indexMatched = matched;
    })
    .add("simple trie", () => {
      const matched = trie.parseText(target);
      trieMatched = matched;
    })
    .add("aho corasick", () => {
      const matched = acTrie.parseText(target);
      acMatched = matched;
    })
    .on("cycle", (event: any) => {
      console.log(String(event.target));
    })
    .on("complete", () => {
      console.log("Finished");
      console.log(`matched:index:        [${indexMatched.length}]`);
      console.log(`matched trie:         [${trieMatched.length}]`);
      console.log(`matched aho-corasick: [${acMatched.length}]`);
      // console.log(target);
    })
    .run({ async: true });
}

const argv = yargs.options({
  kind: {
    alias: "k",
    choices: ["sentence", "string"] as const,
    demandOption: true,
    description: "what kind of random string to use for benchmarking.",
  },
  keywords: {
    default: 1000,
    demandOption: true,
    description: "how many numbers of keywords to search.",
  },
  length: {
    default: 10000,
    demandOption: true,
    description: "text length for search target.",
  },
  pool: {
    default: "abcdef",
    demandOption: false,
    description:
      "random string generated from the given string pool, works only if kind is `string`.",
  },
}).argv;

main(argv.kind, argv.keywords, argv.length, argv.pool);

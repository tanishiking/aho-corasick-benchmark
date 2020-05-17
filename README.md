Benchmark for https://github.com/tanishiking/aho-corasick-js

For searching patterns from small set of characters from short string, aho-corasick-js runs slightly faster than naive trie implementation.
However, in other cases, aho-corasick-js is slower than trie, unfortunately.

### Run

```
$ yarn run build
$ node index.js -h
Options:
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
  --kind, -k  what kind of random string to use for benchmarking.
                                      [required] [choices: "sentence", "string"]
  --keywords  how many numbers of keywords to search. [required] [default: 1000]
  --length    text length for search target.         [required] [default: 10000]
  --pool      random string generated from the given string pool, works only if
              kind is `string`.                              [default: "abcdef"]

$ node index.js -k string --keywords 10000 --length 1000 --pool abcdefg 
```

### Results

```sh
❯ node index.js -k string --keywords 10000 --length 1000 --pool abcdefg 
indexOf loop x 54.19 ops/sec ±15.41% (45 runs sampled)
simple trie x 2,825 ops/sec ±9.39% (75 runs sampled)
aho corasick x 4,001 ops/sec ±3.11% (74 runs sampled)
Finished
matched:index:        [45]
matched trie:         [45]
matched aho-corasick: [45]

❯ node index.js -k string --keywords 10000 --length 10000 --pool abcdef
indexOf loop x 6.46 ops/sec ±28.38% (20 runs sampled)
simple trie x 305 ops/sec ±2.82% (72 runs sampled)
aho corasick x 223 ops/sec ±16.66% (62 runs sampled)
Finished
matched:index:        [624]
matched trie:         [949]
matched aho-corasick: [985]

❯ node index.js -k sentence --keywords 10000 --length 10000             
indexOf loop x 2.99 ops/sec ±1.81% (12 runs sampled)
simple trie x 111 ops/sec ±2.07% (67 runs sampled)
aho corasick x 33.11 ops/sec ±2.60% (54 runs sampled)
Finished
matched:index:        [1990]
matched trie:         [48434]
matched aho-corasick: [48434]

❯ node index.js -k sentence --keywords 500000 --length 10000             
indexOf loop x 0.04 ops/sec ±34.98% (5 runs sampled)
simple trie x 25.42 ops/sec ±14.62% (47 runs sampled)
aho corasick x 11.85 ops/sec ±17.90% (27 runs sampled)
Finished
matched:index:        [13426]
matched trie:         [68459]
matched aho-corasick: [68459]
```

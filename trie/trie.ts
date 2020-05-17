import { State } from "./state";

export class Trie {
  private readonly rootState: State = new State();

  constructor(keywords: string[]) {
    keywords.forEach((keyword) => {
      this.addKeyword(keyword);
    });
  }

  addKeyword(keyword: string): void {
    if (keyword.length === 0) return;
    let currentState = this.rootState;
    const textLength = keyword.length;

    for (let pos = 0; pos < textLength; pos++) {
      const char = keyword.charAt(pos);
      currentState = currentState.addState(char);
    }
    currentState.addOutput(keyword);
  }

  parseText(text: string): string[] {
    const textLength = text.length;
    const collected: string[] = [];

    for (let start = 0; start <= textLength; start++) {
      let currentState: State | null = this.rootState;
      for (let pos = start; pos <= textLength; pos++) {
        if (currentState === null) break;
        else {
          const output = currentState.getOutput();
          if (output !== null) collected.push(output);
          const char = text.charAt(pos);
          currentState = currentState.nextState(char);
        }
      }
    }
    return collected;
  }
}

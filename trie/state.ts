export class State {
  private success: Map<string, State> = new Map();
  private output: string | null = null;

  getOutput(): string | null {
    return this.output;
  }

  addOutput(keyword: string): void {
    this.output = keyword;
  }

  nextState(char: string): State | null {
    const nextState: State | undefined = this.success.get(char);
    if (nextState) {
      return nextState;
    } else {
      return null;
    }
  }

  addState(char: string): State {
    const nextState: State | null = this.nextState(char);
    if (nextState === null) {
      const newState = new State();
      this.success.set(char, newState);
      return newState;
    } else {
      return nextState;
    }
  }
}

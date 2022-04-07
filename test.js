var isMatch = function(s, p) {
    let pIndex = 0;
    let sIndex = 0;
    let prevChar;
    let prevPat;
    let sameElCount = 0;
    let result = true;
    
    // iterate both pattern and string together 
    // stop iterating pattern if there is *
    
    while (sIndex < s.length || pIndex < p.length) {
        if (p[pIndex] !== '*' && p[pIndex] !== '.') {
            // for case whereby char is repeated
            if (p[pIndex] === prevChar && sameElCount) {
                sameElCount--;
                pIndex++;
                continue;
            }

            // simple checking against english letters
            if(p[pIndex] !== s[sIndex]) {
                result = false;
                break;
            }
            
            // reset count
            sameElCount = 0;
        }
        else if (p[pIndex] === '*') {
            // guaranteed to have preceding char to match
            
            if (prevPat === '.') {
                // .* will match any character
                sIndex++;
                continue;
            }
            
            
            if (s[sIndex] === prevChar) {
                pIndex--;
                if (sameElCount) sameElCount++
                else sameElCount += 2;
            } else if (sameElCount) sIndex--;
        }
        
        prevChar = s[sIndex];
        prevPat = p[pIndex];
        sIndex++;
        pIndex++;
    }
    return result;
};

var isMatch = function (s, p) {
  const q = new StateMachine(p);

  for (let i = 0; i < s.length && q.getState() !== q.state.qEnd; i++) {
    q.transition(s[i], "STRING");
  }
  q.checkRemainingPattern();
  return q.result;
};

class StateMachine {
  constructor(p) {
    this.p = p;
    this.state = { q1: 1, q2: 2, qEnd: 3 };
    this.currentState = this.state.q1;
    this.pIndex = 0;
    this.prevChar;
    this.prevPattern = p[0];
    this.curPattern;
    this.dupCount = 0;
    this.result = true;
    this.skip = false;

    // temp index is to hold index of '.*'
    // serves as checkpoint
    this.tempIndex;
  }

  /* total of 3 states:
        1. Accepted; Increment pattern index
        2. Accepted; stay with same pattern index for '*'
        3. Rejected; return false
    */

  toStateQ1(char, type) {
    if (type === "STRING") {
      this.prevPattern = this.p[this.pIndex];
      this.dupCount = 1;
      this.prevChar = char;
      this.pIndex++;
    } else {
      // type is PATTERN
      this.dupCount--;
    }
    this.currentState = this.state.q1;
  }

  toStateQ2(char) {
    // for checking remaining pattern, all cases of '.*' or '[a-z]*' will be considered as 0 element case
    if (this.prevChar === char) this.dupCount++;
    else this.dupCount = 1;
    this.prevChar = char;
    this.currentState = this.state.q2;
  }

  toStateEnd(isFalse) {
    if (!isFalse) this.result = false;
    this.pIndex = this.p.length;
    this.currentState = this.state.qEnd;
  }

  checkDuplicate() {
    while (this.curPattern === this.prevChar && this.dupCount) {
      this.pIndex++;
      this.curPattern = this.p[this.pIndex];
      this.dupCount--;
    }
  }

  checkRemainingPattern() {
    // to return true, remaining patterns must be a duplicate of prevChar
    // if prev pattern is *, pIndex will remain as is
    // else, pIndex will be incremented by one

    this.tempIndex = null;
    if (!this.p[this.pIndex]) return;
    else {
      let start = this.pIndex + 1;
      if (this.p[this.pIndex] !== "*") {
        start = this.pIndex;
        this.dupCount = 0;
      }
      for (
        let i = start;
        i < this.p.length && this.currentState !== this.state.qEnd;
        i++
      ) {
        this.pIndex = i;
        this.transition(this.prevChar, "PATTERN");
      }

      if (this.dupCount < 0) this.toStateEnd();
    }
  }

  transition(char, type) {
    if (this.skip) this.toStateQ2(char);

    this.curPattern = this.p[this.pIndex];

    if (this.curPattern === ".") this.toStateQ1(char, type);
    else if (this.curPattern !== "*") {
      // current pattern is an english letter

      while (
        this.curPattern !== "." &&
        this.curPattern !== char &&
        this.pIndex < this.p.length
      ) {
        // if next pattern is '*', can omit
        // i.e. 'aab', 'c*a*b'; c* can omit

        if (this.p[this.pIndex + 1] === "*") {
          this.pIndex += 2;
          this.curPattern = this.p[this.pIndex];
        } else break;
      }

      if (type === "PATTERN" && this.pIndex >= this.p.length)
        this.toStateEnd(true);
      else if (this.curPattern !== "." && this.curPattern !== char) {
        if (this.tempIndex) {
          this.pIndex = this.tempIndex;
          this.skip = true;
          this.toStateQ2(char);
        } else this.toStateEnd();
      } else this.toStateQ1(char, type);
    } else {
      // current pattern is '*'
      // guaranteed to have preceding char to match

      // if pattern is '.*', will match anything
      if (this.prevChar === char) this.toStateQ2(char);
      else if (this.prevPattern === ".") {
        this.tempIndex = this.pIndex;

        // check if can match with previous 2 characters
        if (
          this.p[this.pIndex + 1] === this.prevChar &&
          this.p[this.pIndex + 2] === char
        ) {
          this.pIndex += 2;
          this.toStateQ1(char, type);
        } else {
          this.skip = true;
          this.toStateQ2(char);
        }
      } else {
        this.pIndex++;
        this.curPattern = this.p[this.pIndex];
        this.checkDuplicate();

        if (!this.curPattern) this.toStateEnd();
        else if (this.curPattern === "*") {
          // if curPattern is '*', prevPattern was accepted and hence, this is also accepted
          this.toStateQ2(char);
        } else if (this.curPattern !== "." && this.curPattern !== char)
          this.toStateEnd();
        // if curPattern is '.' or curPattern === char, state is accepted
        else this.toStateQ1(char, type);
      }
    }
  }

  getState() {
    return this.currentState;
  }
}


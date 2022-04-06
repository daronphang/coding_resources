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


class DFA {
    constructor(p) {
        this.p = p;
        this.state = {q1: 1, q2: 2, q3: 3, qEnd: 4};
        this.currentState = this.state.q1;
        this.pIndex = 0;
        this.prevChar;
        this.prevPattern = p[0];
        this.curPattern;
        this.dupCount = 0;
        this.result = true;
    }
    
    // updating of indexes
    toStateQ1(char) {
        this.prevPattern = this.p[this.pIndex];
        this.prevChar = char;
        this.pIndex++;
        this.currentState = this.state.q1;
        this.dupCount = 1;
    }
    
    toStateEnd() {
        this.currentState = this.state.qEnd;
    }
    
    transition(char) {
        this.curPattern = this.p[this.pIndex];
        
        if (this.curPattern !== '.' && this.curPattern !== '*') {
            // pattern char is an english letter
            if (char !== this.curPattern) {
                this.result = false;
                this.toStateEnd();
            } else {
                this.toStateQ1(char);
            }
            
        } else if (this.curPattern === '*') {
            // guaranteed to have preceding char to match
            
            if (this.prevChar === char) this.dupCount++;
            else {
                if (this.prevPattern !== '.') {
                    // prev pattern is an english letter
                    this.pIndex++;
                    
                    if (this.pIndex === this.p.length || this.p[this.pIndex] !== char) this.toStateEnd(); 
                }
                this.toStateQ1(char);
            }
        }
        
        // pattern char is '.' and hence, any char is valid
    }
    
    getResult() {
        return this.result;
    }
    
    getState() {
        return this.currentState;
    }
}

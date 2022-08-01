var isMatch = function (s, p) {
  dp = [];
  const m = s.length;
  const n = p.length;

  // text[i][j] where i is index of string, j is index of pattern
  // 0th column will always be false i.e. no pattern but with string

  for (let i = 0; i < m + 1; i++) {
    dp[i] = Array(n + 1).fill(false);
  }

  // testing for empty string and pattern
  // edge case
  dp[0][0] = true;

  // bottom up approach

  // populate 0th row i.e. no string only
  // if have pattern 'a*b*', will return true
  for (let j = 2; j <= n; j += 2) {
    if (p[j - 1] === "*") {
      dp[0][j] = dp[0][j - 2];
    } 
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // take the previous boolean value
      // string abc, pattern abc
      // to check if abc matches abc, since c === c
      // result is c === c && ab === ab (i-1, j-1)

      if (p[j - 1] === "." || s[i - 1] === p[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === "*") {
        // 'a*' or '.*' can take 0 or more counts (2 cases)
        // string is 'ab', pattern is 'ab*'

        // first case for 0 counts if dp[i][j-2] is true
        dp[i][j] = dp[i][j - 2];

        if (!dp[i][j]) {
          // second case if cannot count as 0
          // check if the char before * matches current string index
          // if true, can consider it as part of a*
          // i.e. ab, ab* is the same as a, ab* which is previously solved

          if (p[j - 2] === "." || p[j - 2] === s[i - 1]) {
            dp[i][j] = dp[i - 1][j];
          }
        }
      }
      // last case is the string[i] and pattern [j] dont match
      // i.e. dp[i][j] = false, but this is already accounted for
    }
  }

  return dp[m][n];
};

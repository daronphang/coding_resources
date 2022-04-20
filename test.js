var minCut = function (s) {
  // return min. number of cuts
  // row is s.length as there can be palindrome in latter portion
  // i.e. tehannahablol
  let minCuts = s.length - 1;
  // const row = Math.ceil(s.length/2);

  const dp = [];
  let closest;
  let skip = 0;

  for (let i = 0; i <= s.length; i++) {
    dp[i] = Array(s.length + 2).fill(0);
  }

  for (let i = 1; i <= s.length; i++) {
    if (skip) {
      skip--;
      continue;
    }
    for (let j = s.length + 1; j > i; j--) {
      if (s[i - 1] === s[j - 1]) {
        closest = j;
        dp[i][i] = 1;
      }
      if (j === i + 1) {
        if (dp[i - 1][j - 2] && dp[i - 1][j]) {
          // for odd number palindrome
          minCuts -= dp[i - 1][j] * 2;

          // to skip to last charc of palindrome
          skip = dp[i - 1][j] - 1;
        } else if (closest) {
          // even number palindrome
          dp[i][closest] = dp[i - 1][closest + 1] + 1;
          closest = 0;

          if (dp[i][j - 1] && dp[i][j]) {
            minCuts -= dp[i][j] * 2 - 1;
            skip = dp[i][j] - 1;
          }
        }
      }
    }
  }

  return minCuts;
};

console.log(minCut("thannahehannaht"));

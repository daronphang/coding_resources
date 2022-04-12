var minDistance = function (word1, word2) {
  const m = word1.length;
  const n = word2.length;

  // matrix stores cost of operation
  const dp = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = Array(n + 1);
  }

  // if word1 is empty string
  for (let i = 0; i <= n; i++) {
    dp[0][i] = i;
  }

  // if word2 is empty string
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        // no cost required
        // equivalent to dp[0][0] or diagonal
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // can either perform replace/delete/insert
        // replace is i+1, j+1
        // delete is i+1,j
        // insert is i,j+1
        // get the minimum cost of each 3
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
      }
    }
  }

  return dp[m][n];
};

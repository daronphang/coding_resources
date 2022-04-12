var numDistinct = function (s, t) {
  // dp, bottom-up approach
  // two cases for if s[i] === t[j]
  // if diagonal exists, take diagonal
  // else check if deleting charc matches also i.e. s[i][j-1]

  let m = t.length;
  let n = s.length;
  dp = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = Array(n + 1);
  }

  // where s is empty
  for (let i = 0; i <= m; i++) {
    dp[i][0] = 0;
  }

  // where t is empty
  for (let i = 0; i <= n; i++) {
    dp[0][i] = 1;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (t[i - 1] === s[j - 1]) {
        // check if any word can be matched without current char in string
        if (!dp[i][j - 1]) {
          // no word can be formed with j-1 characters
            // i.e. first occurrence of matching word
          dp[i][j] = dp[i - 1][j - 1];
        } else {
            // add them to account for duplicate occurrence
          dp[i][j] = dp[i-1][j-1] + dp[i][j-1];
        }
      } else {
        // delete character and see if it matches
        dp[i][j] = dp[i][j - 1];
      }
    }
  }

  return dp[m][n];
};

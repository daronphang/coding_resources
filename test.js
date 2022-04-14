var maxEnvelopes = function (envelopes) {
  // envelope is width * height
  const dp = Array(envelopes.length);

  // sort by either width/height first
  envelopes.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  // for (let i = 0; i < envelopes.length; i++) {
  //   dp[i] = Array(envelopes.length);
  // }

  return getMaxCount(envelopes, dp, envelopes.length - 1) + 1;
};

const getMaxCount = (envelopes, dp, end) => {
  if (dp[end]) return dp[end];
  if (end === 0) return 0;

  let result = 0;
  let maxSize = 0;
  for (let i = end; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      if (envelopes[i][0] > envelopes[j][0] && envelopes[i][1] > envelopes[j][1]) {
        if (dp[i]) maxSize = dp[i];
        else maxSize = getMaxCount(envelopes, dp, j) + 1;

        result = Math.max(maxSize, result);

        if (dp[i]) {
          if (dp[i] < maxSize) dp[i] = maxSize;
        } else dp[i] = maxSize;
      }
    }
  }

  return result;
};

var lengthOfLIS = function (nums) {
  const dp = Array(nums.length).fill(1);

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j <= i; j++) {
      if (nums[j] < nums[i]) {
        if (dp[j] && dp[j] >= dp[i]) dp[i] = dp[j] + 1;
      }
    }
  }

  let longest = 1;
  dp.forEach((num) => {
    if (num > longest) longest = num;
  });
  return longest;
};

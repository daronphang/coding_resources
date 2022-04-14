var lengthOfLIS = function (nums) {
  // given an array [1,0,2,3,5,4]
  // solve [1] first, followed by [1,0], then [1,0,2]
  // each time you increment, can use results from previous iteration
  
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

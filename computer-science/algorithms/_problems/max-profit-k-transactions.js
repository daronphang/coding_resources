var maxProfit = function (k, prices) {
  if (prices.length < 2 || k === 0) return 0;

  // there may exist a better pair in the previous subgroup of prices
  const dp = [];
  let maxDiff;

  for (let i = 0; i <= k; i++) {
    if (i === 0) dp[i] = Array(prices.length + 1).fill(0);
    else dp[i] = Array(prices.length + 1);
  }

  for (let i = 0; i <= k; i++) {
    dp[i][0] = 0;
  }

  /*
    to get profit, need find highest SP and lowest BP
    maintain lowest BP as minValue
    if current prices[j] < min, update min
    else, if it is higher, there is no need to update min
    then check if prices[j] - min > current maximum profit

    if sell on some previous date, and buy on current date:
    previous profit is dp[i-1][m] where m is some previous date
    profit = previousProfit + prices[j] - prices[m]

    given [2,4,8,6,7], at j = 3:
    minVal = 2
    m can be 2,4,8
    Compare and find max:
    6 (-2 + previousProfit)
    6 (-4 + previousProfit)
    6 (-8 + previousProfit)

    to optimize further, simply maintain the current maxDiff
    between previousProfit and prices[j-1]
  */

  for (let i = 1; i <= k; i++) {
    maxDiff = -prices[0] + 0; // 0 is previousProfit

    for (let j = 1; j <= prices.length; j++) {
      maxDiff = Math.max(dp[i - 1][j - 1] - prices[j - 1], maxDiff);

      // dp[i][j-1] means not to make any transaction
      dp[i][j] = Math.max(dp[i][j - 1], prices[j] + maxDiff);
    }
  }
  return dp[k][prices.length - 1];
};

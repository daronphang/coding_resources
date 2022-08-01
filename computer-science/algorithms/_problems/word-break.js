var wordBreak = function (s, wordDict) {
  // when given a list of words to match against a string i.e. regEx, use dp
  
  const dp = [];
  const results = [];
  const cutPosSet = new Set();
  const hashmap = {};

  let start = 0;
  let s2 = "";

  for (let i = 0; i < wordDict.length; i++) {
    s2 += wordDict[i] + " ";
    hashmap[wordDict[i]] = true;
  }

  for (let i = 0; i <= s2.length; i++) {
    if (i === 0) dp[i] = Array(s.length + 1).fill(true);
    else {
      dp[i] = Array(s.length + 1);
      dp[i][0] = false;
    }
  }

  for (let i = 1; i < s2.length; i++) {
    for (let j = 1; j <= s.length; j++) {
      if (s2[i - 1] === " ") {
        dp[i] = Array(s.length + 1).fill(true);
        continue;
      }

      if (s2[i - 1] === s[j - 1] && dp[i - 1][j - 1]) {
        dp[i][j] = true;

        if (s2[i] === " ") {
          cutPosSet.add(j);
          start = i + 1;
        }
      } else {
        dp[i][j] = false;
      }
    }
  }

  // no matching words found in string
  if (cutPosSet.size === 0 || !cutPosSet.has(s.length)) return [];

  let cutPosArr = Array.from(cutPosSet);
  cutPosArr.sort((a, b) => a - b);

  // backtracking to test all possible sentences
  function backtrack(s, index, start, sentence) {
    let temp;

    for (let i = index; i < cutPosArr.length; i++) {
      temp = sentence;
      let word = s.substring(start, cutPosArr[i]);
      if (hashmap[word]) {
        temp += word + " ";

        if (i === cutPosArr.length - 1) {
          results.push(temp.substring(0, temp.length - 1));
        } else backtrack(s, i + 1, cutPosArr[i], temp);
      }
    }
  }

  backtrack(s, 0, 0, "");

  return results;
};

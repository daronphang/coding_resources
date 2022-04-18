var wordBreak = function (s, wordDict) {
  const dp = [];
  const cutPos = [];
  const results = [];
  const firstWords = [];
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
          if (j - (i - start) === 0) firstWords.push(j);
          else cutPos.push(j);
          start = i + 1;
        }
      } else {
        dp[i][j] = false;
      }
    }
  }

  // no starting matching words found in string
  if (firstWords.length === 0) return [];

  let sentence = "";
  let duplicates = [];
  let end;
  let word;
  let spaceCount;

  cutPos.sort((a, b) => a - b);

  for (let i = 0; i < firstWords.length; i++) {
    sentence = s.substring(0, firstWords[i]) + " ";
    end = firstWords[i];
    spaceCount = 1;

    for (let j = 0; j < cutPos.length; j++) {
      if (end === cutPos[j]) {
        duplicates.push(end);
        continue;
      }
      word = s.substring(end, cutPos[j]);
      if (!hashmap[word]) break;
      sentence += word + " ";
      end = cutPos[j];
      spaceCount++;

      if (j === cutPos.length - 1) {
        if (sentence.length - spaceCount !== s.length) break;
        else {
          sentence = sentence.substring(0, sentence.length - 1);
          results.push(sentence);
        }
      }
    }
  }

  console.log(results);
  return results;
};

wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"]);

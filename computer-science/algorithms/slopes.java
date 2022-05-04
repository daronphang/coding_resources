class Solution {
    public int candy(int[] ratings) {
		if(ratings==null || ratings.length==0) return 0;
		int start=0,sum=0,len=ratings.length;
		while(start<len) {
			if(start+1<len && ratings[start]==ratings[start+1]) {
				sum+=1;
				start++;
				continue;
			}
			int left=0,right=0;
			//left means the left part of the mountain,right means the right part of the mountain
			while(start+1<len && ratings[start]<ratings[start+1]) {
				start++;
				left++;
			}
			while(start+1<len && ratings[start]>ratings[start+1]) {
				start++;
				right++;
			}
			if(left==0 && right==0) {
				sum+=1;
				break;
			}
			int max=Math.max(left, right)+1;
			int leftSum=(1+left)*left/2;
			// deduct 1 as the last right point will be included in the next mountain
			// when it resets
			int rightSum=(1+right)*right/2-1;
			sum+=max+leftSum+rightSum;
		}
		return sum;
	}
}

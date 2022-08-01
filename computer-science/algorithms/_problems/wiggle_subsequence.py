# https://leetcode.com/problems/wiggle-subsequence/discuss/2229487/PYTHON-O-(-N-)-oror-EXPLAINED-oror

class Solution:
    def wiggleMaxLength(self, nums: List[int]) -> int:
        # greedy approach with peak and valley points
        # difficult part is knowing to initialize peak and valley variables
        peak = 1
        valley = 1
        
        for i in range(1, len(nums)):
            if nums[i] > nums[i-1]:
                # rising wiggle, prev point MUST be a valley
                peak = valley + 1
            elif nums[i] < nums[i-1]:
                # falling wiggle, prev point MUST be a peak
                valley = peak + 1
        
        return max(peak, valley)
        
// Two sum

var twoSum = function(nums, target) {
    for(let i = 0; i < nums.length; i++){
        for (let j = i+1; j < nums.length; j++){
            if (nums[i] + nums[j] === target){
                return [i,j]
            }
        }
    }
};


// nums = [3,3];
// target = 6
// console.log(twoSum(nums, target));


// Single Number

// var store = function(value,arr){
//     var count = 0;
//     for (let i = 0 ; i < arr.length; i++){
//         if (arr[i] === value) {
//         count++;
//         }
//     }
//     return count;
// }

// var singleNumber = function(nums) {
//     nums.forEach(function(element) {
//         if(store(element,nums) === 1){
//             return element;
//         } 
//     });
// };

// nums = [2]  

// console.log(singleNumber(nums));;

// Majority Element

var majority = [0,0]

var store = function(value,arr){
    var count = 0;
    for (let i = 0 ; i < arr.length; i++){
        if (arr[i] === value) {
        count++;
        }
    }
    return count;
}

var majorityElement = function(nums) {
    nums.forEach(function(element) {
        let val = store(element, nums);
        if(val > majority[1]){
            majority[0] = element;
            majority[1] = val;
        }
    });
    return majority[0];
};

nums = [1] 

console.log(majorityElement(nums));



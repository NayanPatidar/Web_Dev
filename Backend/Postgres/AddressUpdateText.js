const Address = [
  { name: "Nayan", Age: 19, DOB: 2005 },
  { name: "John", Age: 20, DOB: 2006 },
  { name: "King", Age: 21, DOB: 2007 },
];

const UpdateAddress = (userNum) => {
  let userSetOne = Address.slice(0, userNum);
  let userSetTwo = Address.slice(userNum + 1, Address.length);
  //   console.log(userSetOne.concat(userSetTwo));
  userSetOne = userSetOne.concat(userSetTwo);
  console.log(userSetOne);

  return userSetOne;
};

console.log(UpdateAddress(0));

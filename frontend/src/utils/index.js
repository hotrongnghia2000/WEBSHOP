export const capitalizeFirst = (string) => {
  const arr = string.split(" ");

  const newArr = [];
  for (const key in arr) {
    if (arr[key] !== "") {
      newArr.push(arr[key].charAt(0).toUpperCase() + arr[key].slice(1));
    }
  }
  return newArr.join(" ");
};

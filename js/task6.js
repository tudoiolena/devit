function minValueMultiply(arr) {
  const flatArray = arr.flatMap((innerArray) => innerArray);
  const minValue = Math.min(...flatArray);
  return arr.map((innerArray) => {
    return innerArray.map((el) => el * minValue);
  });
}

const arr = [
  [5, 3, 6],
  [7, 11, 2],
  [15, 9, 4],
];

console.log(minValueMultiply(arr));

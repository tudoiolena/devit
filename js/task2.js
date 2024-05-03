function* chunkArray(array, chunkLength) {
  for (let i = 0; i < array.length; i += chunkLength) {
    yield array.slice(i, i + chunkLength);
  }
}

const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

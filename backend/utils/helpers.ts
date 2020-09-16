type cb<T> = (index?: number) => T;

export const repeat = <T>(n: number, callback: cb<T>): T[] =>
  Array.from(new Array(n), (_, index) => callback(index));

export const random = <T>(arr: T[]): T => {
  return arr[Math.floor(arr.length * Math.random())];
};

export const randomMany = <T>(arr: T[], amount: number): T[] => {
  if (amount > 1 || amount < 0) {
    return [];
  }

  const newArr = [...arr];
  const out: T[] = [];
  for (let i = 0; i < arr.length * amount; i++) {
    const rand = Math.floor(Math.random() * newArr.length);
    out.push(newArr[rand]);
    newArr.splice(rand, 1);
  }

  return out;
};

// Компания SkillsRock

//1 Реализуй promiseAllLimit(tasks, limit), который выполняет
// промисы с ограничением на параллельность (limit одновременных задач).
function promiseAllLimit(tasks, limit) {}

// Пример использования:
const tasks = [
  () => new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
  () => new Promise((resolve) => setTimeout(() => resolve(2), 500)),
  () => new Promise((resolve) => setTimeout(() => resolve(3), 800)),
];
// promiseAllLimit(tasks, 2).then(console.log); // [1, 2, 3]

//2 Функция retryWithBackoff(fn, retries, delay) должна повторять вызов fn с
// экспоненциальной задержкой (delay * 2^attempt),
// пока fn не выполнится успешно или пока не исчерпаны попытки.
async function retryWithBackoff(fn, retries = 3, delay = 100) {}

// Пример использования:
const failingFn = () => {
  if (Math.random() > 0.7) return Promise.resolve("success");
  return Promise.reject("error");
};
// retryWithBackoff(failingFn, 3, 100).then(console.log).catch(console.error);

//3 Напиши функцию, которая принимает промис и таймаут, и возвращает:
//  - результат промиса, если он завершится вовремя;
//  - иначе — строку "timeout".
function timeoutRace(promise, ms) {}

// Пример использования:
const slowPromise = new Promise((resolve) =>
  setTimeout(() => resolve("done"), 2000)
);
console.log(timeoutRace(slowPromise, 1000)); // "timeout"

//4 Напиши функцию, которая глубоко объединяет два объекта.
function mergeDeep(a, b) {}

// Пример использования:
const obj1 = { a: 1, b: { c: 2, d: 3 } };
const obj2 = { b: { c: 4, e: 5 }, f: 6 };
console.log(mergeDeep(obj1, obj2)); // { a: 1, b: { c: 4, d: 3, e: 5 }, f: 6 }

//5 Проверь, являются ли две строки анаграммами.
function isAnagram(a, b) {}

// Пример использования:
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world")); // false

//6 Напиши функцию, которая группирует массив объектов по ключу.
function groupByKey(arr, key) {}

// Пример использования:
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 },
];
console.log(groupByKey(people, "age"));
// { 25: [{ name: "Alice", age: 25 }, { name: "Charlie", age: 25 }], 30: [{ name: "Bob", age: 30 }] }

// 7 Напиши функцию, которая глубоко разворачивает вложенные массивы.
function flattenArrayDeep(arr) {}

// Пример использования:
console.log(flattenArrayDeep([1, [2, [3, 4]], 5])); // [1, 2, 3, 4, 5]
console.log(flattenArrayDeep([1, [2, 3], [4, [5, 6]]])); // [1, 2, 3, 4, 5, 6]


// 8 Напишите функцию groupAnagrams, которая принимает массив строк 
// и группирует строки, состоящие из одинакового набора букв
// уникальность букв должна учитываться, а регистр игнорироваться
const arrOfChar = ["eat", "teA", "tan", "ate", "nat", "bat", "batT", "taan"]
// -> [["eat", "teA", "ate"], ["tan", "nat", "taan"], ["bat", "batT"]]

function groupAnagrams(arr) {
    const result = new Map();
    arr.forEach((current) => {
        const uniqueSym = [...new Set(current.toLowerCase())]
        const key = uniqueSym.sort().join('')
        if (!result.has(key)) {
            result.set(key, [])
        }
        result.get(key).push(current)
    })
    return [...result.values(result)]
}
console.log(groupAnagrams(arrOfChar));

// OR 

function groupAnagrams(arr) {
    const result = {};
    arr.forEach((current) => {
        const uniqueSym = [...new Set(current.toLowerCase())]
        const key = uniqueSym.sort().join('')
        if (!result[key]) {
            result[key] = []
        }
        result[key].push(current)
    })
    return Object.values(result)
}

// 9 Реализовать собственный метод reduce

const numbers = [1, 4, 2];
const letters = ['r', 't', 'c'];

Array.prototype.reduceFunc = function (cb, initialValue) {
    const hasInitialValue = arguments.length === 2;

    let acc = hasInitialValue ? initialValue : this[0];
    let startIndex = hasInitialValue ? 0 : 1

    for (let i = startIndex; i < this.length; i++) {
        acc = cb(acc, this[i], i, this);
    }

    return acc
} 

console.log(numbers.reduceFunc((acc, curr) => acc + curr, 0)) // 7
console.log(numbers.reduceFunc((acc, curr) => acc - curr, 10)) // 3
console.log(letters.reduceFunc((acc, curr) => acc + curr)) // 3


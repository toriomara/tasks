//https://habr.com/ru/companies/otus/articles/686670/
////////////////////////////////////////////////////
///////////////           1          ///////////////
////////////////////////////////////////////////////
console.log('start');

const promise1 = new Promise((resolve, reject) => {
  console.log(1)
})

console.log('end');
////////////////////////////////////////////////////
///////////////           2          ///////////////
////////////////////////////////////////////////////
console.log('start');

const promise1 = new Promise((resolve, reject) => {
  console.log(1)
  resolve(2)
})

promise1.then(res => {
  console.log(res)
})

console.log('end');
////////////////////////////////////////////////////
///////////////           3          ///////////////
////////////////////////////////////////////////////
console.log('start');

const promise1 = new Promise((resolve, reject) => {
  console.log(1)
  resolve(2)
  console.log(3)
})

promise1.then(res => {
  console.log(res)
})

console.log('end');
////////////////////////////////////////////////////
///////////////           4          ///////////////
////////////////////////////////////////////////////
console.log('start');

const promise1 = new Promise((resolve, reject) => {
  console.log(1)
})

promise1.then(res => {
  console.log(2)
})

console.log('end');
////////////////////////////////////////////////////
///////////////           5          ///////////////
////////////////////////////////////////////////////
console.log('start')

const fn = () => (new Promise((resolve, reject) => {
  console.log(1);
  resolve('success')
}))

console.log('middle')

fn().then(res => {
  console.log(res)
})

console.log('end')
////////////////////////////////////////////////////
///////////////           6          ///////////////
////////////////////////////////////////////////////
console.log('start')

Promise.resolve(1).then((res) => {
  console.log(res)
})

Promise.resolve(2).then((res) => {
  console.log(res)
})

console.log('end')
////////////////////////////////////////////////////
///////////////           7          ///////////////
////////////////////////////////////////////////////
console.log('start')

setTimeout(() => {
  console.log('setTimeout')
})

Promise.resolve().then(() => {
  console.log('resolve')
})

console.log('end')
////////////////////////////////////////////////////
///////////////           8          ///////////////
////////////////////////////////////////////////////
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log("timerStart");
    resolve("success");
    console.log("timerEnd");
  }, 0);
  console.log(2);
});

promise.then((res) => {
  console.log(res);
});

console.log(4);
////////////////////////////////////////////////////
///////////////           9          ///////////////
////////////////////////////////////////////////////
const timer1 = setTimeout(() => {
  console.log('timer1');
  
  const promise1 = Promise.resolve().then(() => {
    console.log('promise1')
  })
}, 0)

const timer2 = setTimeout(() => {
  console.log('timer2')
}, 0)
////////////////////////////////////////////////////
///////////////           10          //////////////
////////////////////////////////////////////////////
console.log('start');

const promise1 = Promise.resolve().then(() => {
  console.log('promise1');
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
});

const timer1 = setTimeout(() => {
  console.log('timer1')
  const promise2 = Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)

console.log('end');
////////////////////////////////////////////////////
////////////////////////////////////////////////////


// all 
// allSettled 
// any
// race

// Promise.resolve
// Promise.reject

// Promise.all([])
// Методы, которые возвращают все результаты, возвращают Promise в том порядке в котором они были переданы.
// 1) Принимает массив промисов
// или значений ( промисификация, все входные данные преобразуются в promise, 
// избавляемся от TypeError: promise.then is not a function )
// 2) Если [] передан пустым => fulfilled
// 3) Ожидает исполнение всех промисов, если какой-то из Promise уходит в rej, то весь all отклоняется и улетает в catch.
// return [ 0:[] ... ]


const promise1 = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('promise1');
      res();
    }, 1000);
  });
};

const promise2 = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('promise2');
      rej();
      // rej(new Error("Что-то пошло не так в promise2"))
    }, 1000);
  });
};


const myPromiseAll = (allArrPromise) => {
  return new Promise((resolve, reject) => {
    if (allArrPromise.length === 0) {
      resolve([]);
      return;
    }

    let result = []; // [ 0:[] ... ]
    let completedCount = 0; // ++

    // Ожидает исполнение всех промисов, если какой-то из Promise уходит в rej, 
    // то весь all отклоняется и улетает в catch.
    allArrPromise.forEach((elProm, index) => {
      Promise.resolve(elProm) // Промисификация
        .then((value) => {
          result[index] = value;
          completedCount += 1;

          let currentLenghtAllPromise = allArrPromise.length
          if (completedCount === currentLenghtAllPromise) {
            resolve(result)
          }
        })
        .catch((reason) => {
          reject(reason)
        })
    })
  })
}

myPromiseAll([promise1(), promise2(), 5])
  .then((res) => { console.log(res) })
  .catch((err) => console.error("Ошибка:", err));


(async () => {
  try {
    const res = await myPromiseAll([getUsers(), getPosts(), getTodos()]);

    console.log('Результат:', res);
  } catch (err) {
    if (err instanceof AggregateError) {
      for (const e of err.errors) {
        console.error('Ошибка:', e);
      }
    } else {
      console.error('Другая ошибка:', err);
    }
  }
})()



// [ ind: [], ...]

// [ {status: 'fullfiled', value: []}]
// [ {status: 'reject', value: [] }]



// https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
// https://hacker-news.firebaseio.com/v0/item/45458948.json
// normalized schema

// {
//     posts: {
//         byId: {
//             "1a2b3c": { id: "1a2b3c", authorId: "u123", title: "Post 1" },
//             "4d5e6f": { id: "4d5e6f", authorId: "u456", title: "Post 2" }
//         },
//         allIds: ["1a2b3c", "4d5e6f"]
//     },
//     users: {
//         byId: {
//             "u123": { id: "u123", name: "Alice" },
//             "u456": { id: "u456", name: "Bob" }
//         },
//         allIds: ["u123", "u456"]
//     }
// }
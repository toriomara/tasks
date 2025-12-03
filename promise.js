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

// Изначально пишем через then,
// затем переписываем на async/await

// Промисы
// 1) Создай функцию wait(ms), которая возвращает промис, резолвящийся через ms миллисекунд.

// function fetchUserData(ms) {
//     let arr = [{ user: 1 }, { user: 2 }];
    
//     return new Promise(resolve => setTimeout(() => resolve(arr)), ms)
// }


// fetchUserData(2000).then(console.log);

// async function newFunc() {
//     let res = await fetchUserData(2000);
//     console.log('res: ', res )
// }

// newFunc();

// .then .catch .finally // Promise
// try {} catch() finally{} // async/await



// 2) Последовательные запросы
// Сделай так, чтобы запросы выполнялись последовательно: ( не параллельно )  1 → 2 → 3
// и результат выводился по очереди. ( пока нету прошлого, новый результат не появится)

function getData(id) {
    return Promise.resolve(`Данные для id=${id}`)   
}

getData('текст 1')
    .then(val => {
        console.log(val)

        // Изначально пишем через then,
        // затем переписываем на async/await

        // .then((value) => console.log(value))

        //  const value = await fetchUserData(2000);

        //  console.log(value)




        // return getData('текст 2')
    })
    .then(val => {
        console.log(val)
        return getData('текст 3')})
    .then(val => console.log(val))





// 3) Обработка ошибок
// Функция getUser иногда возвращает ошибку.
// Задача — вызвать getUser(1) и корректно обработать ошибку:

// function getUser(id: number) {
//     return new Promise((resolve, reject) => {
//         if (Math.random() > 0.5) resolve({id, name: 'User'});
//         else reject(new Error('Ошибка загрузки'));
//     });
// }





// 4) Параллельные запросы
// Вызови три загрузки параллельно (/a, /b, /c) и выведи результат всех:

// function load(url: string) {
//     return Promise.resolve(`Загружено: ${url}`);
// }





// 5) Цепочка зависимых вызовов
// Нужно:
// Получить пользователя
// Затем посты этого пользователя
// Вывести оба результата
// Реализуй цепочку и её async/await версию.

// function getUser(id: number) {
//     return Promise.resolve({id, name: 'User'});
// }

// function getPosts(userId: number) {
//     return Promise.resolve([ `Post of ${userId}` ]);
// }






// 6) Последовательно + параллельно
// Сначала нужно загрузить пользователя,
// а потом параллельно ( не последовательно ) загрузить посты и комментарии.
// Выведи всё в виде объекта:
// { user, posts, comments }


// function fetchUser() {
//     return Promise.resolve('user');
// }

// function fetchPosts() {
//     return Promise.resolve(['post1', 'post2']);
// }

// function fetchComments() {
//     return Promise.resolve(['comment1', 'comment2']);
// }





// 7) Последовательный retry
// Напиши функцию fetchWithRetry(fn, retries),
// которая вызывает асинхронную функцию fn() и, если она упала, пробует ещё retries раз.
// Реализуй и в промисах, и в async/await.

// function unstableFetch() {
//     return new Promise((resolve, reject) => {
//         const success = Math.random() > 0.7;
//         setTimeout(() => {
//             if (success) resolve('Успех!');
//             else reject(new Error('Случайная ошибка'));
//         }, 300);
//     });
// }

// const fetchWithRetry = () => { }

// Added from LIVECODING
/*
  Напиши функцию, которая принимает промис и таймаут, и возвращает:
   - результат промиса, если он завершится вовремя;
   - иначе — строку "timeout".
*/

export function timeoutRace(promise, ms) {
  
}
/*
  Реализуй promiseAllLimit(tasks, limit), который выполняет 
  промисы с ограничением на параллельность (limit одновременных задач). 
*/

export async function promiseAllLimit(tasks, limit) { }

/* 
  Функция retryWithBackoff(fn, retries, delay) должна повторять вызов fn с 
  экспоненциальной задержкой (delay * 2^attempt), 
  пока fn не выполнится успешно или пока не исчерпаны попытки.
*/

export async function retryWithBackoff(fn, retries = 3, delay = 100) {

}

/*
  Напиши функцию, которая принимает промис и таймаут, и возвращает:
   - результат промиса, если он завершится вовремя;
   - иначе — строку "timeout".
*/

export function timeoutRace(promise, ms) {

}


/* Есть массив промисов, каждый из которых разрешается в числовое значение.Необходимо:
    -Дождаться выполнения всех промисов в массиве
    -Получить их результаты
    -Вычислить сумму всех полученных значений 
*/


const promiseArray = [
    Promise.resolve(10),
    Promise.resolve(20),
    Promise.resolve(30),
];

function sumPromise(promises) { }

sumPromises(promiseArray)// 60

//Promise.customAny

/* async function queue() {
    console.log(1);

    setTimeout(() => console.log(2), 0);

    const targetNode = document.createElement('div');
    document.body.appendChild(targetNode);

    const observer = new MutationObserver(() => {
        console.log(6);
        Promise.resolve().then(() => console.log(7));
    });

    observer.observe(targetNode, { attributes: true });

    let a = new Promise((resolve) => {
        console.log(3);
        resolve();
    });

    a.then(() => {
        console.log(5);
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(data => console.log(9));

        targetNode.setAttribute('data-test', 'value');
    });

    console.log(4);

    requestAnimationFrame(() => {
        console.log(8);
    });

    await a;
}

queue();
console.log(10); */


/*
у нас есть набор билетов вида:
[
{from: 'London', to: "Moscow"},
{from: 'NY', to: "London"},
{from: 'Moscow', to: "SPb"},
...
]

Из этих билетов можно построить единственный, неразрывный маршрут.
Петель и повторов в маршруте нет.
Нужно написать программу, которая возвращает эти же объекты билетов в порядке следования маршрута.
Начало маршрута известно
*/

function getRoute(tickets = [], start) {
    //code
}

console.clear();
console.log(
    getRoute(
        [
            { from: "London", to: "Moscow" },
            { from: "NY", to: "London" },
            { from: "Moscow", to: "SPb" },
        ],
        "NY"
    )
);



/*
Дан массив ссылок: ['url1', 'url2', ...] и лимит одновременных запросов (limit)
Необходимо реализовать функцию, которая опросит урлы в том порядке, в котором они идут в массиве, и вызовет callback c массивом ответов
['url1_answer', 'url2_answer', ...] так, чтобы в любой момент времени выполнялось не более limit
запросов (как только любой из них завершился, сразу же отправляется следующий)
Т.е. нужно реализовать шину с шириной равной limit.

Требования:
- Порядок в массиве ответов должен совпадать с порядком в массиве ссылок
Дополнительно:
- Функция должна обладать мемоизацией (один и тот же урл не опрашивать дважды)

Для опроса можно использовать fetch
Ошибки обрабатывать не нужно
*/
//O(n) - время
//O(n)+O(k) - память


function parallelLimit(links, limit, callback) {
    //code
}


const db = { link1: '1', link2: '2', link3: '3', link7: '7' };
const links = ['link1', 'link2', 'link1', 'link3', 'link1', 'link2', 'link2', 'link7'];
const expected = [1, 2, 1, 3, 1, 2, 2, 7];


// declare function fetch(url: string): Promise<string>;
function fetch(url) {
    console.log(`fetching: ${url}`)
    const response = db[url];

    if (response === undefined) {
        throw new Error('No such url');
    }

    return new Promise(resolve => {
        const timeout = Math.random() * 100 + 20;
        setTimeout(() => resolve(response), timeout);
    });
}


function test(results) {
    if (!Array.isArray(results) || results.toString() !== expected.toString()) {
        console.error(`Expected: ${expected.toString()}`);
        console.error(`Received: ${results.toString()}`);
        return
    }
    console.log('Test passed');
}

parallelLimit(links, 3, test);






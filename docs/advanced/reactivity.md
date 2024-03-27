# Реактивность

Alpine является «реактивным» в том смысле, что когда вы меняете часть данных, все, что зависит от этих данных, «реагирует» автоматически на это изменение.

Каждая часть реактивности, происходящая в Alpine, происходит из-за двух очень важных реактивных функций в ядре Alpine: `Alpine.reactive()` и `Alpine.effect()`.

!!! note "Примечание"

    Для реализации этих функций Alpine использует механизм реактивности VueJS.

[→ Подробнее о @vue/reactivity](https://github.com/vuejs/vue-next/tree/master/packages/reactivity)

Понимание этих двух функций даст вам суперспособности как разработчика Alpine, а также как веб-разработчика в целом.

<a name="alpine-reactive"></a>

## Alpine.reactive()

Давайте сначала посмотрим на `Alpine.reactive()`. Эта функция принимает объект JavaScript в качестве параметра и возвращает «реактивную» версию этого объекта. Например:

```js
let data = { count: 1 };

let reactiveData = Alpine.reactive(data);
```

Под капотом, когда `Alpine.reactive` получает `data`, он помещает их в собственный прокси-сервер JavaScript.

Прокси — это особый вид объекта в JavaScript, который может перехватывать вызовы «get» и «set» к объекту JavaScript.

[→ Подробнее о прокси JavaScript](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

Переменная `reactiveData` должна вести себя точно так же, как `data`. Например:

```js
console.log(data.count); // 1
console.log(reactiveData.count); // 1

reactiveData.count = 2;

console.log(data.count); // 2
console.log(reactiveData.count); // 2
```

Здесь вы видите, что, поскольку `reactiveData` представляет собой тонкую оболочку `data`, любые попытки получить или установить свойство будут вести себя точно так же, как если бы вы напрямую взаимодействовали с `data`.

Основное отличие здесь заключается в том, что каждый раз, когда вы изменяете или извлекаете (получаете или устанавливаете) значение из `reactiveData`, Alpine узнает об этом и может выполнить любую другую логику, которая зависит от этих данных.

`Alpine.reactive` — это только первая половина истории. `Alpine.effect` — это вторая половина, давайте углубимся.

<a name="alpine-effect"></a><a name="alpine-effect"></a>

## Alpine.effect()

`Alpine.effect` принимает одну функцию обратного вызова. Как только `Alpine.effect` вызывается, он запускает предоставленную функцию, но активно ищет любые взаимодействия с реактивными данными. Если он обнаружит взаимодействие (получение или установку от вышеупомянутого реактивного прокси), он будет отслеживать его и обязательно перезапустит обратный вызов, если какие-либо реактивные данные изменятся в будущем. Например:

```js
let data = Alpine.reactive({ count: 1 });

Alpine.effect(() => {
  console.log(data.count);
});
```

При первом запуске этого кода в консоли отобразится «1». При каждом изменении `data.count` новое значение будет выводиться в консоль.

Это механизм, который раскрывает всю реактивность ядра Alpine.

Чтобы связать всё воедино, давайте посмотрим на простой пример компонента «счётчик» вообще без использования синтаксиса Alpine, а только с использованием `Alpine.reactive` и `Alpine.effect`:

```html
<button>Увеличить</button>

Счётчик: <span></span>
```

```js
let button = document.querySelector('button');
let span = document.querySelector('span');

let data = Alpine.reactive({ count: 1 });

Alpine.effect(() => {
  span.textContent = data.count;
});

button.addEventListener('click', () => {
  data.count = data.count + 1;
});
```

!!! example "Пример"

    <div x-data="{ count: 1 }" class="demo">
        <button class="md-button md-button--primary" x-on:click="count++">Увеличить</button>
        <div>Счётчик: <span x-text="count"></span></div>
    </div>

Как видите, вы можете сделать любые данные реактивными, а также можете обернуть любую функциональность в `Alpine.effect`.

Эта комбинация открывает невероятно мощную парадигму программирования для веб-разработки. Бегите дико и бесплатно.

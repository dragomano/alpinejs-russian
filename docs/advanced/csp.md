---
title: CSP
---

# CSP (Политика безопасности содержимого)

Чтобы Alpine мог выполнять простые строки из атрибутов HTML в виде выражений JavaScript, например `x-on:click="console.log()"`, ему необходимо полагаться на утилиты, которые нарушают принцип «unsafe-eval»

!!! info "К сведению"

    Под капотом Alpine фактически не использует eval(), поскольку он медленный и проблематичный. Вместо этого он использует объявления функций, которые намного лучше, но всё же нарушают «unsafe-eval».

Чтобы адаптироваться к средам, где необходим этот CSP, Alpine предложит альтернативную сборку, которая не нарушает «unsafe-eval», но имеет более строгий синтаксис.

<a name="installation"></a>

## Установка

Сборка CSP еще официально не выпущена. Однако её можно собрать из исходного кода. Для этого клонируйте репозиторий [`alpinejs/alpine`](https://github.com/alpinejs/alpine) и запустите:

```shell
npm install
npm run build
```

В результате будет создан каталог `/packages/csp/dist/` с собранными файлами. Скопировав соответствующий файл в свой проект, можно включить его либо через тег `<script>`, либо через импорт модуля:

<a name="script-tag"></a>

### Тег script

```html
<html>
  <script src="/path/to/cdn.js" defer></script>
</html>
```

<a name="module-import"></a>

### Импорт модуля

```js
import Alpine from './path/to/module.esm.js';

window.Alpine = Alpine;
window.Alpine.start();
```

<a name="restrictions"></a>

## Ограничения

Поскольку Alpine больше не может интерпретировать строки как обычный JavaScript, ему приходится разбирать и конструировать из них JavaScript-функции вручную.

В связи с этим ограничением для регистрации объектов `x-data` необходимо использовать `Alpine.data`, а на свойства и методы из него ссылаться только по ключу.

Например, такой встроенный компонент не будет работать.

```html
<!-- Плохо -->
<div x-data="{ count: 1 }">
  <button @click="count++">Увеличить</button>

  <span x-text="count"></span>
</div>
```

Однако, если разбить выражения на внешние API, то для сборки CSP будет справедливо следующее:

```html
<!-- Хорошо -->
<div x-data="counter">
  <button @click="increment">Увеличить</button>

  <span x-text="count"></span>
</div>
```

```js
Alpine.data('counter', () => ({
  count: 1,

  increment() {
    this.count++;
  },
}));
```

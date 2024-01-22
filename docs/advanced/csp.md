---
title: CSP
---

# CSP (Политика безопасности содержимого)

Чтобы Alpine мог выполнять простые строки из HTML-атрибутов как выражения JavaScript, например `x-on:click="console.log()"`, ему необходимо использовать утилиты, нарушающие принцип «unsafe-eval» [Политики безопасности содержимого](https://developer.mozilla.org/ru/docs/Web/HTTP/CSP), которую некоторые приложения могут применять в целях безопасности.

!!! info "К сведению"

    Под капотом Alpine фактически не использует eval(), поскольку он медленный и проблематичный. Вместо этого он использует объявления функций, которые намного лучше, но всё же нарушают «unsafe-eval».

Чтобы приспособиться к средам, где этот CSP необходим, Alpine предлагает альтернативную сборку, которая не нарушает «unsafe-eval», но имеет более строгий синтаксис.

<a name="installation"></a>

## Установка

Вы можете использовать эту сборку, включив её в тег `<script>` или установив через NPM:

### Через CDN

Вы можете включить CDN этой сборки в виде тега `<script>`, как это делается в стандартной сборке Alpine:

```html
<!-- Ядро Alpine, дружественное к CSP -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/csp@3/dist/cdn.min.js"></script>
```

### Через NPM

Вы можете установить эту сборку из NPM для использования внутри вашего пакета следующим образом:

```shell
npm install @alpinejs/csp
```

Затем инициализируйте его из вашего пакета:

```js
import Alpine from '@alpinejs/csp';

window.Alpine = Alpine;
window.Alpine.start();
```

<a name="basic-example"></a>

## Базовый пример

Чтобы дать представление о том, как может выглядеть использование сборки CSP, вот копируемый HTML-файл с работающим компонентом счётчика, использующим обычную настройку CSP:

```html
<html>
  <head>
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'nonce-a23gbfz9e'"
    />
    <script
      defer
      nonce="a23gbfz9e"
      src="https://cdn.jsdelivr.net/npm/@alpinejs/csp@3/dist/cdn.min.js"
    ></script>
  </head>
  <body>
    <div x-data="counter">
      <button x-on:click="count++"></button>
      <span x-text="count"></span>
    </div>
    <script nonce="a23gbfz9e">
      document.addEventListener('alpine:init', () => {
        Alpine.data('counter', () => {
          return {
            count: 1,
            increment() {
              this.count++;
            },
          };
        });
      });
    </script>
  </body>
</html>
```

<a name="api-restrictions"></a>

## Ограничения API

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

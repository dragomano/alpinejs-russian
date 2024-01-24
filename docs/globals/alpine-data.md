# Alpine.data

`Alpine.data(...)` предоставляет возможность повторного использования контекстов `x-data` в вашем приложении.

Для примера приведем надуманный компонент `dropdown`:

```html
<div x-data="dropdown">
  <button @click="toggle">...</button>

  <div x-show="open">...</div>
</div>

<script>
  document.addEventListener('alpine:init', () => {
    Alpine.data('dropdown', () => ({
      open: false,

      toggle() {
        this.open = !this.open;
      },
    }));
  });
</script>
```

Как видите, мы вынесли свойства и методы, которые обычно определяются непосредственно внутри `x-data`, в отдельный объект компонента Alpine.

<a name="registering-from-a-bundle"></a>

## Регистрация в сборке

Если вы решили использовать шаг сборки для своего кода Alpine, то вам следует зарегистрировать свои компоненты следующим образом:

```js
import Alpine from 'alpinejs';
import dropdown from './dropdown.js';

Alpine.data('dropdown', dropdown);

Alpine.start();
```

Предполагается, что у вас есть файл `dropdown.js` со следующим содержимым:

```js
export default () => ({
  open: false,

  toggle() {
    this.open = !this.open;
  },
});
```

<a name="initial-parameters"></a>

## Исходные параметры

Помимо обращения к провайдерам `Alpine.data` по их имени в простом виде (например, `x-data="dropdown"`), можно обращаться к ним как к функциям (`x-data="dropdown()"`). Вызывая их непосредственно как функции, можно передавать дополнительные параметры, которые будут использоваться при создании исходного объекта данных, например, так:

```html
<div x-data="dropdown(true)"></div>
```

```js
Alpine.data('dropdown', (initialOpenState = false) => ({
  open: initialOpenState,
}));
```

Теперь можно повторно использовать объект `dropdown`, но при необходимости снабжать его различными параметрами.

<a name="init-functions"></a>

## Метод `init`

Если ваш компонент содержит метод `init()`, то Alpine автоматически выполнит его перед рендерингом компонента. Например:

```js
Alpine.data('dropdown', () => ({
  init() {
    // Этот код будет выполнен до того, как Alpine
    // инициализирует остальные компоненты.
  },
}));
```

<a name="destroy-functions"></a>

## Метод `destroy`

Если ваш компонент содержит метод `destroy()`, то Alpine автоматически выполнит его перед очисткой компонента.

Основной пример — регистрация обработчика события в другой библиотеке или API браузера, недоступных через Alpine.
Как использовать метод `destroy()` для очистки такого обработчика, смотрите в следующем примере:

```js
Alpine.data('timer', () => ({
  timer: null,
  counter: 0,
  init() {
    // Зарегистрируйте обработчик события, ссылающийся на экземпляр компонента
    this.timer = setInterval(() => {
      console.log('Увеличение счётчика до ', ++this.counter);
    }, 1000);
  },
  destroy() {
    // Отсоедините обработчик, избежав утечки памяти и побочных эффектов
    clearInterval(this.timer);
  },
}));
```

Примером отсоединения компонента является использование его внутри `x-if`:

```html
<span x-data="{ enabled: false }">
  <button @click.prevent="enabled = !enabled">Переключить</button>

  <template x-if="enabled">
    <span x-data="timer" x-text="counter"></span>
  </template>
</span>
```

<a name="using-magic-properties"></a>

## Использование магических свойств

Если необходимо получить доступ к магическим методам или свойствам из объекта компонента, то это можно сделать, используя контекст `this`:

```js
Alpine.data('dropdown', () => ({
    open: false,

    init() {
        this.$watch('open', () => {...})
    }
}))
```

<a name="encapsulating-directives-with-x-bind"></a>

## Инкапсуляция директив с помощью `x-bind`

Если вы хотите повторно использовать не только объект данных компонента, вы можете инкапсулировать целые директивы шаблона Alpine с помощью `x-bind`.

Ниже приведен пример извлечения деталей шаблона нашего предыдущего выпадающего компонента с помощью `x-bind`:

```html
<div x-data="dropdown">
  <button x-bind="trigger"></button>

  <div x-bind="dialogue"></div>
</div>
```

```js
Alpine.data('dropdown', () => ({
  open: false,

  trigger: {
    ['@click']() {
      this.open = !this.open;
    },
  },

  dialogue: {
    ['x-show']() {
      return this.open;
    },
  },
}));
```

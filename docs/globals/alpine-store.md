# Alpine.store

Alpine предлагает глобальное управление состоянием через API `Alpine.store()`.

<a name="registering-a-store"></a>

## Регистрация хранилища

Вы можете либо определить хранилище Alpine внутри слушателя `alpine:init` (в случае включения Alpine через тег `<script>`), либо определить его перед ручным вызовом `Alpine.start()` (в случае импорта Alpine в сборку):

**В теге script:**

```html
<script>
  document.addEventListener('alpine:init', () => {
    Alpine.store('darkMode', {
      on: false,

      toggle() {
        this.on = !this.on;
      },
    });
  });
</script>
```

**В сборке:**

```js
import Alpine from 'alpinejs';

Alpine.store('darkMode', {
  on: false,

  toggle() {
    this.on = !this.on;
  },
});

Alpine.start();
```

<a name="accessing stores"></a>

## Доступ к хранилищам

В выражениях Alpine можно получить доступ к данным из любого хранилища, используя магическое свойство `$store`:

```html
<div x-data :class="$store.darkMode.on && 'bg-black'">...</div>
```

Вы также можете изменять свойства внутри хранилища, и всё, что зависит от этих свойств, будет автоматически реагировать. Например:

```html
<button x-data @click="$store.darkMode.toggle()">Переключить тёмный режим</button>
```

Кроме того, можно получить доступ к хранилищу извне, используя `Alpine.store()`, опустив второй параметр, как показано ниже:

```html
<script>
  Alpine.store('darkMode').toggle();
</script>
```

<a name="initializing-stores"></a>

## Инициализация хранилищ

Если в хранилище Alpine предусмотреть метод `init()`, то он будет выполнен сразу после регистрации хранилища. Это полезно для инициализации любого состояния внутри хранилища разумными начальными значениями.

```html
<script>
  document.addEventListener('alpine:init', () => {
    Alpine.store('darkMode', {
      init() {
        this.on = window.matchMedia('(prefers-color-scheme: dark)').matches;
      },

      on: false,

      toggle() {
        this.on = !this.on;
      },
    });
  });
</script>
```

Обратите внимание на недавно добавленный метод `init()` в приведенном примере. При таком добавлении переменная хранилища `on` будет установлена в соответствии с предпочтениями цветовой схемы браузера до того, как Alpine отобразит что-либо на странице.

<a name="single-value-stores"></a>

## Хранилища с одним значением

Если вам не нужен целый объект для хранилища, вы можете установить и использовать в качестве хранилища любые данные.

Вот пример выше, но проще использовать его как логическое значение:

```html
<button x-data @click="$store.darkMode = !$store.darkMode">Переключить тёмный режим</button>

...

<div x-data :class="$store.darkMode && 'bg-black'">...</div>

<script>
  document.addEventListener('alpine:init', () => {
    Alpine.store('darkMode', false);
  });
</script>
```

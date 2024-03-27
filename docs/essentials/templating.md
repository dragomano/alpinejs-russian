# Шаблонизация

Alpine предлагает несколько полезных директив для управления DOM на веб-странице.

Давайте рассмотрим здесь несколько основных директив шаблонов, но обязательно просмотрите доступные директивы на боковой панели, чтобы получить исчерпывающий список.

<a name="text-content"></a>

## Текстовое содержимое

Alpine позволяет легко управлять текстовым содержимым элемента с помощью директивы `x-text`.

```html
<div x-data="{ title: 'Начало' }">
  <h1 x-text="title"></h1>
</div>
```

!!! example "Пример"

    <div x-data="{ title: 'Начало' }" class="demo">
        <strong x-text="title"></strong>
    </div>

Теперь Alpine установит текстовое содержимое `<h1>` со значением `title` («Начало»). Когда `title` изменится, изменится и содержимое `<h1>`.

Подобно другим директивам в Alpine, вы можете использовать любое выражение JavaScript, которое вам нравится. Например:

```html
<span x-text="1 + 2"></span>
```

!!! example "Пример"

    <div class="demo" x-data>
        <span x-text="1 + 2"></span>
    </div>

`<span>` теперь будет содержать сумму «1» и «2».

[→ Подробнее о `x-text`](../directives/text.md)

<a name="toggling-elements"></a>

## Переключение элементов

Переключение элементов — обычная потребность на веб-страницах и в приложениях. Выпадающие списки, модальные окна, диалоги, «показать далее» и т. д. — всё это хорошие примеры.

Alpine предлагает директивы `x-show` и `x-if` для переключения элементов на странице.

<a name="x-show"></a>

### `x-show`

Вот простой компонент переключения, использующий `x-show`:

```html
<div x-data="{ open: false }">
  <button @click="open = !open">Развернуть</button>

  <div x-show="open">Содержимое...</div>
</div>
```

!!! example "Пример"

    <div x-data="{ open: false }" class="demo">
        <button class="md-button md-button--primary" x-on:click="open = !open" :aria-pressed="open">Развернуть</button>
        <div x-show="open">
            Содержимое...
        </div>
    </div>

Теперь весь `<div>`, содержащий содержимое, будет отображаться и скрываться в зависимости от значения `open`.

Alpine добавляет свойство CSS `display: none;` к элементу, когда он должен быть скрыт.

[→ Подробнее о `x-show`](../directives/show.md)

Это хорошо работает в большинстве случаев, но иногда вам может потребоваться полностью добавить или полностью удалить элемент из DOM. Вот для чего нужен `x-if`.

<a name="x-if"></a>

### `x-if`

Вот тот же переключатель, что и раньше, но на этот раз вместо `x-show` используется `x-if`:

```html
<div x-data="{ open: false }">
  <button @click="open = !open">Развернуть</button>

  <template x-if="open">
    <div>Содержимое...</div>
  </template>
</div>
```

!!! example "Пример"

    <div x-data="{ open: false }" class="demo">
        <button class="md-button md-button--primary" x-on:click="open = !open" :aria-pressed="open">Развернуть</button>
        <template x-if="open">
            <div>
                Содержимое...
            </div>
        </template>
    </div>

Обратите внимание, что `x-if` должен быть объявлен в теге `<template>`. Это сделано для того, чтобы Alpine мог использовать существующее поведение браузера элемента `<template>` и использовать его в качестве источника целевого `<div>` для добавления и удаления со страницы.

Если `open` имеет значение true, Alpine добавит `<div>` к тегу `<template>` и удалит его, если `open` имеет значение false.

[→ Подробнее о `x-if`](../directives/if.md)

<a name="toggling-with-transitions"></a>

## Переключение с помощью переходов

Alpine упрощает плавный переход между «показанным» и «скрытым» состояниями с помощью директивы `x-transition`.

!!! note "Примечание"

    `x-transition` работает только с `x-show`, но не с `x-if`.

Вот ещё раз простой пример переключения, но на этот раз с применением переходов:

```html
<div x-data="{ open: false }">
  <button @click="open = !open">Развернуть</button>

  <div x-show="open" x-transition>Содержимое...</div>
</div>
```

!!! example "Пример"

    <div x-data="{ open: false }" class="demo">
        <button class="md-button md-button--primary" x-on:click="open = !open">Развернуть</button>
        <div class="flex">
            <div x-show="open" x-transition style="will-change: transform;">
                Содержимое...
            </div>
        </div>
    </div>

Давайте увеличим часть шаблона, связанную с переходами:

```html
<div x-show="open" x-transition></div>
```

`x-transition` сам по себе применит к переключателю разумные переходы по умолчанию (затухание и масштабирование).

Есть два способа настройки этих переходов:

- Хелперы переходов
- CSS-классы переходов.

Давайте рассмотрим каждый из этих подходов:

<a name="transition-helpers"></a>

### Хелперы переходов

Допустим, вы хотите увеличить продолжительность перехода. Вы можете вручную указать это с помощью модификатора `.duration` следующим образом:

```html
<div x-show="open" x-transition.duration.500ms></div>
```

!!! example "Пример"

    <div x-data="{ open: false }" class="demo">
        <button class="md-button md-button--primary" x-on:click="open = !open">Развернуть</button>
        <div class="flex">
            <div x-show="open" x-transition.duration.500ms style="will-change: transform;">
                Содержимое...
            </div>
        </div>
    </div>

Теперь переход будет длиться 500 миллисекунд.

Если вы хотите указать разные значения для входных и выходных переходов, вы можете использовать `x-transition:enter` и `x-transition:leave`:

```html
<div x-show="open" x-transition:enter.duration.500ms x-transition:leave.duration.1000ms></div>
```

!!! example "Пример"

    <div x-data="{ open: false }" class="demo">
        <button class="md-button md-button--primary" x-on:click="open = !open">Развернуть</button>
        <div class="flex">
            <div x-show="open" x-transition:enter.duration.500ms x-transition:leave.duration.1000ms style="will-change: transform;">
                Содержимое...
            </div>
        </div>
    </div>

Кроме того, вы можете добавить `.opacity` или `.scale`, чтобы передать только это свойство. Например:

```html
<div x-show="open" x-transition.opacity></div>
```

!!! example "Пример"

    <div x-data="{ open: false }" class="demo">
        <button class="md-button md-button--primary" x-on:click="open = !open">Развернуть</button>
        <div class="flex">
            <div x-show="open" x-transition:enter.opacity.duration.500 x-transition:leave.opacity.duration.250>
                Содержимое...
            </div>
        </div>
    </div>

[→ Подробнее о хелперах переходов](../directives/transition.md#the-transition-helper)

<a name="transition-classes"></a>

### Классы переходов

Если вам нужен более детальный контроль над переходами в вашем приложении, вы можете применить определённые классы CSS на определенных этапах перехода, используя следующий синтаксис (в этом примере используется [Tailwind CSS](https://tailwindcss.com)):

```html
<div
  x-show="open"
  x-transition:enter="transition ease-out duration-300"
  x-transition:enter-start="opacity-0 transform scale-90"
  x-transition:enter-end="opacity-100 transform scale-100"
  x-transition:leave="transition ease-in duration-300"
  x-transition:leave-start="opacity-100 transform scale-100"
  x-transition:leave-end="opacity-0 transform scale-90"
>
  ...
</div>
```

!!! example "Пример"

    <div x-data="{ open: false }" class="demo">
        <button class="md-button md-button--primary" x-on:click="open = !open">Развернуть</button>
        <div class="flex">
            <div
                x-show="open"
                x-transition:enter="transition ease-out duration-300"
                x-transition:enter-start="opacity-0 transform scale-90"
                x-transition:enter-end="opacity-100 transform scale-100"
                x-transition:leave="transition ease-in duration-300"
                x-transition:leave-start="opacity-100 transform scale-100"
                x-transition:leave-end="opacity-0 transform scale-90"
                style="will-change: transform"
            >
                Содержимое...
            </div>
        </div>
    </div>

[→ Подробнее о классах переходов](../directives/transition.md#applying-css-classes)

<a name="binding-attributes"></a>

## Привязка атрибутов

Вы можете добавлять атрибуты HTML, такие как `class`, `style`, `disabled` и т. д., к элементам в Alpine, используя директиву `x-bind`.

Вот пример динамически связанного атрибута `class`:

```html
<button x-data="{ red: false }" x-bind:class="red ? 'bg-red' : ''" @click="red = !red">
  Переключить красный
</button>
```

!!! example "Пример"

    <div class="demo">
        <button
            class="md-button md-button--primary"
            x-data="{ red: false }"
            x-bind:style="red && 'background: red'"
            x-on:click="red = !red"
        >
            Переключить красный
        </button>
    </div>

Для краткости можно опустить `x-bind` и использовать сокращённый синтаксис `:`:

```html
<button ... :class="red ? 'bg-red' : ''"></button>
```

Включение и выключение классов на основе данных, содержащихся в Alpine, является распространённой потребностью. Приведем пример переключения класса с использованием синтаксиса объекта привязки `class` в Alpine: (Примечание: этот синтаксис доступен только для атрибутов `class`):

```html
<div x-data="{ open: true }">
  <span :class="{ 'hidden': !open }">...</span>
</div>
```

Теперь класс `hidden` будет добавлен к элементу, если значение `open` равно false, и удалён, если значение `open` равно true.

<a name="looping-elements"></a>

## Повторение элементов

Alpine позволяет итерировать части шаблона на основе данных JavaScript с помощью директивы `x-for`. Приведём простой пример:

```html
<div x-data="{ statuses: ['открыто', 'закрыто', 'архивировано'] }">
  <template x-for="status in statuses">
    <div x-text="status"></div>
  </template>
</div>
```

!!! example "Пример"

    <div x-data="{ statuses: ['открыто', 'закрыто', 'архивировано'] }" class="demo">
        <template x-for="status in statuses">
            <div x-text="status"></div>
        </template>
    </div>

Аналогично `x-if`, `x-for` должен применяться к тегу `<template>`. Внутренне Alpine будет добавлять содержимое тега `<template>` на каждой итерации цикла.

Как видно, новая переменная `status` доступна в области видимости итерируемых шаблонов.

[→ Подробнее о `x-for`](../directives/for.md)

<a name="inner-html"></a>

## Внутренний HTML

Alpine позволяет легко управлять HTML-содержимым элемента с помощью директивы `x-html`.

```html
<div x-data="{ title: '<h1>Начало</h1>' }">
  <div x-html="title"></div>
</div>
```

!!! example "Пример"

    <div x-data="{ title: '<h1>Начало</h1>' }" class="demo">
        <div x-html="title"></div>
    </div>

Теперь Alpine задаст текстовое содержимое `<div>` элементом `<h1>Начало</h1>`. При изменении `title` будет изменяться и содержимое `<h1>`.

!!! warning "Предупреждение"

    Использовать только на доверенном контенте и никогда на контенте, предоставленном пользователем.

!!! danger "Осторожно!"

    Динамический рендеринг HTML из сторонних источников может легко привести к появлению XSS-уязвимостей.

[→ Подробнее о `x-html`](../directives/html.md)

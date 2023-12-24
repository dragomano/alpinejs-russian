---
title: Anchor
description: Привязка позиционирования элемента к другому элементу на странице.
---

# Плагин Anchor

![](https://alpinejs.dev/social_anchor.jpg)

Плагин Anchor позволяет легко привязать позиционирование элемента к другому элементу на странице.

Эта функциональность полезна при создании в Alpine выпадающих меню, всплывающих окон, диалоговых окон и всплывающих подсказок.

Функциональность «привязки», используемая в этом плагине, предоставляется проектом [Floating UI](https://floating-ui.com/).

<a name="installation"></a>

## Установка

Вы можете использовать этот плагин, включив его из тега `<script>` или установив через NPM:

### Через CDN

Вы можете подключить CDN-сборку этого плагина с помощью тега `<script>`, только подключать нужно ДО основного JS-файла Alpine.

```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/anchor@3/dist/cdn.min.js"></script>

<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js"></script>
```

### Через NPM

Вы можете установить Anchor из NPM для использования внутри вашей сборки следующим образом:

```shell
npm install @alpinejs/anchor
```

Затем инициализируйте его в своей сборке:

```js
import Alpine from 'alpinejs';
import anchor from '@alpinejs/anchor';

Alpine.plugin(anchor);
Alpine.start();
```

<a name="x-anchor"></a>

## x-anchor

Основным API для использования этого плагина является директива `x-anchor`.

Чтобы использовать этот плагин, добавьте директиву `x-anchor` к любому элементу и передайте ему ссылку на элемент, к которому вы хотите привязать его позицию (часто это кнопка на странице).

По умолчанию `x-anchor` устанавливает CSS элемента в значение `position: absolute` и соответствующие значения `top` и `left`. Если привязанный элемент обычно отображается под ссылочным элементом, но на странице не хватает места, его стилизация будет скорректирована таким образом, чтобы он отображался над этим элементом.

Например, вот простой выпадающий список, привязанный к кнопке, которая его переключает:

```html
<div x-data="{ open: false }">
  <button x-ref="button" @click="open = !open">Переключить</button>

  <div x-show="open" x-anchor="$refs.button">Содержимое</div>
</div>
```

!!! example "Пример"

    <div x-data="{ open: false }" class="demo overflow-hidden">
        <div class="flex justify-center">
            <button class="md-button md-button--primary" x-ref="button" x-on:click="open = !open">Переключить</button>
        </div>
        <div x-show="open" x-anchor="$refs.button" class="bg-white rounded p-4 border shadow z-10">
            Содержимое
        </div>
    </div>

<a name="positioning"></a>

## Позиционирование

`x-anchor` позволяет настраивать позиционирование закрепленного элемента с помощью следующих модификаторов:

- Снизу: `.bottom`, `.bottom-start`, `.bottom-end`
- Сверху: `.top`, `.top-start`, `.top-end`
- Слева: `.left`, `.left-start`, `.left-end`
- Справа: `.right`, `.right-start`, `.right-end`

Приведем пример использования `.bottom-start` для размещения выпадающего элемента ниже и правее элемента ссылки:

```html
<div x-data="{ open: false }">
  <button x-ref="button" @click="open = !open">Переключить</button>

  <div x-show="open" x-anchor.bottom-start="$refs.button">Содержимое</div>
</div>
```

!!! example "Пример"

    <div x-data="{ open: false }" class="demo overflow-hidden">
        <div class="flex justify-center">
            <button class="md-button md-button--primary" x-ref="button" x-on:click="open = !open">Переключить</button>
        </div>
        <div x-show="open" x-anchor.bottom-start="$refs.button" class="bg-white rounded p-4 border shadow z-10">
            Содержимое
        </div>
    </div>

<a name="offset"></a>

## Смещение

Вы можете добавить смещение к привязанному элементу с помощью модификатора `.offset.[px value]` следующим образом:

```html
<div x-data="{ open: false }">
  <button x-ref="button" @click="open = !open">Переключить</button>

  <div x-show="open" x-anchor.offset.10="$refs.button">Содержимое</div>
</div>
```

!!! example "Пример"

    <div x-data="{ open: false }" class="demo overflow-hidden">
        <div class="flex justify-center">
            <button class="md-button md-button--primary" x-ref="button" x-on:click="open = !open">Переключить</button>
        </div>
        <div x-show="open" x-anchor.offset.10="$refs.button" class="bg-white rounded p-4 border shadow z-10">
            Содержимое
        </div>
    </div>

<a name="manual-styling"></a>

## Ручная стилизация

По умолчанию `x-anchor` применяет стили позиционирования к вашему элементу под капотом. Если вы предпочитаете полный контроль над стилем, вы можете передать модификатор `.no-style` и использовать магию `$anchor` для доступа к значениям внутри другого выражения Alpine.

Ниже приведен пример обхода внутренней стилизации `x-anchor` и применения стилей самостоятельно с помощью `x-bind:style`:

```html
<div x-data="{ open: false }">
  <button x-ref="button" @click="open = !open">Переключить</button>

  <div
    x-show="open"
    x-anchor.no-style="$refs.button"
    x-bind:style="{ position: 'absolute', top: $anchor.y+'px', left: $anchor.x+'px' }"
  >
    Содержимое
  </div>
</div>
```

!!! example "Пример"

    <div x-data="{ open: false }" class="demo overflow-hidden">
        <div class="flex justify-center">
            <button class="md-button md-button--primary" x-ref="button" x-on:click="open = !open">Переключить</button>
        </div>
        <div
            x-show="open"
            x-anchor.no-style="$refs.button"
            x-bind:style="{ position: 'absolute', top: $anchor.y+'px', left: $anchor.x+'px' }"
            class="bg-white rounded p-4 border shadow z-10"
        >
            Содержимое
        </div>
    </div>

<a name="from-id"></a>

## Привязка к идентификатору

До сих пор все примеры были связаны с привязкой к другим элементам с помощью refs Alpine.

Поскольку `x-anchor` принимает ссылку на любой элемент DOM, вы можете использовать утилиты типа `document.getElementById()` для привязки к элементу по его атрибуту `id`:

```html
<div x-data="{ open: false }">
  <button id="trigger" @click="open = !open">Переключить</button>

  <div x-show="open" x-anchor="document.getElementById('#trigger')">Содержимое</div>
</div>
```

!!! example "Пример"

    <div x-data="{ open: false }" class="demo overflow-hidden">
        <div class="flex justify-center">
            <button class="trigger md-button md-button--primary" x-on:click="open = !open">Переключить</button>
        </div>
        <div x-show="open" x-anchor="document.querySelector('.trigger')">
            Содержимое
        </div>
    </div>

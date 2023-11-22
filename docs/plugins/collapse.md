---
title: Collapse
description: Свертывание и разворачивание элементов с надежной анимацией
---

# Плагин Collapse

![](https://alpinejs.dev/social_collapse.jpg)

Плагин Collapse позволяет разворачивать и сворачивать элементы с помощью плавной анимации.

Поскольку такое поведение и реализация отличаются от стандартной системы переходов Alpine, эта функциональность была выделена в специальный плагин.

<a name="installation"></a>

## Установка

Вы можете использовать этот плагин, включив его из тега `<script>` или установив через NPM:

### Через CDN

Вы можете подключить CDN-сборку этого плагина с помощью тега `<script>`, только подключать нужно ДО основного JS-файла Alpine.

```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/collapse@3.x.x/dist/cdn.min.js"></script>

<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### Через NPM

Вы можете установить Collapse из NPM для использования внутри вашей сборки следующим образом:

```shell
npm install @alpinejs/collapse
```

Затем инициализируйте его в своей сборке:

```js
import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'

Alpine.plugin(collapse)

...
```

<a name="x-collapse"></a>

## x-collapse

Основным API для использования этого плагина является директива `x-collapse`.

`x-collapse` может существовать только в элементе, у которого уже есть директива `x-show`. При добавлении к элементу `x-show`, `x-collapse` будет плавно «сворачивать» и «расширять» элемент, когда его видимость переключается путем анимации его свойства высоты.

Например:

```html
<div x-data="{ expanded: false }">
  <button @click="expanded = !expanded">Переключить содержимое</button>

  <p x-show="expanded" x-collapse>...</p>
</div>
```

!!! example "Пример"

    <div x-data="{ expanded: false }" class="demo">
        <button class="md-button md-button--primary" x-on:click="expanded = !expanded">Переключить содержимое</button>
        <div x-show="expanded" x-collapse>
            <div class="pt-4">
                Reprehenderit eu excepteur ullamco esse cillum reprehenderit exercitation labore non. Dolore dolore ea dolore veniam sint in sint ex Lorem ipsum. Sint laborum deserunt deserunt amet voluptate cillum deserunt. Amet nisi pariatur sit ut id. Ipsum est minim est commodo id dolor sint id quis sint Lorem.
            </div>
        </div>
    </div>

<a name="modifiers"></a>

## Модификаторы

<a name="dot-duration"></a>

### .duration

Вы можете настроить продолжительность перехода свёртывания/развёртывания, добавив модификатор `.duration`:

```html
<div x-data="{ expanded: false }">
  <button @click="expanded = !expanded">Переключить содержимое</button>

  <p x-show="expanded" x-collapse.duration.3000ms>...</p>
</div>
```

!!! example "Пример"

    <div x-data="{ expanded: false }" class="demo">
        <button class="md-button md-button--primary" x-on:click="expanded = !expanded">Переключить содержимое</button>
        <div x-show="expanded" x-collapse.duration.3000ms>
            <div class="pt-4">
                Reprehenderit eu excepteur ullamco esse cillum reprehenderit exercitation labore non. Dolore dolore ea dolore veniam sint in sint ex Lorem ipsum. Sint laborum deserunt deserunt amet voluptate cillum deserunt. Amet nisi pariatur sit ut id. Ipsum est minim est commodo id dolor sint id quis sint Lorem.
            </div>
        </div>
    </div>

<a name="dot-min"></a>

### .min

По умолчанию «свёрнутое» состояние `x-collapse` устанавливает высоту элемента равным `0px`, а также устанавливает `display: none;`.

Иногда полезно «отрезать» элемент, а не полностью его скрывать. Используя модификатор `.min`, вы можете установить минимальную высоту для «свёрнутого» состояния `x-collapse` Например:

```html
<div x-data="{ expanded: false }">
  <button @click="expanded = !expanded">Переключить содержимое</button>

  <p x-show="expanded" x-collapse.min.50px>...</p>
</div>
```

!!! example "Пример"

    <div x-data="{ expanded: false }" class="demo">
        <button class="md-button md-button--primary" x-on:click="expanded = !expanded">Переключить содержимое</button>
        <div x-show="expanded" x-collapse.min.50px>
            <div class="pt-4">
                Reprehenderit eu excepteur ullamco esse cillum reprehenderit exercitation labore non. Dolore dolore ea dolore veniam sint in sint ex Lorem ipsum. Sint laborum deserunt deserunt amet voluptate cillum deserunt. Amet nisi pariatur sit ut id. Ipsum est minim est commodo id dolor sint id quis sint Lorem.
            </div>
        </div>
    </div>

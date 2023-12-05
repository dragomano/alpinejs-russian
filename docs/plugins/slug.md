---
title: Slug
description: Преобразуем строки в слаги с помощью AlpineJS и Slugify
---

# Плагин Slug

Плагин Slug облегчит вам задачу создания красивых адресов из заданных строк.

!!! note "Примечание"

    Этот плагин не является официальным и включён в эту документацию переводчиком.

<a name="installation"></a>

## Установка

Вы можете использовать этот плагин, включив его из тега `<script>` или установив через NPM:

### Через CDN

Вы можете подключить CDN-сборку этого плагина с помощью тега `<script>`, только подключать нужно ДО основного JS-файла Alpine.

```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs-slug@1.1.2/dist/slug.min.js"></script>

<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### Через NPM

Вы можете установить Slug из NPM для использования внутри вашей сборки следующим образом:

```shell
npm install @alpinejs/focus
```

Затем инициализируйте его в своей сборке:

```js
import Alpine from 'alpinejs'
import slug from 'alpinejs-slug';

Alpine.plugin(slug)
Alpine.start();
```

## Модификаторы

<a name="keep-case"></a>

### keep-case

Модификатор `keep-case` позволяет сохранять регистр слов в строке после преобразования в слаг.

Значение по умолчанию: `false`

```html
<div x-data="{ title: 'Привет Мир' }">
  <input type="text" x-model="title" />

  <input type="text" x-slug.keep-case="title" />
</div>
```

!!! example "Пример"

    <div x-data="{ title: 'Привет Мир' }" class="demo">
        <div>
            <input type="text" x-model="title" />
        </div>
        <div>
            <input type="text" x-slug.keep-case="title" />
        </div>
    </div>

<a name="replacement"></a>

### replacement

Модификатор `replacement` отвечает за символ замены пробела.

Значение по умолчанию: `-`

```html
<div x-data="{ title: 'Привет Мир' }">
  <input type="text" x-model="title" />
  <p x-slug.replacement._="title"></p>
</div>
```

!!! example "Пример"

    <div x-data="{ title: 'Привет Мир' }" class="demo">
        <div>
            <input type="text" x-model="title" />
        </div>
        <div>
            <p x-slug.replacement._="title"></p>
        </div>
    </div>

<a name="not-strict"></a>

### not-strict

Модификатор `not-strict` позволяет включить нестрогое преобразование. Например, при строгом преобразовании такие символы, как восклицательный знак, исчезают, а при нестрогом, наоборот, остаются.

Значение по умолчанию: `false`

```html
<div x-data="{ title: 'Привет Мир!' }">
  <input type="text" x-model="title" />
  <p x-slug.not-strict="title"></p>
</div>
```

!!! example "Пример"

    <div x-data="{ title: 'Привет Мир!' }" class="demo">
        <div>
            <input type="text" x-model="title" />
        </div>
        <div>
            <p x-slug.not-strict="title"></p>
        </div>
    </div>

<a name="untrimmed"></a>

### untrimmed

По умолчанию любые пробелы вокруг преобразуемой строки просто исчезают. А при добавлении этого модификатора — заменяются на символ, указанный модификатором `replacement`.

Значение по умолчанию: `false`

```html
<div x-data="{ title: ' Привет Мир ' }">
  <input type="text" x-model="title" />
  <p x-slug.untrimmed="title"></p>
  <p x-slug.untrimmed.replacement._="title"></p>
</div>
```

!!! example "Пример"

    <div x-data="{ title: ' Привет Мир ' }" class="demo">
        <div>
            <input type="text" x-model="title" />
        </div>
        <div>
            <p x-slug.untrimmed="title"></p>
        </div>
        <div>
            <p x-slug.untrimmed.replacement._="title"></p>
        </div>
    </div>

<a name="locale"></a>

### locale

Вы можете задать преобразование конкретных символов в зависимости от локали. Текущий список поддерживаемых локалей и символов [доступен по ссылке](https://github.com/simov/slugify/blob/master/config/locales.json).

Значение по умолчанию: `{}`

```html
<div x-data="{ title: 'Alpine JS! ♥' }">
  <input type="text" x-model="title" />
  <p x-slug="title"></p>
  <p x-slug.locale.de="title"></p>
</div>
```

!!! example "Пример"

    <div x-data="{ title: 'Alpine JS! ♥' }" class="demo">
        <div>
            <input type="text" x-model="title" />
        </div>
        <div>
            <p x-slug="title"></p>
        </div>
        <div>
            <p x-slug.locale.de="title"></p>
        </div>
    </div>

<a name="lazy"></a>

### lazy

Предотвращает изменение входного значения `x-slug` при загрузке страницы. Он будет меняться только при изменении входного `x-slug`, на который нацелен запрос.

Значение по умолчанию: `false`

```html
<div x-data="{ title: 'Привет Мир!' }">
  <input type="text" x-model="title" />
  <p x-slug.lazy="title"></p>
</div>
```

!!! example "Пример"

    <div x-data="{ title: 'Привет Мир!' }" class="demo">
        <div>
            <input type="text" x-model="title" />
        </div>
        <div>
            <p x-slug.lazy="title"></p>
        </div>
    </div>

---
description: Отправка шаблонов Alpine в другие части DOM
graph_image: https://alpinejs.dev/social_teleport.jpg
---

# x-teleport

Директива `x-teleport` позволяет перенести часть шаблона Alpine в другую часть DOM на странице целиком.

Это полезно для таких вещей, как модальные окна (особенно вложенные), где полезно выйти за пределы _z-индекса_ текущего компонента Alpine.

<a name="x-teleport"></a>

## x-teleport

Присоединяя `x-teleport` к элементу `<template>`, вы указываете Alpine «добавить» этот элемент к предоставленному селектору.

!!! tip "Совет"

    Селектор `x-teleport` может быть любой строкой, которую вы обычно передаете во что-то вроде `document.querySelector`. Он найдет первый подходящий элемент, будь то имя тега (`body`), имя класса (`.my-class`), ID (`#my-id`) или любой другой допустимый CSS-селектор.

[→ Подробнее о `document.querySelector`](https://developer.mozilla.org/ru/docs/Web/API/Document/querySelector)

Приведем надуманный модальный пример:

```html
<body>
  <div x-data="{ open: false }">
    <button @click="open = !open">Переключить содержимое</button>

    <template x-teleport="body">
      <div x-show="open">Содержимое...</div>
    </template>
  </div>

  <div>Некоторое другое содержимое, размещенное после модальной разметки.</div>

  ...
</body>
```

!!! example "Пример"

    <div class="demo" x-ref="root" id="modal2">
        <div x-data="{ open: false }">
            <button class="md-button md-button--primary" x-on:click="open = !open">Переключить содержимое</button>
            <template x-teleport="#modal2">
                <div x-show="open">
                    Содержимое...
                </div>
            </template>
        </div>
        <div class="py-4">Некоторое другое содержимое, размещенное после модальной разметки.</div>
    </div>

Обратите внимание, что при переключении модала его фактическое содержимое появляется после элемента «Некоторое другое содержимое...»? Это связано с тем, что при инициализации Alpine видит `x-teleport="body"`, добавляет и инициализирует этот элемент к предоставленному селектору элементов.

<a name="forwarding-events"></a>

## Переадресация событий

Alpine изо всех сил старается сделать процесс телепортации максимально комфортным. Все, что вы обычно делаете в шаблоне, вы сможете сделать внутри шаблона `x-teleport`. Телепортированный контент может получить доступ к обычной области действия компонента Alpine, а также к другим функциям, таким как `$refs`, `$root` и т. д.

Однако собственные события DOM не имеют понятия телепортации, поэтому, если, например, вы запускаете событие «щелчок» внутри телепортированного элемента, это событие всплывет в дереве DOM, как это обычно происходит.

Чтобы сделать этот процесс более плавным, вы можете «пересылать» события, просто зарегистрировав прослушиватели событий в самом элементе `<template x-teleport...>` следующим образом:

```html
<div x-data="{ open: false }">
  <button @click="open = !open">Переключить содержимое</button>

  <template x-teleport="body" @click="open = false">
    <div x-show="open">Содержимое... (нажмите чтобы закрыть)</div>
  </template>
</div>
```

!!! example "Пример"

    <div class="demo" x-ref="root" id="modal3">
        <div x-data="{ open: false }">
            <button class="md-button md-button--primary" x-on:click="open = !open">Переключить содержимое</button>
            <template x-teleport="#modal3" x-on:click="open = false">
                <div x-show="open">
                    Содержимое...
                    <div>(нажмите чтобы закрыть)</div>
                </div>
            </template>
        </div>
    </div>

Заметили, что теперь мы можем прослушивать события, отправляемые изнутри телепортированного элемента, находясь вне самого элемента `<template>`?

Alpine делает это путем поиска прослушивателей событий, зарегистрированных в `<template x-teleport...>`, и останавливает распространение этих событий за пределы живого, телепортированного элемента DOM. Затем он создает копию этого события и повторно отправляет её из `<template x-teleport...>`.

<a name="nesting"></a>

## Вложенное содержимое

Телепортация особенно полезна, если вы пытаетесь вложить одно модальное окно в другое. Alpine упрощает это:

```html
<div x-data="{ open: false }">
  <button @click="open = !open">Переключить содержимое</button>

  <template x-teleport="body">
    <div x-show="open">
      Содержимое...

      <div x-data="{ open: false }">
        <button @click="open = !open">Переключить вложенное содержимое</button>

        <template x-teleport="body">
          <div x-show="open">Вложенное содержимое...</div>
        </template>
      </div>
    </div>
  </template>
</div>
```

!!! example "Пример"

    <div class="demo" x-ref="root" id="modal4">
        <div x-data="{ open: false }">
            <button class="md-button md-button--primary" x-on:click="open = !open">Переключить содержимое</button>
            <template x-teleport="#modal4">
                <div x-show="open">
                    <div class="py-4">Содержимое...</div>
                    <div x-data="{ open: false }">
                        <button class="md-button" x-on:click="open = !open">Переключить вложенное содержимое</button>
                        <template x-teleport="#modal4">
                            <div class="pt-4" x-show="open">
                                Вложенное содержимое...
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </div>
        <template x-teleport-target="modals3"></template>
    </div>

После включения обоих модальных окон они создаются как дочерние, но будут отображаться на странице как родственные элементы, а не друг в друге.

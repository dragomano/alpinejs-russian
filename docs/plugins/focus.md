---
title: Focus
description: Удобное управление фокусом в пределах страницы
---

# Плагин Focus

![](https://alpinejs.dev/social_focus.jpg)

Плагин Focus позволяет управлять фокусом на странице.

!!! info "К сведению"

    Ранее этот плагин назывался «Trap». Функциональность Trap вошла в этот плагин вместе с дополнительной функциональностью. Вы можете поменять Trap на Focus без каких-либо изменений.

!!! note "Примечание"

    В этом плагине активно используется инструмент с открытым исходным кодом: [Tabbable](https://github.com/focus-trap/tabbable). Большое спасибо этой команде за столь необходимое решение этой проблемы.

<a name="installation"></a>

## Установка

Вы можете использовать этот плагин, включив его из тега `<script>` или установив через NPM:

### Через CDN

Вы можете подключить CDN-сборку этого плагина с помощью тега `<script>`, только подключать нужно ДО основного JS-файла Alpine.

```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/focus@3/dist/cdn.min.js"></script>

<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js"></script>
```

### Через NPM

Вы можете установить Focus из NPM для использования внутри вашей сборки следующим образом:

```shell
npm install @alpinejs/focus
```

Затем инициализируйте его в своей сборке:

```js
import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';

Alpine.plugin(focus);
Alpine.start();
```

<a name="x-trap"></a>

## x-trap

Focus предлагает специальный API для захвата фокуса внутри элемента: директива `x-trap`.

`x-trap` принимает выражение в формате JS. Если результат этого выражения равен true, то фокус будет удерживаться внутри этого элемента до тех пор, пока выражение не станет false, после чего фокус будет возвращен туда, где он находился ранее.

Например:

```html
<div x-data="{ open: false }">
  <button @click="open = true">Открыть диалог</button>

  <span x-show="open" x-trap="open">
    <p>...</p>

    <input type="text" placeholder="Какой-то ввод..." />

    <input type="text" placeholder="Ещё один ввод..." />

    <button @click="open = false">Закрыть диалог</button>
  </span>
</div>
```

!!! example "Пример"

    <div x-data="{ open: false }" class="demo">
        <div :class="open && 'opacity-50'">
            <button class="md-button md-button--primary" x-on:click="open = true">Открыть диалог</button>
        </div>
        <div x-show="open" x-trap="open" class="mt-4 space-y-4 p-4 border bg-yellow-100" x-on:keyup.escape.window="open = false">
            <strong>
                <div>Фокус теперь «заперт» внутри этого диалогового окна, то есть вы можете щёлкать/фокусировать элементы только внутри этого диалогового окна. Если вы нажмете Tab несколько раз, фокус останется в этом диалоговом окне.</div>
            </strong>
            <div>
                <input type="text" placeholder="Какой-то ввод...">
            </div>
            <div>
                <input type="text" placeholder="Ещё один ввод...">
            </div>
            <div>
                <button class="md-button" x-on:click="open = false">Закрыть диалог</button>
            </div>
        </div>
    </div>

<a name="nesting"></a>

### Вложение диалогов

Иногда возникает необходимость вложить один диалог в другой. `x-trap` делает это тривиальным и обрабатывает автоматически.

`x-trap` ведет учет новых «пойманных» элементов и сохраняет последний активно сфокусированный элемент. После того, как элемент будет «отловлен», фокус будет возвращён в исходное положение.

Этот механизм является рекурсивным, поэтому можно бесконечно долго удерживать фокус внутри уже захваченного элемента, а затем «разворачивать» каждый элемент последовательно.

Вот вложение в действии:

```html
<div x-data="{ open: false }">
  <button @click="open = true">Открыть диалог</button>

  <span x-show="open" x-trap="open">
    ...

    <div x-data="{ open: false }">
      <button @click="open = true">Открыть вложенный диалог</button>

      <span x-show="open" x-trap="open">
        ...

        <button @click="open = false">Закрыть вложенный диалог</button>
      </span>
    </div>

    <button @click="open = false">Закрыть диалог</button>
  </span>
</div>
```

!!! example "Пример"

    <div x-data="{ open: false }" class="demo">
        <div :class="open && 'opacity-50'">
            <button class="md-button md-button--primary" x-on:click="open = true">Открыть диалог</button>
        </div>
        <div x-show="open" x-trap="open" class="mt-4 space-y-4 p-4 border bg-yellow-100" x-on:keyup.escape.window="open = false">
            <div>
                <input type="text" placeholder="Какой-то ввод...">
            </div>
            <div>
                <input type="text" placeholder="Ещё один ввод...">
            </div>
            <div x-data="{ open: false }">
                <div :class="open && 'opacity-50'">
                    <button class="md-button" x-on:click="open = true">Открыть вложенный диалог</button>
                </div>
                <div x-show="open" x-trap="open" class="mt-4 space-y-4 p-4 border border-gray-500 bg-yellow-200" x-on:keyup.escape.window="open = false">
                    <strong>
                        <div>Фокус теперь «заперт» внутри этого вложенного диалога. Вы не можете сфокусировать что-либо внутри внешнего диалога, пока он открыт. Если вы закроете это диалоговое окно, фокус будет возвращён последнему известному активному элементу.</div>
                    </strong>
                    <div>
                        <input type="text" placeholder="Какой-то ввод...">
                    </div>
                    <div>
                        <input type="text" placeholder="Ещё один ввод...">
                    </div>
                    <div>
                        <button class="md-button" x-on:click="open = false">Закрыть вложенный диалог</button>
                    </div>
                </div>
            </div>
            <div>
                <button class="md-button md-button--primary" x-on:click="open = false">Закрыть диалог</button>
            </div>
        </div>
    </div>

<a name="modifiers"></a>

### Модификаторы

<a name="inert"></a>

#### .inert

При создании таких вещей, как диалоговые окна/модальные окна, рекомендуется скрывать все остальные элементы на странице от программ чтения с экрана при захвате фокуса.

Если добавить `.inert` к `x-trap`, то при перехвате фокуса все остальные элементы на странице получат атрибуты `aria-hidden="true"`, а при отключении перехвата фокуса эти атрибуты также будут удалены.

```html
<!-- Когда `open` равен `false`: -->
<body x-data="{ open: false }">
  <div x-trap.inert="open" ...>...</div>

  <div>...</div>
</body>

<!-- Когда `open` равен `true`: -->
<body x-data="{ open: true }">
  <div x-trap.inert="open" ...>...</div>

  <div aria-hidden="true">...</div>
</body>
```

<a name="noscroll"></a>

#### .noscroll

При построении диалогов/модалов с помощью Alpine рекомендуется отключать прокрутку окружающего содержимого, когда диалог открыт.

`x-trap` позволяет делать это автоматически с помощью модификаторов `.noscroll`.

Добавив `.noscroll`, Alpine уберет со страницы полосу прокрутки и запретит пользователям прокручивать страницу вниз, пока открыт диалог.

Например:

```html
<div x-data="{ open: false }">
  <button>Открыть диалог</button>

  <div x-show="open" x-trap.noscroll="open">
    Содержимое

    <button @click="open = false">Закрыть диалог</button>
  </div>
</div>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ open: false }">
            <button class="md-button md-button--primary" x-on:click="open = true">Открыть диалог</button>
            <div x-show="open" x-trap.noscroll="open" class="border mt-4 p-4">
                <div class="mb-4 text-bold">Содержимое</div>
                <p class="mb-4 text-gray-600 text-sm">Обратите внимание, что при открытом диалоговом окне прокрутка на этой странице больше не производится.</p>
                <button class="md-button" x-on:click="open = false">Закрыть диалог</button>
            </div>
        </div>
    </div>

<a name="noreturn"></a>

#### .noreturn

Иногда не требуется возвращать фокус на прежнее место. Рассмотрим выпадающий список, который срабатывает при фокусировке на вводе, возврат фокуса на ввод при закрытии просто вызовет повторное открытие выпадающего списка.

`x-trap` позволяет отключить это поведение с помощью модификатора `.noreturn`.

Добавив `.noreturn`, Alpine не будет возвращать фокус при оценке x-trap на false.

Например:

```html
<div x-data="{ open: false }" x-trap.noreturn="open">
  <input type="search" placeholder="найти что-нибудь" />

  <div x-show="open">
    Результаты поиска

    <button @click="open = false">Закрыть</button>
  </div>
</div>
```

!!! example "Пример"

    <div class="demo">
        <div
            x-data="{ open: false }"
            x-trap.noreturn="open"
            x-on:click.outside="open = false"
            x-on:keyup.escape.prevent.stop="open = false"
        >
            <input type="search" placeholder="найти что-нибудь"
                x-on:focus="open = true"
                x-on:keyup.escape.prevent="$el.blur()"
            />
            <div x-show="open">
                <div class="mb-4 text-bold">Результаты поиска</div>
                <p class="mb-4 text-gray-600 text-sm">Обратите внимание, что при закрытии этого выпадающего списка фокус не возвращается на вход.</p>
                <button class="md-button" x-on:click="open = false">Закрыть диалог</button>
            </div>
        </div>
    </div>

<a name="noautofocus"></a>

#### .noautofocus

По умолчанию, когда `x-trap` отлавливает фокус внутри элемента, он фокусируется на первом фокусируемом элементе внутри этого элемента. Это разумное значение по умолчанию, однако в некоторых случаях вы можете захотеть отключить это поведение и не фокусировать автоматически элементы при срабатывании `x-trap`.

Добавив `.noautofocus`, Alpine не будет автоматически фокусировать элементы при захвате фокуса.

<a name="focus-magic"></a>

## $focus

Этот плагин предлагает множество небольших утилит для управления фокусом на странице. Эти утилиты доступны с помощью магии `$focus`.

| Метод           | Описание                                                                                                                                            |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `focus(el)`     | Фокусировка переданного элемента (внутренняя обработка раздражителей): использование nextTick и т. д.                                               |
| `focusable(el)` | Определить, является ли элемент фокусируемым                                                                                                        |
| `focusables()`  | Получить все «фокусируемые» элементы в пределах текущего элемента                                                                                   |
| `focused()`     | Получение текущего сфокусированного элемента на странице                                                                                            |
| `lastFocused()` | Получение последнего сфокусированного элемента на странице                                                                                          |
| `within(el)`    | Укажите элемент, на который следует распространить магию `$focus` (по умолчанию это текущий элемент)                                                |
| `first()`       | Фокусировка первого фокусируемого элемента                                                                                                          |
| `last()`        | Фокусировка последнего фокусируемого элемента                                                                                                       |
| `next()`        | Фокусировка следующего фокусируемого элемента                                                                                                       |
| `previous()`    | Фокусировка предыдущего фокусируемого элемента                                                                                                      |
| `noscroll()`    | Предотвращение прокрутки к элементу, на котором будет сосредоточена фокусировка                                                                     |
| `wrap()`        | При получении «next» или «previous» используйте «wrap around» (например, возврат первого элемента, если получен «next» элемент последнего элемента) |
| `getFirst()`    | Получение первого фокусируемого элемента                                                                                                            |
| `getLast()`     | Получение последнего фокусируемого элемента                                                                                                         |
| `getNext()`     | Получение следующего фокусируемого элемента                                                                                                         |
| `getPrevious()` | Получение предыдущего фокусируемого элемента                                                                                                        |

Рассмотрим несколько примеров использования этих утилит. Приведенный ниже пример позволяет пользователю управлять фокусом внутри группы кнопок с помощью клавиш со стрелками. Это можно проверить, щелкнув на кнопке, а затем используя клавиши со стрелками для перемещения фокуса:

```html
<div @keydown.right="$focus.next()" @keydown.left="$focus.previous()">
  <button>Первая</button>
  <button>Вторая</button>
  <button>Третья</button>
</div>
```

!!! example "Пример"

    <div class="demo">
        <div
            x-data
            x-on:keydown.right="$focus.next()"
            x-on:keydown.left="$focus.previous()"
        >
            <button class="md-button">Первая</button>
            <button class="md-button">Вторая</button>
            <button class="md-button">Третья</button>
        </div>
        (Щёлкните на кнопке, затем используйте клавиши со стрелками для перемещения влево и вправо)
    </div>

Обратите внимание, что при фокусировке последней кнопки, нажатие «стрелки вправо» ничего не сделает. Добавим метод `.wrap()`, чтобы фокус «оборачивался»:

```html
<div @keydown.right="$focus.wrap().next()" @keydown.left="$focus.wrap().previous()">
  <button>Первая</button>
  <button>Вторая</button>
  <button>Третья</button>
</div>
```

!!! example "Пример"

    <div class="demo">
        <div
            x-data
            x-on:keydown.right="$focus.wrap().next()"
            x-on:keydown.left="$focus.wrap().previous()"
        >
            <button class="md-button">Первая</button>
            <button class="md-button">Вторая</button>
            <button class="md-button">Третья</button>
        </div>
        (Щёлкните на кнопке, затем используйте клавиши со стрелками для перемещения влево и вправо)
    </div>

Теперь добавим две кнопки, одна из которых будет фокусироваться на первом элементе группы кнопок, а другая - на последнем:

```html
<button @click="$focus.within($refs.buttons).first()">Передать фокус «первому» элементу</button>
<button @click="$focus.within($refs.buttons).last()">Передать фокус «последнему» элементу</button>

<div x-ref="buttons" @keydown.right="$focus.wrap().next()" @keydown.left="$focus.wrap().previous()">
  <button>Первая</button>
  <button>Вторая</button>
  <button>Третья</button>
</div>
```

!!! example "Пример"

    <div class="demo" x-data>
        <input type="button" x-on:click="$focus.within($refs.buttons).first()" value="Передать фокус «первому» элементу">
        <input type="button" x-on:click="$focus.within($refs.buttons).last()" value="Передать фокус «последнему» элементу">
        <hr class="mt-2 mb-2"/>
        <div
            x-ref="buttons"
            x-on:keydown.right="$focus.wrap().next()"
            x-on:keydown.left="$focus.wrap().previous()"
        >
            <button class="md-button">Первая</button>
            <button class="md-button">Вторая</button>
            <button class="md-button">Третья</button>
        </div>
    </div>

Обратите внимание, что для каждой кнопки необходимо добавить метод `.within()`, чтобы `$focus` знал, что нужно обращаться к другому элементу (`div`, оборачивающему кнопки).

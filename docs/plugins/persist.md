---
order: 2
title: Persist
description: Удобное сохранение данных при загрузке страницы с помощью localStorage
---

# Плагин Persist

![](https://alpinejs.dev/social_persist.jpg)

Плагин Persist позволяет сохранять состояние Alpine при разных загрузках страницы.

Это полезно для сохранения фильтров поиска, активных вкладок и других функций, когда пользователи будут разочарованы, если их конфигурация будет сброшена после обновления или ухода и повторного посещения страницы.

<a name="installation"></a>

## Установка

Вы можете использовать этот плагин, включив его из тега `<script>` или установив через NPM:

### Через CDN

Вы можете подключить CDN-сборку этого плагина с помощью тега `<script>`, только подключать нужно ДО основного JS-файла Alpine.

```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/persist@3.x.x/dist/cdn.min.js"></script>

<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### Через NPM

Вы можете установить Persist из NPM для использования внутри вашей сборки следующим образом:

```shell
npm install @alpinejs/persist
```

Затем инициализируйте его в своей сборке:

```js
import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'

Alpine.plugin(persist)

...
```

<a name="magic-persist"></a>

## $persist

Основным API для использования этого плагина является магический метод `$persist`.

Вы можете обернуть любое значение внутри `x-data` с помощью `$persist`, как показано ниже, чтобы сохранить его значение при загрузке страницы:

```html
<div x-data="{ count: $persist(0) }">
  <button x-on:click="count++">Увеличить</button>

  <span x-text="count"></span>
</div>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ count: $persist(0) }">
            <button class="md-button md-button--primary" x-on:click="count++">Увеличить</button>
            <span class="pr-10" x-text="count"></span>
        </div>
    </div>

В приведенном выше примере, поскольку мы обернули `0` в `$persist()`, Alpine теперь будет перехватывать изменения, внесенные в `count`, и сохранять их при всех загрузках страницы.

Вы можете попробовать сделать это самостоятельно, увеличив значение «count» в приведенном выше примере, затем обновить эту страницу и заметить, что «count» сохраняет свое состояние и не сбрасывается в «0».

<a name="how-it-works"></a>

## Как это работает?

Если значение обернуто в `$persist`, то при инициализации Alpine зарегистрирует собственный наблюдатель для этого значения. Теперь каждый раз, когда это значение по какой-либо причине будет изменяться, Alpine будет сохранять новое значение в [localStorage](https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage).

Теперь при перезагрузке страницы Alpine будет проверять localStorage (используя имя свойства в качестве ключа) на наличие значения. Если он найдет такое свойство, то сразу же установит значение свойства из localStorage.

Вы можете наблюдать это поведение, открыв средство просмотра localStorage в инструменте разработчика вашего браузера:

<a href="https://developer.chrome.com/docs/devtools/storage/localstorage/"><img src="https://alpinejs.dev/img/persist_devtools.png" alt="Инструменты разработчика Chrome, показывающие представление localStorage со счетчиком, равным 0"></a>

Вы заметите, что, просто посетив эту страницу, Alpine уже установил значение «count» в localStorage. Вы также заметите, что к имени свойства «count» добавляется префикс «_x_» как способ размещения этих значений в пространстве имен, чтобы Alpine не конфликтовал с другими инструментами, использующими localStorage.

Теперь измените «count» в следующем примере и обратите внимание на изменения, внесенные Alpine в localStorage:

```html
<div x-data="{ count: $persist(0) }">
  <button x-on:click="count++">Увеличить</button>

  <span x-text="count"></span>
</div>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ count: $persist(0) }">
            <button class="md-button md-button--primary" x-on:click="count++">Увеличить</button>
            <span x-text="count"></span>
        </div>
    </div>

!!! note "Примечание"

    `$persist` работает как с примитивными значениями, так и с массивами и объектами.

!!! tip "Совет"

    Однако стоит отметить, что при изменении типа переменной localStorage должен быть очищен.

!!! note "Примечание"

    Учитывая предыдущий пример, если мы изменим _count_ на значение `$persist({ value: 0 })`, то localStorage должен быть очищен или переменная _count_ переименована.

<a name="custom-key"></a>

## Установка пользовательского ключа

По умолчанию Alpine использует ключ свойства, которому присваивается `$persist(...)` (_count_ в приведенных выше примерах).

Рассмотрим сценарий, в котором у вас есть несколько компонентов Alpine на страницах или даже на одной странице, и все они используют «count» в качестве ключа свойства.

У Alpine не будет возможности различать эти компоненты.

В этих случаях вы можете установить свой собственный ключ для любого постоянного значения, используя модификатор `.as`, например:

```html
<div x-data="{ count: $persist(0).as('other-count') }">
  <button x-on:click="count++">Увеличить</button>

  <span x-text="count"></span>
</div>
```

Теперь Alpine сохранит и получит указанное выше значение «count», используя ключ «other-count».

Вот вид Chrome Devtools, который вы можете увидеть сами:

<img src="https://alpinejs.dev/img/persist_custom_key_devtools.png" alt="Инструменты разработчика Chrome, показывающие представление localStorage со счетчиком, равным 0">

<a name="custom-storage"></a>

## Использование пользовательского хранилища

По умолчанию данные сохраняются в localStorage, у них нет срока действия, и они сохраняются даже при закрытии страницы.

Рассмотрим сценарий, в котором требуется очистить данные после того, как пользователь закроет вкладку. В этом случае можно сохранять данные в _sessionStorage_ с помощью модификатора `.using` следующим образом:

```html
<div x-data="{ count: $persist(0).using(sessionStorage) }">
  <button x-on:click="count++">Увеличить</button>

  <span x-text="count"></span>
</div>
```

Вы также можете определить свой собственный объект хранилища, используя функции getItem и функцию setItem. Например, вы можете решить использовать сеансовый файл cookie в качестве хранилища, выполнив следующие действия:

```html
<script>
  window.cookieStorage = {
    getItem(key) {
      let cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split('=');
        if (key == cookie[0].trim()) {
          return decodeURIComponent(cookie[1]);
        }
      }
      return null;
    },
    setItem(key, value) {
      document.cookie = key + ' = ' + encodeURIComponent(value);
    },
  };
</script>

<div x-data="{ count: $persist(0).using(cookieStorage) }">
  <button x-on:click="count++">Увеличить</button>

  <span x-text="count"></span>
</div>
```

<a name="using-persist-with-alpine-data"></a>

## Использование $persist с Alpine.data

Если вы хотите использовать `$persist` с `Alpine.data`, то вам необходимо использовать стандартную функцию вместо функции-стрелки, чтобы Alpine могла связать пользовательский контекст `this` при первоначальной оценке области видимости компонента.

```js
Alpine.data('dropdown', function () {
  return {
    open: this.$persist(false),
  };
});
```

<a name="using-alpine-persist-global"></a>

## Использование глобальной функции Alpine.$persist

`Alpine.$persist` доступен глобально, поэтому его можно использовать вне контекста `x-data`. Это полезно для сохранения данных из других источников, таких как `Alpine.store`.

```js
Alpine.store('darkMode', {
  on: Alpine.$persist(true).as('darkMode_on'),
});
```

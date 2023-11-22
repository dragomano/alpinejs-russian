# $store

Вы можете использовать `$store` для удобного доступа к глобальным хранилищам Alpine, зарегистрированным с помощью [`Alpine.store(...)`](../globals/alpine-store.md). Например:

```html
<button x-data @click="$store.darkMode.toggle()">Переключить тёмный режим</button>

...

<div x-data :class="$store.darkMode.on && 'bg-black'">...</div>

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

Учитывая, что мы зарегистрировали хранилище `darkMode` и установили значение `on` в "false", при нажатии кнопки `<button>` значение `on` будет "true" и цвет фона страницы изменится на черный.

<a name="single-value-stores"></a>

## Хранилища с одним значением

Если вам не нужен целый объект для хранилища, вы можете задать и использовать в качестве хранилища любой тип данных.

Вот пример, приведенный выше, но использующий его более просто как булево значение:

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

[→ Подробнее о хранилищах Alpine](../globals/alpine-store.md)

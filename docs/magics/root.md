# $root

`$root` — это магическое свойство, которое может быть использовано для получения корневого элемента любого компонента Alpine. Другими словами, ближайший элемент в дереве DOM, содержащий `x-data`.

```html
<div x-data data-message="Привет, мир!">
  <button @click="alert($root.dataset.message)">Скажи привет</button>
</div>
```

!!! example "Пример"

    <div x-data data-message="Привет, мир!" class="demo">
        <button class="md-button md-button--primary" x-on:click="alert($root.dataset.message)">Скажи привет</button>
    </div>

# $el

`$el` — это магическое свойство, которое может быть использовано для получения текущего узла DOM.

```html
<button @click="$el.innerHTML = 'Привет, мир!'">Замени меня на «Привет, мир!»</button>
```

!!! example "Пример"

    <div class="demo">
        <div x-data>
            <button class="md-button md-button--primary" x-on:click="$el.textContent = 'Привет, мир!'">Замени меня на «Привет, мир!»</button>
        </div>
    </div>

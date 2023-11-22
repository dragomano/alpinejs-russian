# x-text

`x-text` помещает результат заданного выражения в свойство _innerText_ элемента.

Приведем базовый пример использования `x-text` для отображения имени пользователя.

```html
<div x-data="{ username: 'calebporzio' }">
  Имя пользователя: <strong x-text="username"></strong>
</div>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ username: 'calebporzio' }">
            Имя пользователя: <strong x-text="username"></strong>
        </div>
    </div>

Теперь внутреннее текстовое содержимое тега `<strong>` будет заменено на `calebporzio`.

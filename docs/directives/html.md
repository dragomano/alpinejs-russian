# x-html

`x-html` помещает результат данного выражения в свойство _innerHTML_ элемента.

!!! warning "Предупреждение"

    Используйте только для надежного контента и никогда не используйте для контента, предоставленного пользователем.

!!! danger "Осторожно!"

    Динамический рендеринг HTML от третьих сторон может легко привести к уязвимостям XSS.

Вот базовый пример использования `x-html` для отображения имени пользователя.

```html
<div x-data="{ username: '<strong>calebporzio</strong>' }">
  Имя пользователя: <span x-html="username"></span>
</div>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ username: '<strong>calebporzio</strong>' }">
            Имя пользователя: <span x-html="username"></span>
        </div>
    </div>

Теперь внутренний HTML-код тега `<span>` будет заменён на `<strong>calebporzio</strong>`.

# $data

`$data` - это магическое свойство, предоставляющее доступ к текущей области видимости данных Alpine (обычно предоставляется `x-data`).

В большинстве случаев можно просто получить доступ к данным Alpine непосредственно в выражениях. Например, `x-data="{ message: 'Hello Caleb!' }"` позволит вам делать такие вещи, как `x-text="message"`.

Однако иногда полезно иметь реальный объект, инкапсулирующий всю область видимости, который можно передавать другим функциям:

```html
<div x-data="{ greeting: 'Привет' }">
  <div x-data="{ name: 'Вася' }">
    <button @click="sayHello($data)">Скажи привет</button>
  </div>
</div>

<script>
  function sayHello({ greeting, name }) {
    alert(greeting + ' ' + name + '!');
  }
</script>
```

!!! example "Пример"

    <div x-data="{ greeting: 'Привет' }" class="demo">
        <div x-data="{ name: 'Вася' }">
            <button class="md-button md-button--primary" x-on:click="sayHello($data)">Скажи привет</button>
        </div>
    </div>

    <script>
        function sayHello({ greeting, name }) {
            alert(greeting + ', ' + name + '!')
        }
    </script>

Теперь при нажатии на кнопку браузер выдаст сообщение `Привет, Вася!`, поскольку ему был передан объект данных, содержащий всю область видимости вызвавшего его выражения (`@click="..."`).

Большинству приложений это волшебное свойство не понадобится, но оно может оказаться очень полезным для более глубоких и сложных утилит Alpine.

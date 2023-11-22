# x-modelable

`x-modelable` позволяет вам представить любое свойство Alpine как цель директивы `x-model`.

Вот простой пример использования `x-modelable` для предоставления переменной для привязки к `x-model`.

```html
<div x-data="{ number: 5 }">
  <div x-data="{ count: 0 }" x-modelable="count" x-model="number">
    <button @click="count++">Увеличить</button>
  </div>

  Число: <span x-text="number"></span>
</div>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ number: 5 }">
            <div x-data="{ count: 0 }" x-modelable="count" x-model="number">
                <button class="md-button md-button--primary" x-on:click="count++">Увеличить</button>
            </div>
            Число: <span x-text="number"></span>
        </div>
    </div>

Как вы можете видеть, свойство внешней области «number» теперь привязано к свойству внутренней области «count».

Обычно эта функция используется в сочетании с серверной платформой шаблонов, такой как Laravel Blade. Это полезно для абстрагирования компонентов Alpine в шаблоны серверной части и предоставления доступа к состоянию извне через `x-model`, как если бы это был собственный ввод.

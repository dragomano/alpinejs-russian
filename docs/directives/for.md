# x-for

Директива Alpine `x-for` позволяет создавать элементы DOM путём перебора списка. Вот простой пример его использования для создания списка цветов на основе массива.

```html
<ul x-data="{ colors: ['Красный', 'Оранжевый', 'Жёлтый'] }">
  <template x-for="color in colors">
    <li x-text="color"></li>
  </template>
</ul>
```

!!! example "Пример"

    <div class="demo">
        <ul x-data="{ colors: ['Красный', 'Оранжевый', 'Жёлтый'] }">
            <template x-for="color in colors">
                <li x-text="color"></li>
            </template>
        </ul>
    </div>

Вы также можете передавать объекты в `x-for`.

```html
<ul x-data="{ car: { make: 'Jeep', model: 'Grand Cherokee', color: 'Black' } }">
  <template x-for="(value, index) in car">
    <li><span x-text="index"></span>: <span x-text="value"></span></li>
  </template>
</ul>
```

!!! example "Пример"

    <div class="demo">
        <ul x-data="{ car: { make: 'Джип', model: 'Grand Cherokee', color: 'Чёрный' } }">
          <template x-for="(value, index) in car">
            <li><span x-text="index"></span>: <span x-text="value"></span></li>
          </template>
        </ul>
    </div>

В отношении `x-for` стоит отметить два правила:

!!! warning "Предупреждение"

    `x-for` ДОЛЖЕН быть объявлен в элементе `<template>`

!!! warning "Предупреждение"

    Этот элемент `<template>` ДОЛЖЕН содержать только один корневой элемент.

<a name="keys"></a>

## Ключи

Если вы собираетесь переупорядочивать элементы, важно указывать уникальные ключи для каждой итерации `x-for`. Без динамических ключей Alpine может быть сложно отслеживать, что переупорядочивается, и это может вызвать странные побочные эффекты.

```html
<ul
  x-data="{ colors: [
    { id: 1, label: 'Красный' },
    { id: 2, label: 'Оранжевый' },
    { id: 3, label: 'Жёлтый' },
  ]}"
>
  <template x-for="color in colors" :key="color.id">
    <li x-text="color.label"></li>
  </template>
</ul>
```

Теперь, если цвета добавляются, удаляются, переупорядочиваются или изменяются их идентификаторы, Alpine сохранит или уничтожит итерированные элементы `<li>` соответственно.

<a name="accessing-indexes"></a>

## Доступ к индексам

Если вам нужно получить доступ к индексу каждого элемента в итерации, вы можете сделать это, используя синтаксис `([item], [index]) in [items]` следующим образом:

```html
<ul x-data="{ colors: ['Красный', 'Оранжевый', 'Жёлтый'] }">
  <template x-for="(color, index) in colors">
    <li>
      <span x-text="index + ': '"></span>
      <span x-text="color"></span>
    </li>
  </template>
</ul>
```

Вы также можете получить доступ к индексу внутри динамического выражения `:key`.

```html
<template x-for="(color, index) in colors" :key="index"></template>
```

<a name="iterating-over-a-range"></a>

## Итерация по диапазону

Если вам нужно просто выполнить цикл `n` раз, а не перебирать массив, Alpine предлагает сокращённый синтаксис.

```html
<ul>
  <template x-for="i in 10">
    <li x-text="i"></li>
  </template>
</ul>
```

`i` в данном случае можно назвать как угодно.

<a name="contents-of-a-template"></a>

## Содержимое `<template>`

Как упоминалось выше, тег `<template>` должен содержать только один корневой элемент.

Например, следующий код не будет работать:

```html
<template x-for="color in colors">
    <span>Следующий цвет </span><span x-text="color">
</template>
```

но этот код будет работать:

```html
<template x-for="color in colors">
    <p>
        <span>Следующий цвет </span><span x-text="color">
    </p>
</template>
```

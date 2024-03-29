# $id

`$id` - это магическое свойство, которое можно использовать для генерации идентификатора элемента и обеспечения того, что он не будет конфликтовать с другими одноименными идентификаторами на той же странице.

Эта утилита очень полезна при создании многократно используемых компонентов (предположительно в шаблоне внутреннего интерфейса), которые могут встречаться на странице несколько раз и использовать атрибуты ID.

Такие вещи, как компоненты ввода, модалы, списки и т. д. — все выиграют от использования этой утилиты.

<a name="basic-usage"></a>

## Пример использования

Предположим, что на странице есть два элемента ввода, и вы хотите, чтобы каждый из них имел уникальный идентификатор. В этом случае можно сделать следующее:

```html
<input type="text" :id="$id('text-input')" />
<!-- id="text-input-1" -->

<input type="text" :id="$id('text-input')" />
<!-- id="text-input-2" -->
```

Как видите, `$id` принимает строку и выдает добавочный суффикс, уникальный для данной страницы.

<a name="groups-with-x-id"></a>

## Группировка по `x-id`

Теперь предположим, что вы хотите иметь те же два элемента ввода, но на этот раз для каждого из них нужны элементы `<label>`.

Это создает проблему, поскольку теперь необходимо иметь возможность дважды ссылаться на один и тот же идентификатор. Один для атрибута `<label>` `for`, а другой для `id` на входе.

Вот способ, которым вы могли бы это сделать, и он полностью действителен:

```html
<div x-data="{ id: $id('text-input') }">
    <label :for="id"> <!-- "text-input-1" -->
    <input type="text" :id="id"> <!-- "text-input-1" -->
</div>

<div x-data="{ id: $id('text-input') }">
    <label :for="id"> <!-- "text-input-2" -->
    <input type="text" :id="id"> <!-- "text-input-2" -->
</div>
```

Этот подход хорош, однако необходимость называть и хранить идентификатор в области вашего компонента кажется обременительной.

Чтобы выполнить ту же задачу более гибким способом, вы можете использовать директиву Alpine `x-id` для объявления «области идентификаторов» для набора идентификаторов:

```html
<div x-id="['text-input']">
    <label :for="$id('text-input')"> <!-- "text-input-1" -->
    <input type="text" :id="$id('text-input')"> <!-- "text-input-1" -->
</div>

<div x-id="['text-input']">
    <label :for="$id('text-input')"> <!-- "text-input-2" -->
    <input type="text" :id="$id('text-input')"> <!-- "text-input-2" -->
</div>
```

Как видите, `x-id` принимает массив идентификаторов. Теперь любое использование `$id()` в этой области будет использовать один и тот же идентификатор. Думайте о них как об «идентификаторах групп».

<a name="nesting"></a>

## Вложение

Как вы уже могли догадаться, вы можете свободно вкладывать эти группы `x-id` друг в друга, например так:

```html
<div x-id="['text-input']">
    <label :for="$id('text-input')"> <!-- "text-input-1" -->
    <input type="text" :id="$id('text-input')"> <!-- "text-input-1" -->

    <div x-id="['text-input']">
        <label :for="$id('text-input')"> <!-- "text-input-2" -->
        <input type="text" :id="$id('text-input')"> <!-- "text-input-2" -->
    </div>
</div>
```

<a name="keyed-ids"></a>

## Идентификаторы с ключами (для цикла)

Иногда полезно указать дополнительный суффикс в конце идентификатора, чтобы идентифицировать его внутри цикла.

Для этого `$id()` принимает необязательный второй параметр, который будет добавлен в качестве суффикса в конце сгенерированного идентификатора.

Типичным примером этой необходимости является что-то вроде компонента списка, который использует атрибут `aria-activedescendant`, чтобы сообщить вспомогательным технологиям, какой элемент в списке является «активным»:

```html
<ul x-id="['list-item']" :aria-activedescendant="$id('list-item', activeItem.id)">
  <template x-for="item in items" :key="item.id">
    <li :id="$id('list-item', item.id)">...</li>
  </template>
</ul>
```

Это неполный пример списка, но всё равно будет полезно продемонстрировать сценарий, в котором вам может потребоваться, чтобы каждый идентификатор в группе по-прежнему был уникальным для страницы, но при этом вводился в цикле, чтобы вы могли ссылаться на отдельные идентификаторы внутри этой группы.

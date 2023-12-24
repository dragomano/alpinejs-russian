# x-model

`x-model` позволяет вам привязать значение входного элемента к данным Alpine.

Вот простой пример использования `x-model` для привязки значения текстового поля к фрагменту данных в Alpine.

```html
<div x-data="{ message: '' }">
    <input type="text" x-model="message">

    <span x-text="message">
</div>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ message: '' }">
            <input type="text" x-model="message" placeholder="Введите сообщение...">
            <div class="pt-4" x-text="message"></div>
        </div>
    </div>

Теперь, когда пользователь вводит текст в текстовое поле, `message` будет отражаться в теге `<span>`.

Директива `x-model` имеет двустороннюю привязку, что означает, что она одновременно «устанавливает» и «получает». Помимо изменения данных, если изменяются сами данные, элемент отразит это изменение.

Мы можем использовать тот же пример, что и выше, но на этот раз мы добавим кнопку для изменения значения свойства `message`.

```html
<div x-data="{ message: '' }">
  <input type="text" x-model="message" />

  <button x-on:click="message = 'изменено'">Изменить сообщение</button>
</div>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ message: '' }">
            <input type="text" x-model="message" placeholder="Введите сообщение...">
            <button x-on:click="message = 'изменено'">Изменить сообщение</button>
        </div>
    </div>

Теперь при нажатии кнопки `<button>` значение элемента ввода мгновенно обновится до «изменено».

`x-model` работает со следующими элементами ввода:

- `<input type="text">`
- `<textarea>`
- `<input type="checkbox">`
- `<input type="radio">`
- `<select>`
- `<input type="range"`

<a name="text-inputs"></a>

## Текстовое поле

```html
<input type="text" x-model="message" />

<span x-text="message"></span>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ message: '' }">
            <input type="text" x-model="message" placeholder="Введите сообщение">
            <div class="pt-4" x-text="message"></div>
        </div>
    </div>

<a name="textarea-inputs"></a>

## Текстовая область

```html
<textarea x-model="message"></textarea>

<span x-text="message"></span>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ message: '' }">
            <textarea x-model="message" placeholder="Введите сообщение"></textarea>
            <div class="pt-4" x-text="message"></div>
        </div>
    </div>

<a name="checkbox-inputs"></a>

## Флажок

<a name="single-checkbox-with-boolean"></a>

### Один флажок с логическим значением

```html
<input type="checkbox" id="checkbox" x-model="show" />

<label for="checkbox" x-text="show"></label>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ open: '' }">
            <input type="checkbox" id="checkbox" x-model="open">
            <label for="checkbox" x-text="open"></label>
        </div>
    </div>

<a name="multiple-checkboxes-bound-to-array"></a>

### Несколько флажков, привязанных к массиву

```html
<label><input type="checkbox" value="Красный" x-model="colors" />Красный</label>
<label><input type="checkbox" value="Оранжевый" x-model="colors" />Оранжевый</label>
<label><input type="checkbox" value="Жёлтый" x-model="colors" />Жёлтый</label>

Цвета: <span x-text="colors"></span>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ colors: [] }">
            <label><input type="checkbox" value="Красный" x-model="colors">Красный</label>
            <label><input type="checkbox" value="Оранжевый" x-model="colors">Оранжевый</label>
            <label><input type="checkbox" value="Жёлтый" x-model="colors">Жёлтый</label>
            <div class="pt-4">Цвета: <span x-text="colors"></span></div>
        </div>
    </div>

<a name="radio-inputs"></a>

## Переключатели

```html
<label><input type="radio" value="да" x-model="answer" />Да</label>
<label><input type="radio" value="нет" x-model="answer" />Нет</label>

Ответ: <span x-text="answer"></span>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ answer: '' }">
            <label><input type="radio" value="да" x-model="answer" />Да</label>
            <label><input type="radio" value="нет" x-model="answer" />Нет</label>
            <div class="pt-4">Ответ: <span x-text="answer"></span></div>
        </div>
    </div>

<a name="select-inputs"></a>

## Выпадающий список

<a name="single-select"></a>

### Одиночный выбор

```html
<select x-model="color">
  <option>Красный</option>
  <option>Оранжевый</option>
  <option>Жёлтый</option>
</select>

Цвет: <span x-text="color"></span>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ color: '' }">
            <select x-model="color">
                <option>Красный</option>
                <option>Оранжевый</option>
                <option>Жёлтый</option>
            </select>
            <div class="pt-4">Цвет: <span x-text="color"></span></div>
        </div>
    </div>

<a name="single-select-with-placeholder"></a>

### Одиночный выбор с заполнителем

```html
<select x-model="color">
  <option value="" disabled>Выберите цвет</option>
  <option>Красный</option>
  <option>Оранжевый</option>
  <option>Жёлтый</option>
</select>

Цвет: <span x-text="color"></span>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ color: '' }">
            <select x-model="color">
                <option value="" disabled>Выберите цвет</option>
                <option>Красный</option>
                <option>Оранжевый</option>
                <option>Жёлтый</option>
            </select>
            <div class="pt-4">Цвет: <span x-text="color"></span></div>
        </div>
    </div>

<a name="multiple-select"></a>

### Множественный выбор

```html
<select x-model="color" multiple>
  <option>Красный</option>
  <option>Оранжевый</option>
  <option>Жёлтый</option>
</select>

Цвета: <span x-text="color"></span>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ color: '' }">
            <select x-model="color" multiple>
                <option>Красный</option>
                <option>Оранжевый</option>
                <option>Жёлтый</option>
            </select>
            <div class="pt-4">Цвета: <span x-text="color"></span></div>
        </div>
    </div>

<a name="dynamically-populated-select-options"></a>

### Динамически заполняемые параметры выбора

```html
<select x-model="color">
  <template x-for="color in ['Красный', 'Оранжевый', 'Жёлтый']">
    <option x-text="color"></option>
  </template>
</select>

Цвет: <span x-text="color"></span>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ color: '' }">
            <select x-model="color">
                <template x-for="color in ['Красный', 'Оранжевый', 'Жёлтый']">
                    <option x-text="color"></option>
                </template>
            </select>
            <div class="pt-4">Цвет: <span x-text="color"></span></div>
        </div>
    </div>

<a name="range-inputs"></a>

## Ползунок

```html
<input type="range" x-model="range" min="0" max="1" step="0.1" />

<span x-text="range"></span>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ range: 0.5 }">
            <input type="range" x-model="range" min="0" max="1" step="0.1">
            <div class="pt-4" x-text="range"></div>
        </div>
    </div>

<a name="modifiers"></a>

## Модификаторы

<a name="lazy"></a>

### `.lazy`

При вводе текста по умолчанию `x-model` обновляет свойство при каждом нажатии клавиши. Добавив модификатор `.lazy`, вы можете заставить входные данные `x-model` обновлять свойство только тогда, когда пользователь фокусируется на элементе ввода.

Это удобно для таких вещей, как проверка формы в реальном времени, когда вы, возможно, не захотите показывать ошибку проверки ввода, пока пользователь не «перейдет» к другому полю.

```html
<input type="text" x-model.lazy="username" />
<span x-show="username.length > 20">Имя пользователя слишком длинное.</span>
```

<a name="number"></a>

### `.number`

По умолчанию любые данные, хранящиеся в свойстве через `x-model`, сохраняются в виде строки. Чтобы заставить Alpine сохранить значение как число JavaScript, добавьте модификатор `.number`.

```html
<input type="text" x-model.number="age" /> <span x-text="typeof age"></span>
```

<a name="boolean"></a>

### `.boolean`

По умолчанию любые данные, хранящиеся в свойстве через `x-model`, сохраняются в виде строки. Чтобы заставить Alpine сохранить значение как логическое значение JavaScript, добавьте модификатор `.boolean`. И целые числа (1/0), и строки (true/false) являются допустимыми логическими значениями.

```html
<select x-model.boolean="isActive">
  <option value="true">Да</option>
  <option value="false">Нет</option>
</select>
<span x-text="typeof isActive"></span>
```

<a name="debounce"></a>

### `.debounce`

Добавив `.debounce` к `x-model`, вы можете легко отменить обновление связанного ввода.

Это полезно для таких вещей, как входные данные поиска в реальном времени, которые извлекают новые данные с сервера каждый раз, когда изменяется свойство поиска.

```html
<input type="text" x-model.debounce="search" />
```

Время задержки выполнения по умолчанию составляет 250 миллисекунд, вы можете легко настроить его, добавив модификатор времени:

```html
<input type="text" x-model.debounce.500ms="search" />
```

<a name="throttle"></a>

### `.throttle`

Подобно `.debounce`, вы можете ограничить обновление свойств, инициируемое `x-model`, только обновлением через указанный интервал.

<input type="text" x-model.throttle="search">

Интервал по умолчанию составляет 250 миллисекунд, вы можете легко настроить его, добавив модификатор времени:

```html
<input type="text" x-model.throttle.500ms="search" />
```

<a name="fill"></a>

### `.fill`

По умолчанию, если входные данные имеют атрибут _value_, Alpine игнорирует их, и вместо этого значение входных данных устанавливается равным значению свойства, привязанного с помощью `x-model`.

Но если связанное свойство пусто, вы можете использовать атрибут _value_ входного значения для заполнения свойства, добавив модификатор `.fill`:

<div x-data="{ message: null }">
  <input x-model.fill="message" value="Это сообщение по умолчанию.">
</div>

<a name="programmatic access"></a>

## Программный доступ

Alpine предоставляет встроенные утилиты для получения и настройки свойств, связанных с `x-model` Это полезно для сложных утилит Alpine, которые могут захотеть переопределить поведение `x-model` по умолчанию, или в случаях, когда вы хотите разрешить `x-model` для элемента, не являющегося полем ввода.

Вы можете получить доступ к этим утилитам через свойство `_x_model` в элементе `x-model`. `_x_model` имеет два метода для получения и установки связанного свойства:

- `el._x_model.get()` (возвращает значение связанного свойстваy)
- `el._x_model.set()` (устанавливает значение связанного свойства)

```html
<div x-data="{ username: 'calebporzio' }">
  <div x-ref="div" x-model="username"></div>

  <button @click="$refs.div._x_model.set('phantomatrix')">
    Изменить имя пользователя на: 'phantomatrix'
  </button>

  <span x-text="$refs.div._x_model.get()"></span>
</div>
```

!!! example "Пример"

    <div class="demo">
        <div x-data="{ username: 'calebporzio' }">
            <div x-ref="div" x-model="username"></div>
            <button class="md-button md-button--primary" x-on:click="$refs.div._x_model.set('phantomatrix')">
                Изменить имя пользователя на: 'phantomatrix'
            </button>
            <span x-text="$refs.div._x_model.get()"></span>
        </div>
    </div>

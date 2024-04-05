---
title: Alpine.bind
description: Знакомимся с глобальным методом Alpine.bind
sidebar:
  order: 3
---

`Alpine.bind(...)` предоставляет возможность повторного использования объектов [`x-bind`](/directives/bind#прямая-привязка-директив-alpine) внутри вашего приложения.

Приведём простой пример. Вместо того чтобы привязывать атрибуты вручную с помощью Alpine:

```html
<button type="button" @click="doSomething()" :disabled="shouldDisable"></button>
```

Вы можете собрать эти атрибуты в многократно используемый объект и использовать `x-bind` для привязки к нему:

```html "Alpine.bind"
<button x-bind="SomeButton"></button>

<script>
  document.addEventListener('alpine:init', () => {
    Alpine.bind('SomeButton', () => ({
      type: 'button',

      '@click'() {
        this.doSomething();
      },

      ':disabled'() {
        return this.shouldDisable;
      },
    }));
  });
</script>
```

# Alpine.bind

`Alpine.bind(...)` предоставляет возможность повторного использования объектов [`x-bind`](../directives/bind.md#bind-directives) внутри вашего приложения.

Приведем простой пример. Вместо того чтобы привязывать атрибуты вручную с помощью Alpine:

```html
<button type="button" @click="doSomething()" :disabled="shouldDisable"></button>
```

Вы можете собрать эти атрибуты в многократно используемый объект и использовать `x-bind` для привязки к нему:

```html
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

# x-ignore

По умолчанию Alpine сканирует и инициализирует всё дерево DOM элемента, содержащего `x-init` или `x-data`.

Если по какой-то причине вы не хотите, чтобы Alpine касался определённого раздела вашего HTML, вы можете запретить ему это делать, используя `x-ignore`.

```html
<div x-data="{ label: 'Из Alpine' }">
  <div x-ignore>
    <span x-text="label"></span>
  </div>
</div>
```

В приведенном выше примере тег `<span>` не будет содержать «Из Alpine», поскольку мы сказали Alpine полностью игнорировать содержимое `div`.

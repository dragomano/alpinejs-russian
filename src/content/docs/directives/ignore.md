---
title: x-ignore
description: Описание директивы x-ignore в Alpine.js
sidebar:
  order: 13
---

По умолчанию Alpine сканирует и инициализирует всё дерево DOM элемента, содержащего `x-init` или `x-data`.

Если по какой-то причине вы не хотите, чтобы Alpine касался определённого раздела вашего HTML, вы можете запретить ему это делать, используя `x-ignore`.

```html "x-ignore"
<div x-data="{ label: 'Из Alpine' }">
  <div x-ignore>
    <span x-text="label"></span>
  </div>
</div>
```

В приведённом выше примере тег `<span>` не будет содержать строку «Из Alpine», поскольку мы сказали Alpine полностью игнорировать содержимое `div`.

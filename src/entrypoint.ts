import type { Alpine } from 'alpinejs';
import anchor from '@alpinejs/anchor';
import collapse from '@alpinejs/collapse';
import focus from '@alpinejs/focus';
import intersect from '@alpinejs/intersect';
import mask from '@alpinejs/mask';
import morph from '@alpinejs/morph';
import sort from "@alpinejs/sort";
import slug from 'alpinejs-slug';
import resize from '@alpinejs/resize';
import persist from '@alpinejs/persist';
import tash from 'alpinejs-tash';
import Clipboard from '@ryangjchandler/alpine-clipboard';
import validate from "@colinaut/alpinejs-plugin-simple-validate";

export default (Alpine: Alpine) => {
  Alpine.plugin(anchor);
  Alpine.plugin(collapse);
  Alpine.plugin(focus);
  Alpine.plugin(intersect);
  Alpine.plugin(mask);
  Alpine.plugin(morph);
  Alpine.plugin(sort);
  Alpine.plugin(slug);
  Alpine.plugin(resize);
  Alpine.plugin(persist);
  Alpine.plugin(tash);
  Alpine.plugin(Clipboard)
  Alpine.plugin(validate)
};

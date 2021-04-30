#!/usr/bin/env ts-node

import yargsApp from '.';

(async () => {
  (await yargsApp()).argv;
})();

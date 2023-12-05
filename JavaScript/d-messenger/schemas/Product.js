({
  Entity: {},

  name: { type: 'string' },
  description: { type: 'string' },
  manufactur: 'Account',
  variations: { many: 'Variant' },
});

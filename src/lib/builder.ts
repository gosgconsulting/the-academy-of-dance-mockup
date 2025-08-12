import { builder } from '@builder.io/react';

// Initialize Builder with your API key (from the CMS connection)
builder.init('43ad973db23348b2847cc82fd8c0b54b');

// Configure Builder options
builder.set({
  // Enable visual editing
  visualEditing: true,
  // Set custom host if needed
  host: 'https://cdn.builder.io',
  // Enable preview mode
  preview: true,
});

export { builder };

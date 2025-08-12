import { builder } from '@builder.io/react';

// Initialize Builder with your API key (from the CMS connection)
builder.init('43ad973db23348b2847cc82fd8c0b54b');

// Set API version to v3 for latest features
builder.apiVersion = 'v3';

export { builder };

import hljs from 'highlight.js';

export const highlight = (message: object) => {
  if (!message) {
    return message;
  }
  return hljs.highlight(JSON.stringify(message, null, 2), { language: 'json' }).value;
};
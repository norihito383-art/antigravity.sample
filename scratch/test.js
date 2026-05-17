const katex = require('katex');
// auto-render isn't easily runnable in node without DOM.
// But wait, the parse error is probably because `\le` is KaTeX but `\\` outside math mode breaks auto-render? No.

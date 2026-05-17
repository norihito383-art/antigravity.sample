const katex = require('katex');

// Let's test what katex does with the string inside the delimiters
try {
    const res = katex.renderToString("a,b,c,d", { throwOnError: false });
    console.log("Result 1:", res);
} catch (e) {
    console.log("Error 1:", e.message);
}

// What if the string is the WHOLE text?
try {
    const res = katex.renderToString("a,b,c,d\\)は非負整数であり、\\(0\\le a,b,c,d\\le4", { throwOnError: false });
    console.log("Result 2:", res);
} catch (e) {
    console.log("Error 2:", e.message);
}

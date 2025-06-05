> [!warning] Notice
> This feature is intended for users who have a good understanding of regular expressions. Learn more on [javascript.info](https://javascript.info/regular-expressions/).

Aliases: `highlight`, `match`, `rx`

Use the power of regular expressions to find and highlight text in code blocks.

```js rx=/console/g rx=/\(".+"\)/g mod=rx,mt,no-ln
console.log("hello world");
console.log("hello world");
console.log("hello world");
console.log("hello world");
```

Highlight color can be changed by adding a color name parameter.

```js rx[red]=/red/ rx[green]=/green/ rx[blue]=/blue/ mod=rx,mt,no-ln
console.log("red");
console.log("green");
console.log("blue");
```

Force the text color to match the highlight by using an exclamation mark.

```js rx[red!]=/red/ rx[green!]=/green/ rx[blue!]=/blue/ mod=rx,mt,no-ln
console.log("red");
console.log("green");
console.log("blue");
```

An icon can be added by specifying its name after the color.

```js rx[yellow:dna]=/dna/ rx[cyan:checkmark]=/checkmark/ rx[purple:zap]=/zap/ mod=rx,mt,no-ln
console.log("dna");
console.log("checkmark");
console.log("zap");
```

A list of line numbers can be specified to narrow down the matches.

```js rx=1,2-3/log/g rx[orange]=4-6/log/g mod=rx,mt,no-ln
console.log("hello world");
console.log("hello world");
console.log("hello world");
console.log("hello world");
console.log("hello world");
console.log("hello world");
```

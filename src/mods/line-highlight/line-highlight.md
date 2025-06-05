Aliases: `line-highlight`, `highlight`, `lh`

Apply a highlight effect to a single line, a list of lines, or a range of lines.

```js lh=2-4 mod=lh,mt,no-ln
console.log("hello world");
console.log("hello world");
console.log("hello world");
console.log("hello world");
console.log("hello world");
```

Highlight color can be changed by adding a color parameter.

```js lh[red]=1 lh[green]=2 lh[blue]=3 mod=lh,mt,no-ln
console.log("red");
console.log("green");
console.log("blue");
```

Force the text color to match the highlight by using an exclamation mark.

```js lh[red!]=1 lh[green!]=2 lh[blue!]=3 mod=lh,mt,no-ln
console.log("red");
console.log("green");
console.log("blue");
```

An icon can be added by specifying its name after the color.

```js lh[red:dna]=1 lh[green:checkmark]=2 lh[blue:zap]=3 mod=lh,mt,no-ln
console.log("dna");
console.log("checkmark");
console.log("zap");
```

Imitate diffs using ins (insert), del (delete), or chg (change) parameters.

```js lh[ins]=1 lh[del]=2 lh[chg]=3 mod=lh,mt,no-ln
console.log("insert");
console.log("delete");
console.log("change");
```

 Show alerts with ntc (notice), wrn (warning), and err (error) parameters.

```js lh[ntc]=1 lh[wrn]=2 lh[err]=3 mod=lh,mt,no-ln
console.log("notice");
console.log("warning");
console.log("error");
```

Draw attention to one or more lines using the focus parameter.

```js lh[focus]=2 mod=lh,mt,no-ln
console.log("hello world");
console.log("hello world, this line has focus");
console.log("hello world");
```

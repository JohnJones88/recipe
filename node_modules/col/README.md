col [![Build Status](https://secure.travis-ci.org/mattyod/col.png?branch=master)](http://travis-ci.org/mattyod/col)
===

Tiny simple colour logger

methods are:

* col.error(msg) - red
* col.warn(msg) - yellow
* col.info(msg) - indented
* col.success(msg) - just app name in green

Multiple arguments will be joined into a single message string as you would with a normal console.log().

**e.g.**

```
col.error('foo', 'bar', 'baz');
// outputs: 'MyApp ERROR: foo bar baz'
```

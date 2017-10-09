# IndexBuilder

just a simple function to achieve results like so:

```
let Indexer = require('indexbuilder')
let indexer = new Indexer()
let data = [ { foo: 'b', thing: 1, bar: 13 },
             { foo: 'b', thing: 2, bar: 13 },
             { foo: 'c', thing: 3, bar: 13 },
             { foo: 'c', thing: 4, bar: 12 }]

indexer.store(data,'theData')
    .queueIndex('foo','testData')
    .executeIndexQueue()

let indexes = indexer.exportIndexes('theData',['foo','bar'])
```

indexes now looks like this:

```
{ foo: { b: [ 0, 1 ], c: [ 2, 3 ] },
  bar: { '12': [ 3 ], '13': [ 0, 1, 2 ] } }
```

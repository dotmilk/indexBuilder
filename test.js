let expect = require('chai').expect
let Indexer = require('./index.js')
let testArray = [ { foo: 'b', thing: 1, bar: 13 },
                  { foo: 'b', thing: 2, bar: 13 },
                  { foo: 'c', thing: 3, bar: 13 },
                  { foo: 'c', thing: 4, bar: 12 }]
let expectedOutput = { foo: { b: [ 0, 1 ], c: [ 2, 3 ] },
                       bar: { '12': [ 3 ], '13': [ 0, 1, 2 ] } }

it('Basic function works',()=>{
    let indexer = new Indexer()
    indexer.store(testArray,'testData')
        .queueIndex('foo','testData')
        .queueIndex('bar','testData')
        .executeIndexQueue()

    expect(indexer.exportIndexes('testData',['foo','bar'])).to.deep.equal(expectedOutput)
})

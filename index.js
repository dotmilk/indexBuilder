class Indexer {

    constructor() {
        this.valuesForPassingToLookUp = []
        this.datas = {}
        this.indexes = {}
        this.toGenerate = {}
        return this
    }

    store(input,name) {
        this['datas'][name] = input
        return this
    }

    queueIndex(name,from,def) {
        let record = this.toGenerate[from]
        let output = {name: name, def: def}
        if (record) {
            record.push(output)
        } else {
            this.toGenerate[from] = [output]
        }
        return this
    }

    queueManualIndex(name,from,using) {
        let record = this.toGenerate[from]
        let output = {name: name, using: using}
        console.log(output)
        if (record) {
            record.push(output)
        } else {
            this.toGenerate[from] = [output]
        }
        return this
    }

    customIndex(using) {
        using.call(this)
        return this
    }

    executeIndexQueue() {
        for (let key in this.toGenerate) {
            let queue = this.toGenerate[key]
            let source = this.datas[key]

            source.forEach((value,i)=> {
                queue.forEach((toMake)=>{
                    let index = this.indexes[toMake.name]
                    if (!index) {
                        this.indexes[toMake.name] = index = {}
                    }
                    if (toMake['using']) {
                        // manual index
                        toMake.using(function() {
                            let valuesToGet = Array.from(arguments)
                            return valuesToGet.map((x)=>{
                                return value[x]
                            })
                        },index,i)
                    } else {
                        // auto index
                        let indexKeys = value[toMake['name']]
                        if (!Array.isArray(indexKeys)) {
                            indexKeys = [indexKeys]
                        }
                        indexKeys.forEach((indexKey)=> {
                            if ((toMake.def || toMake.def === 0) && !indexKey) {
                                indexKey = toMake.def
                            }
                            if (indexKey || indexKey === 0) {
                                let record = index[indexKey]
                                if (record) {
                                    record.push(i)
                                } else {
                                    index[indexKey] = [i]
                                }
                            }
                        })
                    }

                })

            })
        }
        return this
    }

    exportIndexes(from,toGet) {
        let indexes = {}

        toGet.forEach((index)=> {
            indexes[index] = this['indexes'][index]
        })
        return indexes
    }

}

module.exports = Indexer

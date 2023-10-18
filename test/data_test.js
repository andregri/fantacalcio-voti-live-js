const data = require('../src/data')
const liveData = require('../test_data/data.json')

newData = liveData
data.appendLiveData(newData, liveData, 0)
console.log(JSON.stringify(newData))
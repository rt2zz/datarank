datarank
========

Used to create simple tied ranks.

```
var Rank = require('datarank')

// Sample data
var data = [
    {id: 'a', value: 1}, 
    {id: 'b', value: 2}, 
    {id: 'c', value: 2}, 
    {id: 'd', value: 2}, 
    {id: 'e', value: 3}
  ]

// Examples
Rank(data, 'value').rank().normalize().value()     
// { data: (sorted data), rank: [0, .25, .5, .75, 1] }

Rank(data, 'value').rank().value()                 
// { data: (sorted data), rank: [0, 1, 2, 3, 4] }

Rank(data, 'value').tiedRank().normalize().value() 
// { data: (sorted data), rank: [0, .5, .5, .5, 1] }

Rank(data, 'value').tiedRank().value()             
// { data: (sorted data), rank: [0, 2, 2, 2, 4] }

Rank(data, 'value').tiedRank().value('merged')     
// [{id: 'a', value: 1, rank: 0}, {id: 'b', value: 2, rank: 2}, ... ] 
```
##Usage
####Rank(data, key, [direction])
Creates a new ranking object
- `data` - an array of objects
- `key` - the key to sort on
- `direction` (optional) - -1 will invert the sort

####.rank()
Perform a simple ranking

####.tiedRank()
Average out rank of ties

####.normalize()
Normalize ranks from 0 to 1

####.value([format])
Return the ranking
- `format` (optional) - 'merged' will add the ranking to the data rows under the rank key


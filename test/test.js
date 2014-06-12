var Lab = require('lab');

var Rank = require('../index.js')
var sampleData = [{id:'A', a: 1}, {id: 'B', a: 10}, {id: 'C', a:10}, {id: 'D', a: 100}]
var rankMergedData = [{id:'A', a: 1, rank: 0}, {id: 'B', a: 10, rank: 1}, {id: 'C', a:10, rank: 2}, {id: 'D', a: 100, rank: 3}]

Lab.test('tied rank normalize', function (done) {
    var ranked = Rank(sampleData, 'a').tiedRank().normalize().value()
    Lab.expect(ranked.rank).to.deep.equal([0, .5, .5, 1])
    done();
});

Lab.test('tied rank', function (done) {
    var ranked = Rank(sampleData, 'a').tiedRank().value()
    Lab.expect(ranked.rank).to.deep.equal([0, 1.5, 1.5, 3])
    done();
});

Lab.test('rank merged', function (done) {
    var ranked = Rank(sampleData, 'a').rank().value('merged')
    Lab.expect(ranked).to.deep.equal(rankMergedData)
    done();
});

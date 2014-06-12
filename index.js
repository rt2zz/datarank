var _ = require('lodash')

function Rank(data, key, dir){
	if(!Array.isArray(data)) throw new Error('Data must be array')
	this._sorted = data.sort(sortKey(key, dir))
	this._key = key
	this._ranks = []
}

Rank.prototype.rank = function(){
	this._ranks = []
	this._ranks = _.map(this._sorted, function(data, index){return index})
	return this
}

Rank.prototype.tiedRank = function(){
	var self = this
	var sorted = self._sorted

	self._ranks = []

	var lastValue = null
	var lastIndex = 0
	var itemStore = []
	_.each(sorted, function(item, index){
		if(item[self._key] == lastValue){
			itemStore.push(item)
		}
		else{
			if(itemStore.length > 0){
				pushRank()
			}

			//add new item to itemStore and set updated lastValue and lastIndex
			itemStore = [item]
			lastValue = item[self._key]
			lastIndex = index
		}
	})
	pushRank()
	function pushRank(){
		var rank = lastIndex + (itemStore.length-1)/2
		_.each(itemStore, function(){
			self._ranks.push(rank)
		})
	}
	return self
}

Rank.prototype.normalize = function(){
	var max = this._ranks.length-1
	this._ranks = _.map(this._ranks, function(rank, index){
		return rank/max
	})
	return this
}

Rank.prototype.value = function(type){
	var self = this
	var type = type || 'seperate'

	switch(type){
		case 'seperate':
			return {data: this._sorted, rank: this._ranks}
			break;
		case 'merged':
			return _.map(this._sorted, function(row, index){
				return _.merge(row, {rank: self._ranks[index]})
			})
			break;
	}
}

function sortKey(key, modifier){
	return function(a, b){
		var res = 0
		modifier = modifier || 1
		if(a[key] < b[key]) res = -1
		if(a[key] > b[key]) res = 1
		return res*modifier
	}
}

module.exports = function(data, key, dir){
	return new Rank(data, key, dir)
}

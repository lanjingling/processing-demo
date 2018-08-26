var SortAlgorithm = {
bubble: function() {
  for(var i = this.count()-1; i >= 0; i--)
    for(var j = 0; j < i; j++)
      if(this.gt(j, j+1))
        this.swap(j, j+1);
},
shaker: function() {
  var left = 0, right = this.count()-1;
  while(left < right) {
    var lastRight = left;
    for(var i = left; i < right; i++) {
      if(this.gt(i, i+1, right)) {
        this.swap(i, i+1);
        lastRight = i;
      }
    }
    right = lastRight;
		
    var lastLeft = right;
    for(var i = right; i > left; i--) {
      if(this.gt(i-1, i, left)) {
        this.swap(i-1, i);
        lastLeft = i;
      }
    }
    left = lastLeft;
  }
},
insertion: function() {
  for(var i = 1; i < this.count(); i++) {
    for(var j = i; j > 0; j--) {
      if(this.gt(j-1, j))
        this.swap(j-1, j);
      else
        break;
    }
  }
},
selection: function() {
  for(var i = 0; i < this.count()-1; i++) {
    var min = i;
    for(var j = i+1; j < this.count(); j++)
      if(this.lt(j, min, i))
        min = j;
    this.swap(i, min);
  }
},
shell: function() {
  var gap = Math.floor(this.count()/2);
  while(gap > 1) {
    gap = Math.floor(gap/3)+1;
    for(var i = gap; i < this.count(); i++) {
      for(var j = i; j >= gap; j-=gap) {
        if(this.gt(j-gap, j))
          this.swap(j-gap, j);
        else
          break;
      }
    }
  }
},
heap: function() {
  for(var i = 0; i < this.count(); i++) {
    var current = i;
    while(current != 0) {
      var parent = Math.floor((current - 1) / 2);
      if(!this.gt(current, parent))
        break;
      this.swap(current, parent);
      current = parent;
    }
  }
  for(var i = this.count()-1; i > 0; i--) {
    this.swap(0, i);
    var current = 0;
    while(true) {
      var child = current * 2 + 1;
      if(child >= i) break;
      if(child+1 < i && this.lt(child, child+1)) child++;
      if(!this.lt(current, child)) break;
      this.swap(current, child);
      current = child;
    }
  }
},
merge: function() {
  (function(left, right) {
    if(left >= right)
      return;
    var mid = Math.floor((left + right) / 2);
    arguments.callee.call(this, left, mid);
    arguments.callee.call(this, mid+1, right);
    var i = left, j = mid+1;
    while(i < j && j <= right) {
      if(!this.lt(i, j))
        this.insertBefore(j++, i);
      i++;
    }
  }).call(this, 0, this.count()-1);
},
quick: function() {
  (function(left, right) {
    if(left >= right)
      return;
    this.swap(left, Math.floor((left + right) / 2));
    var pivot = left;
    for(var i = left+1; i <= right; i++)
      if(this.gt(left, i))
        this.swap(++pivot, i);
    this.swap(left, pivot);
    arguments.callee.call(this, left, pivot-1);
    arguments.callee.call(this, pivot+1, right);
  }).call(this, 0, this.count()-1);
}
};

Array.prototype.swap = function(i, j) {
  var tmp = this[i];
  this[i] = this[j];
  this[j] = tmp;
};
Array.prototype.insertBefore = function(from, to) {
  var tmp = this[from];
  if(from < to) {
    for(var i = from; i < to-1; i++)
      this[i] = this[i+1];
    this[to-1] = tmp;
    return to - from - 1;
  } else {
    for(var i = from; i > to; i--)
      this[i] = this[i-1];
    this[to] = tmp;
    return from - to;
  }
};
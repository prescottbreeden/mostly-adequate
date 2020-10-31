class Container {
  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return new Container(x);
  }
}

/**
 *  Container :: Container a -> void
 */
Container.prototype.log = function() {
  return console.log(this.$value);
};

/**
 *  Container :: Container a -> Container b
 */
Container.prototype.map = function(f) {
  return Container.of(f(this.$value));
};

module.exports = Container;

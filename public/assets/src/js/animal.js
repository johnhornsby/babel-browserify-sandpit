var Animal;

Animal = (function() {
  function Animal() {
    alert("hi");
  }

  Animal.prototype.print = function() {
    console.log("print");
    return console.log("boooo");
  };

  return Animal;

})();

module.exports = Animal;

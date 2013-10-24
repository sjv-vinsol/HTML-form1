function SuperHero() {
  SuperHero.prototype.hasPowers = function () {
    alert(this.name + " is a super hero");
  }
}

function IndianSuperHero() {
  IndianSuperHero.prototype.indian = function() {
    alert(this.name + " is an Indian Super Hero");
  }
}

function Krish(name) {
  this.name = name;
  this.sayName = function() {
    alert("My name is Krish");
  }
}

IndianSuperHero.prototype = new SuperHero();
Krish.prototype = new IndianSuperHero();

var krish = new Krish("Krish Hritik");

krish.sayName();
krish.indian();
try {
krish.hasPowers();
}
catch (err) { alert("KRISH IS NOT A SUPER HERO"); }
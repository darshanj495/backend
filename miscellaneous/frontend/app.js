// let arr = [1, 2, 3, 4, 5];

// arr.sayHello = function() {
//     console.log("Hello!");
// }

// FACTORY FUNCTION
// function makePerson(name, age) {
//   const person = {
//     name : name,
//     age: age,
//     talk : function(){
//       console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old!`);
//     }
//   };

//   return person;
// }

// let p1 = makePerson("don", 19);
// let p2 = makePerson("darshan", 20);


// CONSTRUCTOR FUNCTION
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// Person.prototype.talk = function() {
//   console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old!`);
// }


// CLASS 
class Person{
  constructor(name,age){
    this.name = name;
    this.age = age;
  }

  talk(){
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old!`);
  }
}

// INHERITANCE

class Student extends Person{
  constructor(name, age, grade){
    super(name, age);
    this.grade = grade;
  }
}

class Teacher extends Person{
  constructor(name, age, subject){
    super(name, age);
    this.subject = subject;
  }
}
let p1 = new Person("don", 19);
let p2 = new Person("darshan", 20);
let s1 = new Student("alice", 20, 85);
let t1 = new Teacher("mr. smith", 40, "math");
s1.talk();
t1.talk();

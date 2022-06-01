"use strict";
/**************** #1 타입스크립트를 쓰는 이유 ****************/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Hello TypeScript!!");
// 함수로 만들 때 의도했던 방식 외에 다른 방법은 모두 에러로 표시
// 다른 사람이 만든 함수를 사용할 때 몇개의 인수를 어떤 타입으로 전달해야 하는지 일일이 코드를 뒤져볼 필요가 없다.
// function add(num1, num2) {
function add(num1, num2) {
    console.log(num1 + num2);
}
// add(); 
// add(1); 
add(1, 2);
// add(3, 4, 5); 
// any타입이었던 인수가 number로 고정되면서 string 타입은 에러로 판단
// add('hello', 'world'); 
// function showItems(arr) {
// function showItems(arr:string[]) {
// function showItems(arr:number) {
function showItems(arr) {
    arr.forEach(function (item) {
        console.log(item);
    });
}
showItems([1, 2, 3]);
// showItems(1, 2, 3);
/**************** #2 기본 타입 ****************/
// let car = 'bmw' // string를 쓰지 않아도 이미 string으로 알고있다. // type 추론
var car = 'bmw';
// let age = 30;
var age = 30;
// let isAdult = true;
var isAdult = true;
// let a = [1,2,3];
var a = [1, 2, 3];
var a2 = [1, 2, 3];
// let week1 = ['mon', 'tue', 'wed'];
var week1 = ['mon', 'tue', 'wed'];
// let week2 = ['mon', 'tue', 'wed'];
var week = ['mon', 'tue', 'wed'];
// week1.push(3); // Error
/* 튜플 (Tuple) */
// 배열과 비슷한 모양
// 인덱스 별로 타입이 다를 때 이용할 수 있다.
var b; // 배열의 첫 번째 요소는 string, 두 번째 요소는 number을 넣을 수 있다는 의미
b = ['z', 1]; // 가능
// b = [1, 'z']; // 불가능
// 문자를 소문자로 바꿔주는 toLowerCase는 string인 첫 번째 요소에서만 사용할 수 있다.
b[0].toLowerCase(); // 가능
// b[1].toLowerCase(); // 불가능 
// 타입을 미리 알고있기 때문에 타입스크립트 플레이그라운드를 이용하거나
// 사용하고 있는 에디터에서 타입스크립트 관련 익스텐션이 설치되어 있으면 
// .을 찍었을 때 사용할 수 있는 목록이 뜨게 된다.
/* void, never */
// void는 함수에서 아무것도 반환하지 않을 때 주로 사용한다.
// function sayHello(){
function sayHello() {
    console.log('hello');
}
// never은 항상 에러를 반환허거나 영원히 끝나지 않는 함수의 타입으로 사용할 수 있다.
// function showError(){
function showError() {
    throw new Error();
}
// function infLoop(){
function infLoop() {
    while (true) {
        // do something..
    }
}
/* enum */
// 비슷한 값들 끼리 묶어짐
// 수동으로 값을 주지 않으면 자동으로 0부터 1씩 증가하면서 할당된다.
// 양방향 매핑
// enum Os {
//     Window, // 0
//     Ios, // 1
//     Android // 2
// }
// enum Os {
//     Window = 3,
//     Ios = 10,
//     Android
// }
// console.log(Os[10]); // Ios
// console.log(Os['Ios']); // 10
// enum에는 숫자가 아닌 문자열도 입력할 수 있다.
// 숫자가 아니기 때문에 단방향 매핑만 된다.
var Os;
(function (Os) {
    Os["Window"] = "win";
    Os["Ios"] = "ios";
    Os["Android"] = "and";
})(Os || (Os = {}));
// 특정 값만 입력할 수 있게 강조하고싶을때
// 그리고 그 값들이 공통점이 있을 때 enum을 사용하는 것이 좋다.
var myOs;
myOs = Os.Window;
/* null, undefined */
// let a0 = null;
var a0 = null;
// let b0 = undefined;
var b0 = undefined;
var user = {
    name: 'xx',
    age: 30,
    birthYear: 2000,
    // 1:'s', // Error
    1: 'A',
    2: 'B'
};
user.age = 10;
user.gender = "male"; // gneder라는 프로퍼티를 쓸 때에는 무조건 string이어야 한다.
// user.birthYear = 1990; // 읽기 전용 속성이라 최초 생성할 때만 할당이 가능하고 이후에는 수정할 수 없다.
console.log(user.age);
// add0 이라는 함수를 만들고 위에서 만든 인터페이스로 정의해준다.
// 인터페이스에는 num1, num2라고 정의했지만 x, y로도 사용할 수 있다.
var add0 = function (x, y) {
    return x + y;
};
// add0(10, 20, 30); // Error
// add0(10, '20'); // Error
add0(10, 20);
var a1 = function (age) {
    // 19보다 크면 true, 작으면 false를 반환
    return age > 19;
};
a1(33); // true
// BMW 클래스 만들기
// Car에 있는 속성값을 모두 입력해야한다.
var BMW = /** @class */ (function () {
    // constructor 사용
    function BMW(c) {
        this.wheels = 4;
        this.color = c;
    }
    BMW.prototype.start = function () {
        console.log('go...');
    };
    return BMW;
}());
var b1 = new BMW('green');
console.log(b1);
b1.start();
var benz = {
    door: 5,
    stop: function () {
        console.log('stop');
    },
    color: 'black',
    wheels: 4,
    start: function () {
        console.log('go...');
    }
};
/**************** #4 함수 ****************/
// 각 매개변수의 타입을 입력해주고, 괄호 뒤에는 이 함수가 반환하는 타입을 입력해준다.
function add1(num1, num2) {
    return num1 + num2;
}
// 아무것도 return 해주지 않으면 void로 입력한다.
function add2(num1, num2) {
    // return num1 + num2;
    console.log(num1 + num2);
}
// boolean 타입 
function isAdult0(age) {
    return age > 19;
}
// 인터페이스 처럼 함수에 매개 변수도 옵셔널로 지정할 수 있다.
// name이 없을 때를 대비한 코드가 있지만 타입스크립트에서는 보다 명시적으로 알려줘야한다.
// 옵셔널이라고 하더라도 타입은 항상 지켜줘야한다.
// undefind이거나 만약 있다면 string이거나 둘중에 하나.
function hello1(name) {
    // name이 있으면 name을 쓰고 없으면 world를 출력
    return "Hello, ".concat(name || "world");
}
/* 자바스크립트에서 처럼 매개 변수에 디폴트 값 주기 */
function hello2(name) {
    if (name === void 0) { name = "world"; }
    return "Hello, ".concat(name);
}
var result = hello1();
var result2 = hello1("Sam");
// const result3 = hello0(123); // Error
/* 이름과 나이를 받아서 문자열을 출력 */
function hello3(name, age) {
    // name 앞에 age 가 오면 안 된다. 
    // 이 둘의(선택적 매개 변수와 필수 매개변수) 자리를 바꾸면 에러 발생
    // function hello3(age?: number, name: string): string { 
    // age를 앞에 두고 옵셔널 하게 사용
    // age를 number와 undefined를 받을 수 있게 해주고 명시적으로 undefined를 전달하는 방식으로 사용
    // function hello3(age: number | undefined, name: string): string
    if (age !== undefined) { // 나이가 있을 때와 없을 때를 구분
        return "Hello, ".concat(name, ". You are ").concat(age, ".");
    }
    else {
        return "Hello, ".concat(name);
    }
}
console.log(hello3("Sam"));
console.log(hello3("Sam", 30));
// age를 앞에 두고 옵셔널 하게 사용
// console.log(hello3(30, "Sam"));
// console.log(hello3(undefined, "Sam"));
/* 나머지 매개 변수들의 타입 작성 법 */
// 숫자들을 전달받아서 모두 더해주는 함수
// 레스트 파라미터(나머지 매개 변수) 사용
// 나머지 매개 변수는 개수가 매번 바뀔 수 있다.
// ...을 사용하면 전달받은 매개 변수를 배열로 나타낼 수 있게 한다.
// 그래서 타입을 number[] 형태로 기입한다.
function add3() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    return nums.reduce(function (result, num) { return result + num; }, 0);
}
add3(1, 2, 3); // 6
add3(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); // 55
var Sam = { name: 'Sam' };
// 타입 스크립트에서 this의 타입을 정할 때는 함수의 첫 번째 매개 변수 자리에 this를 쓰고 타입을 입력해준다.
// function showName(this:User0){
//     console.log(this.name)
// }
// 매개 변수가 있을 때
// a3에서 전달한 매개 변수는 this 다음부터 첫 번째(age) 두 번째(gender) 순서대로 적용된다.
function showName(age, gender) {
    console.log(this.name, age, gender);
}
// bind를 이용해서 this를 Sam 객체로 강제한다.
var a3 = showName.bind(Sam);
// a3();
a3(30, 'm');
function join(name, age) {
    // age가 숫자라면
    if (typeof age === "number") {
        // User1을 return하고
        return {
            name: name,
            age: age,
        };
        // 아니라면 string을 리턴한다.
    }
    else {
        return " 나이는 숫자로 입력해주세요.";
    }
}
var sam = join("Sam", 30);
var jane = join("Jane", "30");
/**************** #5 리터럴, 유니온/교차 타입 ****************/
/* Literal Types */
// const : 변하지 않는 값을 선언할 때 사용
var userName1 = "Bob"; // Bob // string이지만 변할 수 없으니 Bob 이외의 값을 가질 수 없다.
// let : 변할 수 있는 값을 선언할 때 사용
// let userName2 = "Tom"; // string // Tom이지만 언제든 다른 값으로 변할 수 있으니 보다 넓은 개념의 string 타입으로 정의된다.
// userName2 = 3; // Error // 최초 할당 값이 string
// 숫자도 넣을 수 있게 하기
var userName2 = "Tom";
userName2 = 3;
var user2 = {
    name: "Bob",
    job: "developer", // Job에 있는 값만 사용할 수 있다.
};
// 동일한 속성의 타입을 다르게 해서 구분 할 수 있는 것을 식별 가능한 유니온 타입
function gerGift(gift) {
    console.log(gift.color);
    if (gift.name === "car") {
        gift.start(); // Car0
    }
    else {
        gift.call(); // Mobile
    }
}
// 장난감 자동차
// 모든 속성을 다 기입 해주어야 한다.
var toyCar1 = {
    name: "타요",
    start: function () { },
    color: "blue",
    price: 1000, // 장난감
};
/**************** #6 클래스 class ****************/
// class Car2 {
//     constructor(color) {
//         this.color = color;
//     }
//     start() {
//         console.log("start");
//     }
// }
// const bmw1 = new Car2("red");
// 타입 스크립트에서 클래스를 작성할 때 멤버 변수는 미리 선언을 해줘야 한다.
// class Car2 {
//     color: string;
//     constructor(color: string) {
//         this.color = color;
//     }
//     start() {
//         console.log("start");
//     }
// }
// const bmw1 = new Car2("red");
// 멤버 변수를 미리 선언하지 않는 방법
// 접근 제한자나 readonly를 이용한다.
var Car2 = /** @class */ (function () {
    // color: string;
    function Car2(color) {
        this.color = color;
        this.color = color;
    }
    Car2.prototype.start = function () {
        console.log("start");
    };
    return Car2;
}());
var bmw1 = new Car2("red");
/* 접근 제한자(Access modifier) - public, private, protected */
// public은 자식 클래스나 클래스 인스턴스에서 접근이 가능하다.
// 아무것도 표기하지 않고 작성하면 모두 public이다.
// ES6의 클래스는 다른 객체 지향 언어들처럼 접근체한자를 지원하지 않는다.
// 하지만 타입스크립트에서는 지원한다.
var Car3 = /** @class */ (function () {
    function Car3(color) {
        this.name = "car"; // 아무것도 적지 않으면 public과 같다.
        this.color = color;
    }
    Car3.prototype.start = function () {
        console.log("start");
        console.log(this.name);
        // console.log(this.#name);
    };
    return Car3;
}());
var Bmw2 = /** @class */ (function (_super) {
    __extends(Bmw2, _super);
    function Bmw2(color) {
        // super로 호출하지 않으면 에러 발생
        return _super.call(this, color) || this;
    }
    // Car3의 name이 public이기 때문에 자식 클래스에서 접근해도 문제없이 사용할 수 있다.
    Bmw2.prototype.showName = function () {
        console.log(this.name);
        // console.log(this.#name); 
    };
    return Bmw2;
}(Car3));
var z4 = new Bmw2("black");
console.log(z4.name);
z4.name = "zzzz4";
// name을 수정할 수 없게 하려면 readonly 키워드를 사용한다.
var Car4 = /** @class */ (function () {
    function Car4(color, name) {
        this.name = "car";
        this.color = color;
        this.name = name;
    }
    Car4.prototype.start = function () {
        console.log("start");
        console.log(this.name);
    };
    return Car4;
}());
var Bmw3 = /** @class */ (function (_super) {
    __extends(Bmw3, _super);
    function Bmw3(color, name) {
        return _super.call(this, color, name) || this;
    }
    Bmw3.prototype.showName = function () {
        console.log(this.name);
    };
    return Bmw3;
}(Car4));
var z5 = new Bmw3("black", "zzzz4");
console.log(z5.name);
// 54.name = "zzzz4";
/* static 프로퍼티 */
// static을 쓰면 정적 멤버변수를 만들 수 있다.
// Class. 으로 접근 가능
var Car5 = /** @class */ (function () {
    function Car5(color, name) {
        this.name = "car";
        this.color = color;
        this.name = name;
    }
    Car5.prototype.start = function () {
        console.log("start");
        console.log(this.name);
        // static으로 선언 된 정적 멤버 변수나 메서드는 this가 아니라 클래스 명을 넣어준다.
        // console.log(this.wheels); // Error
        console.log(Car5.wheels);
    };
    // wheels를 static으로 선언
    Car5.wheels = 4;
    return Car5;
}());
var Bmw4 = /** @class */ (function (_super) {
    __extends(Bmw4, _super);
    function Bmw4(color, name) {
        return _super.call(this, color, name) || this;
    }
    Bmw4.prototype.showName = function () {
        console.log(this.name);
    };
    return Bmw4;
}(Car5));
var z6 = new Bmw3("black", "zzzz4");
console.log(z6.name);
// static으로 선언 된 정적 멤버 변수나 메서드는 this가 아니라 클래스 명을 넣어준다.
// console.log(z6.wheels); // Error
console.log(Car5.wheels);
/* 추상 class */
// 추상 class는 class  앞에 abstract 키워드를 사용해서 만들 수 있다.
var Car6 = /** @class */ (function () {
    function Car6(color) {
        this.color = color;
    }
    Car6.prototype.start = function () {
        console.log("start");
    };
    return Car6;
}());
// 추상 class는 new를 이용해서 객체르 만들 수 없다.
// const car0 = naw Car6("red"); // Error
// 추상 class는 상속을 통해서만 사용이 가능하다.
var Bmw5 = /** @class */ (function (_super) {
    __extends(Bmw5, _super);
    function Bmw5(color) {
        return _super.call(this, color) || this;
    }
    // 구체적인 기능을 정해주면 에러가 사라진다.
    Bmw5.prototype.doSomething = function () {
        console.log(3);
    };
    return Bmw5;
}(Car6));
var z7 = new Bmw5("black");
/**************** #7 제네릭 Generics ****************/
// 제네릭을 이용하면 클래스나 함수, 인터페이스를 다양한 타입으로 재사용할 수 있다.
// 선언할 때는 타입 파라미터만 적어주고 생성하는 시점에 사용하는 타입을 결정한다.
// getSize 함수 만들고 배열 받기 // 배열의 크기는 number
// 매개 변수의 타입이 바뀌었는데 동일한 함수를 재사용하고 싶다면 
// 함수 오버로드를 사용하거나 유니온 타입 사용
// function getSize(arr: number[] | string[] | boolean[] | object[]):number { // 유니온 타입 사용
function getSize(arr) {
    // <> 안의 T는 x, a등을 적어줘도 상관없다. 
    // <> 안의 T는 어떤 타입을 전달 받아서 이 함수에서 사용할 수 있도록 한다.
    // 이 매개 변수의 타입은 T의 배열[] 이라고 적어준다.
    // 배열의 크기반환
    return arr.length;
}
// 사용하는 쪽에서 타입을 결정해준다.
// 굳이 <> 안에 기입하지 않아도 타입스크립트는 전달되는 매개 변수를 보고 어떤 타입인지 알고 있다.
// 숫자들로 이루어진 배열 전달
var arr1 = [1, 2, 3];
// getSize(arr1); // 3
getSize(arr1); // 3
// 특정 타입으로 강조하고 싶은 경우에는 이렇게 입력해도 상관없다.
getSize(arr1); // 3
// string으로 배열 만들기
var arr2 = ["a", "b", "c"];
// getSize(arr2); // 3
getSize(arr2); // 3
// 다른 타입들로 배열 만들기
var arr3 = [false, true, true];
// getSize(arr3); // 3
getSize(arr3); // 3
var arr4 = [{}, {}, { name: "Tim" }];
// getSize(arr4) // 3
getSize(arr4); // 3
// const m1: Mobile0<object> = {
var m1 = {
    name: "s21",
    price: 1000,
    option: {
        color: "red",
        coupon: false,
    },
};
var m2 = {
    name: "s20",
    price: 900,
    option: "good",
};
var user1 = { name: "a", age: 10 };
var car1 = { name: "bmw", color: "red" };
var book = { price: 3000 };
// showName0 함수는 매개 변수를 받아서 그 객체에 네임 프로퍼티를 리턴한다.
function showName0(data) {
    return data.name;
}
showName0(user1);
showName0(car1);
// showName0(book); // name이 없어서 에러가 난다.

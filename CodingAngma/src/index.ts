/**************** #1 타입스크립트를 쓰는 이유 ****************/

import { JSDocPublicTag } from "typescript";

console.log("Hello TypeScript!!")

// 함수로 만들 때 의도했던 방식 외에 다른 방법은 모두 에러로 표시
// 다른 사람이 만든 함수를 사용할 때 몇개의 인수를 어떤 타입으로 전달해야 하는지 일일이 코드를 뒤져볼 필요가 없다.

// function add(num1, num2) {
function add(num1:number, num2:number) {
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
function showItems(arr:number[]) {
    arr.forEach((item) => {
        console.log(item);
    });
}

showItems([1, 2, 3]);
// showItems(1, 2, 3);



/**************** #2 기본 타입 ****************/

// let car = 'bmw' // string를 쓰지 않아도 이미 string으로 알고있다. // type 추론
let car:string = 'bmw';

// let age = 30;
let age:number = 30;

// let isAdult = true;
let isAdult:boolean = true;

// let a = [1,2,3];
let a:number[] = [1,2,3];
let a2:Array<number> = [1,2,3];

// let week1 = ['mon', 'tue', 'wed'];
let week1:string[] = ['mon', 'tue', 'wed'];
// let week2 = ['mon', 'tue', 'wed'];
let week:Array<string> = ['mon', 'tue', 'wed'];

// week1.push(3); // Error


/* 튜플 (Tuple) */

// 배열과 비슷한 모양
// 인덱스 별로 타입이 다를 때 이용할 수 있다.
let b:[string, number]; // 배열의 첫 번째 요소는 string, 두 번째 요소는 number을 넣을 수 있다는 의미

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
function sayHello():void{
    console.log('hello');
}

// never은 항상 에러를 반환허거나 영원히 끝나지 않는 함수의 타입으로 사용할 수 있다.
// function showError(){
function showError():never{    
    throw new Error();
}

// function infLoop(){
    function infLoop():never{
    while(true) {
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

enum Os {
    Window = 'win',
    Ios = 'ios',
    Android = 'and'
}

// 특정 값만 입력할 수 있게 강조하고싶을때
// 그리고 그 값들이 공통점이 있을 때 enum을 사용하는 것이 좋다.
let myOs:Os;

myOs = Os.Window


/* null, undefined */

// let a0 = null;
let a0:null = null;
// let b0 = undefined;
let b0:undefined = undefined;



/**************** #3 인터페이스 ****************/

// let user:object;

// user = {
//     name : 'xx',
//     age : 30
// }

// console.log(user.name); // object에는 name이 없다

// 프로퍼티를 정해서 개체를 표현하고자 할 때 인터페이스를 사용한다.

type Score = 'A' | 'B' | 'C' | 'F';

interface User {
    name : string;
    age : number;
    gender? : string; // 옵셔널 : 입력을 해도 되고 안해도 되는 속성은 뒤에 ?를 붙여주면 된다.
    readonly birthYear: number;

    /* 학년별로 점수를 기입해주고 싶을 때 */
    // 1~4학년까지 인터페이스 정해주기
    // 에러가 나지 않게 하려면 모두 옵셔널하게 만들어 줄 수 밖에 없다.
    // 1? : string;
    // 2? : string;
    // 3? : string;
    // 4? : string;

    /* 모두 옵셔널하게 만들지 않고 문자열 인덱스 설명을 추가하는 방법 */
    // [grade:number] : string; // number를 key로 하고 string을 value로 받는 프로퍼티를 여러개 받을 수 있다.
    [grade:number] : Score; // string일 때는 어떠한 문자열도 입력할 수 있었지만 type Score로 선언 된 값 밖에는 입력할 수 없다. 

}

let user : User = {
    name : 'xx',
    age : 30,
    birthYear : 2000,
    // 1:'s', // Error
    1:'A',
    2:'B'
}

user.age = 10;
user.gender = "male" // gneder라는 프로퍼티를 쓸 때에는 무조건 string이어야 한다.
// user.birthYear = 1990; // 읽기 전용 속성이라 최초 생성할 때만 할당이 가능하고 이후에는 수정할 수 없다.

console.log(user.age);


/* interface로 함수 정의하기 */

// Add라는 인터페이스 만들기
interface Add {
    // 내부에 괄호, 인자값, 리턴값을 적어준다.
    // 더한 숫자 return
    (num1:number, num2:number) :number; 
}

// add0 이라는 함수를 만들고 위에서 만든 인터페이스로 정의해준다.
// 인터페이스에는 num1, num2라고 정의했지만 x, y로도 사용할 수 있다.
const add0 : Add = function(x, y){
    return x + y;
}

// add0(10, 20, 30); // Error
// add0(10, '20'); // Error
add0(10,20);


/* 나이를 받아서 성인인지 아닌지 Boolean 값을 리턴애 주는 함수 정의하기 */

interface isAdult {
    (age:number):boolean;
}

const a1:isAdult = (age) => {
    // 19보다 크면 true, 작으면 false를 반환
    return age > 19;
}

a1(33); // true


/* 인터페이스로 클래스 정의하기 */

// implements 키워드 사용

// Car 인터페이스 만들기
interface Car {
    color : string;
    wheels : number;
    start() : void;
}


// BMW 클래스 만들기
// Car에 있는 속성값을 모두 입력해야한다.
class BMW implements Car {
    // color = "red";
    color;
    wheels = 4;

    // constructor 사용
    constructor(c:string){
        this.color = c;
    }

    start() {
        console.log('go...');
    }
}

const b1 = new BMW('green');
console.log(b1);
b1.start();


/* 인터페이스 확장하기 */

// 인터페이스는 확장이 가능하다.
// extends 사용

// Car에 있는 속성값을 모두 입력해야한다.
interface Benz extends Car {
    door : number;
    stop() : void;
}

const benz : Benz = {
    door : 5,
    stop() {
        console.log('stop');
    },
    color : 'black',
    wheels : 4,
    start() {
        console.log('go...')
    }
}

// 여러개도 확장할 수 있다.
interface Toy {
    name : string;
}


/* Toy와 Car을 동시에 확장해서 ToyCar 만들기 */

interface ToyCar extends Car, Toy {
    price : number;
}



/**************** #4 함수 ****************/

// 각 매개변수의 타입을 입력해주고, 괄호 뒤에는 이 함수가 반환하는 타입을 입력해준다.
function add1(num1: number, num2: number): number {
    return num1 + num2;
}

// 아무것도 return 해주지 않으면 void로 입력한다.
function add2(num1: number, num2: number): void {
    // return num1 + num2;
    console.log(num1 + num2);
}

// boolean 타입 
function isAdult0(age: number): boolean {
    return age > 19;
}

// 인터페이스 처럼 함수에 매개 변수도 옵셔널로 지정할 수 있다.
// name이 없을 때를 대비한 코드가 있지만 타입스크립트에서는 보다 명시적으로 알려줘야한다.
// 옵셔널이라고 하더라도 타입은 항상 지켜줘야한다.
// undefind이거나 만약 있다면 string이거나 둘중에 하나.
function hello1(name?: string) { // name은 string // name은 있어도 되고 없어도 되는 옵셔널한 파라미터 // 선택적 매개 변수
    // name이 있으면 name을 쓰고 없으면 world를 출력
    return `Hello, ${name || "world"}`;
}


/* 자바스크립트에서 처럼 매개 변수에 디폴트 값 주기 */

function hello2(name = "world") {
    return `Hello, ${name}`;
}

const result = hello1(); 
const result2 = hello1("Sam");
// const result3 = hello0(123); // Error


/* 이름과 나이를 받아서 문자열을 출력 */

function hello3(name: string, age?: number):string { // age는 옵셔널 파라미터(입력을 해도 되고 안해도 된다.)

// name 앞에 age 가 오면 안 된다. 
// 이 둘의(선택적 매개 변수와 필수 매개변수) 자리를 바꾸면 에러 발생
// function hello3(age?: number, name: string): string { 

// age를 앞에 두고 옵셔널 하게 사용
// age를 number와 undefined를 받을 수 있게 해주고 명시적으로 undefined를 전달하는 방식으로 사용
// function hello3(age: number | undefined, name: string): string

    if(age !== undefined) { // 나이가 있을 때와 없을 때를 구분
        return `Hello, ${name}. You are ${age}.`;
    } else {
        return `Hello, ${name}`;
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
function add3(...nums: number[]) {
    return nums.reduce((result, num) => result + num, 0);
}

add3(1, 2, 3); // 6
add3(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); // 55


/* this */
interface User0 {
    name: string;
}

const Sam: User0 = {name:'Sam'}

// 타입 스크립트에서 this의 타입을 정할 때는 함수의 첫 번째 매개 변수 자리에 this를 쓰고 타입을 입력해준다.
// function showName(this:User0){
//     console.log(this.name)
// }

// 매개 변수가 있을 때
// a3에서 전달한 매개 변수는 this 다음부터 첫 번째(age) 두 번째(gender) 순서대로 적용된다.
function showName(this: User0, age: number, gender:'m' | 'f'){
    console.log(this.name, age, gender)
}

// bind를 이용해서 this를 Sam 객체로 강제한다.
const a3 = showName.bind(Sam);

// a3();
a3(30, 'm');

interface User1 {
    name: string;
    age : number;
}

// 동일한 함수지만 매개 변수에 타입이나 개수에 따라 다른 방식으로 동작해야 된다면 오버로드를 사용할 수 있다.
function join(name: string, age: number):User1;
function join(name: string, age: string):string;
function join(name:string, age:number | string): User1 | string {
    // age가 숫자라면
    if (typeof age === "number"){
        // User1을 return하고
        return {
            name,
            age,
        };
        // 아니라면 string을 리턴한다.
    } else {
        return " 나이는 숫자로 입력해주세요.";
    }
}

const sam: User1 = join("Sam", 30);
const jane: string = join("Jane", "30");



/**************** #5 리터럴, 유니온/교차 타입 ****************/


/* Literal Types */

// const : 변하지 않는 값을 선언할 때 사용
const userName1 = "Bob"; // Bob // string이지만 변할 수 없으니 Bob 이외의 값을 가질 수 없다.

// let : 변할 수 있는 값을 선언할 때 사용
// let userName2 = "Tom"; // string // Tom이지만 언제든 다른 값으로 변할 수 있으니 보다 넓은 개념의 string 타입으로 정의된다.
// userName2 = 3; // Error // 최초 할당 값이 string

// 숫자도 넣을 수 있게 하기
let userName2: string | number = "Tom";
userName2 = 3; 


type Job = "police" | "developer" | "teacher";

interface User2 {
    name : string;
    job : Job;
}

const user2:User2 = {
    name : "Bob",
    job : "developer", // Job에 있는 값만 사용할 수 있다.
};

interface HighSchoolStuendt {
    name : number | string;
    grade : 1 | 2 | 3; 
}


/* Union Types */

// 자동차
interface Car0 {
    // 이름
    name : "car"; // car 타입
    // 색상
    color : string;
    // 출발
    start() : void;
}

// 핸드폰 
interface Mobile {
    // 이름
    name : "mobile"; // mobile 타입
    // 색상
    color: string;
    // 전화
    call(): void;
}

// 동일한 속성의 타입을 다르게 해서 구분 할 수 있는 것을 식별 가능한 유니온 타입
function gerGift(gift: Car0 | Mobile){
    console.log(gift.color);
    if(gift.name === "car"){
        gift.start(); // Car0
    } else {
        gift.call(); // Mobile
    }
}


/* Intersection Types */

// 교차 타입
// 교차 타입은 여러 타입을 합쳐서 사용한다.
// Union이 A 또는 B 처럼 or의 의미였다면 교차 타입은 and를 의미한다.
// 교차 타입은 여러개의 타입을 하나로 합쳐주는 역할을 한다
// 그래서 필요한 모든 기능을 가진 하나의 타입이 만들어진다.

// 자동차
interface Car1 {
    name: string;
    start(): void;
}

// 장난감
interface Toy1 {
    name: string;
    color: string;
    price: number;
}

// 장난감 자동차
// 모든 속성을 다 기입 해주어야 한다.
const toyCar1: Toy1 & Car1 = {
    name : "타요", // 공통
    start() {}, // 자동차
    color: "blue", // 장난감
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
class Car2 {
    // color: string;
    constructor(public color: string) { // public 혹은 readonly를 적어준다.
        this.color = color;
    }
    start() {
        console.log("start");
    }
}

const bmw1 = new Car2("red");


/* 접근 제한자(Access modifier) - public, private, protected */

// public은 자식 클래스나 클래스 인스턴스에서 접근이 가능하다.
// 아무것도 표기하지 않고 작성하면 모두 public이다.

// ES6의 클래스는 다른 객체 지향 언어들처럼 접근체한자를 지원하지 않는다.
// 하지만 타입스크립트에서는 지원한다.
class Car3 {
    name: string = "car"; // 아무것도 적지 않으면 public과 같다.

    // name을 수정할 수 없게 하려면 readonly 키워드를 사용한다.
    // readonly name :string = "car";

    // public name: string = "car"; // public은 자식클래스, class extends 모두 접근할 수 있다.

    // protected name: string = "car"; // 자식 클래스 내부에서는 접근할 수 있으나 class extends 로는 접근할 수 없다.

    // private name: string = "car"; // 자식 클래스 내부에서 사용할 수 없다.
    // #name: string = "car"; // privated와 같은 기능

    color: string;
    constructor(color: string) {
        this.color = color;
    }
    start() {
        console.log("start");
        console.log(this.name);
        // console.log(this.#name);
    }
}

class Bmw2 extends Car3 {
    constructor(color: string) {
        // super로 호출하지 않으면 에러 발생
        super(color);
    }
    // Car3의 name이 public이기 때문에 자식 클래스에서 접근해도 문제없이 사용할 수 있다.
    showName() {
        console.log(this.name);
        // console.log(this.#name); 
    }
}

const z4 = new Bmw2("black");
console.log(z4.name);
z4.name = "zzzz4";


// name을 수정할 수 없게 하려면 readonly 키워드를 사용한다.
class Car4 {
    readonly name :string = "car";
    color: string;
    constructor(color: string, name: string) {
        this.color = color;
        this.name = name;
    }
    start() {
        console.log("start");
        console.log(this.name);
    }
}

class Bmw3 extends Car4 {
    constructor(color: string, name: string) {
        super(color, name);
    }
    showName() {
        console.log(this.name);

    }
}

const z5 = new Bmw3("black", "zzzz4");
console.log(z5.name);
// 54.name = "zzzz4";


/* static 프로퍼티 */

// static을 쓰면 정적 멤버변수를 만들 수 있다.
// Class. 으로 접근 가능
class Car5 {
    readonly name :string = "car";
    color: string;
    // wheels를 static으로 선언
    static wheels = 4;
    constructor(color: string, name: string) {
        this.color = color;
        this.name = name;
    }
    start() {
        console.log("start");
        console.log(this.name);

        // static으로 선언 된 정적 멤버 변수나 메서드는 this가 아니라 클래스 명을 넣어준다.
        // console.log(this.wheels); // Error
        console.log(Car5.wheels);

    }
}

class Bmw4 extends Car5 {
    constructor(color: string, name: string) {
        super(color, name);
    }
    showName() {
        console.log(this.name);

    }
}

const z6 = new Bmw3("black", "zzzz4");
console.log(z6.name);
// static으로 선언 된 정적 멤버 변수나 메서드는 this가 아니라 클래스 명을 넣어준다.
// console.log(z6.wheels); // Error
console.log(Car5.wheels);


/* 추상 class */

// 추상 class는 class  앞에 abstract 키워드를 사용해서 만들 수 있다.
abstract class Car6 {
    color: string;
    constructor(color: string) {
        this.color = color;
    }
    start() {
        console.log("start");
    }
    // 아무 작업도 하지 않는 메서드 생성 // abstract 붙여주기
    // 자식 클래스 에러가 난다.
    // 추상 class 내부에 추상 메서드는 반드시 상속받은 쪽에서 구체적인 구현을 해주어야 한다.
    // 추상은 이렇게 프로퍼티나 메서드의 이름만 선언해주고 구체적인 기능은 상속 받는 쪽에서 구현해 주는 것을 의미한다.
    // 추상 클래스를 상속받아 만든 수많은 객체들이 동일하게 이 메서드를 가지고 있겠지만 구체적인 기능은 가지각색 일 수 있다. 
    abstract doSomething():void;
}

// 추상 class는 new를 이용해서 객체르 만들 수 없다.
// const car0 = naw Car6("red"); // Error

// 추상 class는 상속을 통해서만 사용이 가능하다.
class Bmw5 extends Car6 {
    constructor(color: string) {
        super(color);
    }
    // 구체적인 기능을 정해주면 에러가 사라진다.
    doSomething() {
        console.log(3);
    }
}

const z7 = new Bmw5("black");



/**************** #7 제네릭 Generics ****************/

// 제네릭을 이용하면 클래스나 함수, 인터페이스를 다양한 타입으로 재사용할 수 있다.
// 선언할 때는 타입 파라미터만 적어주고 생성하는 시점에 사용하는 타입을 결정한다.

// getSize 함수 만들고 배열 받기 // 배열의 크기는 number
// 매개 변수의 타입이 바뀌었는데 동일한 함수를 재사용하고 싶다면 
// 함수 오버로드를 사용하거나 유니온 타입 사용

// function getSize(arr: number[] | string[] | boolean[] | object[]):number { // 유니온 타입 사용

function getSize<T>(arr: T[]): number{ // 제네릭 사용 
// <> 안의 T는 x, a등을 적어줘도 상관없다. 
// <> 안의 T는 어떤 타입을 전달 받아서 이 함수에서 사용할 수 있도록 한다.
// 이 매개 변수의 타입은 T의 배열[] 이라고 적어준다.

    // 배열의 크기반환
    return arr.length;
}

// 사용하는 쪽에서 타입을 결정해준다.
// 굳이 <> 안에 기입하지 않아도 타입스크립트는 전달되는 매개 변수를 보고 어떤 타입인지 알고 있다.

// 숫자들로 이루어진 배열 전달
const arr1 = [1, 2, 3];
// getSize(arr1); // 3
getSize<number>(arr1); // 3

// 특정 타입으로 강조하고 싶은 경우에는 이렇게 입력해도 상관없다.
getSize<number | string>(arr1); // 3

// string으로 배열 만들기
const arr2 = ["a", "b", "c"];
// getSize(arr2); // 3
getSize<string>(arr2); // 3

// 다른 타입들로 배열 만들기
const arr3 = [false, true, true];
// getSize(arr3); // 3
getSize<boolean>(arr3); // 3

const arr4 = [ {}, {}, { name: "Tim" }];
// getSize(arr4) // 3
getSize<object>(arr4); // 3


/* 인터페이스에서 사용 */

// Mobile0 클래스 생성
interface Mobile0<T> {
    // 이름
    name: string;
    // 가격
    price: number;
    // 옵션 // 옵션에는 어던 데이터가 들어올 지 모르는 상태 
    // string가 올 수도 있고 객체가 올 수 도 있다. 
    // boolean이 오거나 옵션이 없으면 null이나 undefined가 올 수도 있다.
    // 위에 나열 된 모든 타입을 적는 것은 비 효율적이기 때문에 제네릭을 사용한다.
    // option: any;
    option: T;
}

// const m1: Mobile0<object> = {
    const m1: Mobile0<{ color: string; coupon: boolean}> = { // 옵션 객체의 모습이 정해져 있을때는 이렇게 사용
    name: "s21",
    price: 1000,
    option: {
        color: "red",
        coupon: false,
    },
};

const m2: Mobile0<string> = {
    name: "s20",
    price: 900,
    option: "good",
};

interface User3 {
    name: string;
    age: number;
}

interface Car7 {
    name: string;
    color: string;
}

interface Book {
    price: number;
}

const user1: User3 = { name: "a", age: 10 };
const car1: Car7 = { name: "bmw", color: "red" };
const book: Book = { price: 3000 };

// showName0 함수는 매개 변수를 받아서 그 객체에 네임 프로퍼티를 리턴한다.
function showName0<T extends{ name: string }>(data:T): string { // 어떤 T 타입이 올 건데 그 타입은 네임이 string인 객체를 확장한 형태이다. 라고 알려준다.
    return data.name;
}

showName0(user1);
showName0(car1);
// showName0(book); // name이 없어서 에러가 난다.



/**************** #8 유틸리티 타입 Utility Types ****************/


/* keyof */

interface User4 {
    id: number;
    name: string;
    age: number;
    gender: "m" | "f";
}

// keyof 키워드를 사용하면 유저 인터페이스 키 값들을 유니온 형태로 받을 수 있다.
type UserKey = keyof User4; // 'id' | 'name' | 'age' | 'gender'

// const uk:UserKey = ""; // Error
const uk:UserKey = "id"; // 유저 인터페이스 값 중 하나를 입력하면 에러가 사라진다.


/* Partial<T> */

// Partial은 프로퍼티를 모두 옵셔널로 바꿔준다.
// 그래서 일부만 사용하는 것이 가능하다.
interface User5 {
    id: number;
    name: string;
    age: number;
    gender: "m" | "f";
}

// Partial을 사용하면 interface User5 {} 는 이런 형태가 된다.
// interface User5 {
//     id?: number;
//     name?: string;
//     age?: number;
//     gender?: "m" | "f";
// }

let admin: Partial<User5> = {
    id: 1,
    name: "Bob",

    // User5 에 없는 프로퍼티를 사용하려고 하면 에러가 난다.
    // job:"" // Error
};


/* Required<T> */

interface User6 {
    id: number;
    name: string;
    age?: number;
}

let admin0: Required<User6> = {
    id: 1,
    name: "Bob",

    // Required<> 를 넣으면 ?여도 필수 프로퍼티가 된다.
    age: 30,
};


/* Readonly<T> */

interface User7 {
    id: number;
    name: string;
    age?: number;
}

let admin1: Readonly<User7> = {
    id: 1,
    name: "Bob",
};

// Roadonly를 사용하면 처음에 할당만 가능하고 수정은 불가능해진다.
// admin1.id = 4


/* Record<K,T> */

// K는 Key T는 Type

// 1학년 부터 4학년 까지 점수르 입력 받는 객체 만들기

// interface Score0 {
//     "1": "A" | "B" | "C" | "D";
//     "2": "A" | "B" | "C" | "D";
//     "3": "A" | "B" | "C" | "D";
//     "4": "A" | "B" | "C" | "D";
// }

// const score: Score0 = {
//     1 : 'A',
//     2 : 'C',
//     3 : 'B',
//     4 : 'D',
// };

// Record로 활용하기
// Key 값 1~4까지 적어주기
// Type 값 적어주기
// const score: Record<"1" | "2" | "3" | "4", "A" | "B" | "C" | "D"> = {
//     1 : 'A',
//     2 : 'C',
//     3 : 'B',
//     4 : 'D',
// };

// 학년 부분과 성적 부분을 Type으로 분리하기
type Grade0 = "1" | "2" | "3" | "4"; // key로 사용
type Score0 = "A" | "B" | "C" | "D" | "F"; // type으로 사용 // "F" 추가도 가능

const score: Record<Grade0, Score0> = {
    1 : 'A',
    2 : 'C',
    3 : 'B',
    4 : 'D',
};


interface User8 {
    id: number;
    name: string;
    age: number;
}

// 적절한 값이 입력되었는지 체크하는 함수 만들기
function isValid(user: User8) {
    // 결과 객체 받기
    const result:Record<keyof User8, boolean> = { 
        // user의 아이디가 0 보다 큰지
        id : user.id > 0,
        // user의 아이디가 빈 값이 아닌지
        name : user.name !== "",
        // user의 나이가 0보다 큰지
        age : user.age > 0,
    };
    // 결과를 리턴
    return result;
}


/* Pick<T,K> */

// T 타입에서 K 프로퍼티만 골라서 사용한다.

interface User9 {
    id: number;
    name: string;
    age: number;
    gender: "M" | "W";
}

// Pick<User9, "id" | "name"> 입력해 주면 User9 에서 id와 name만 가지고 와서 사용할 수 있다.
const admin2: Pick<User9, "id" | "name"> = {
    id: 0,
    name: "Bob",

};


/* Omit<T,K> */

// 특정 프로퍼티를 생략하고 쓸 수 있다.

interface User10 {
    id : number;
    name: string;
    age: number;
    gender: "M" | "W";
}

// age와 gender은 제외되고 id와 name만 사용
const admin3: Omit<User10, "age" | "gender"> = {
    id : 0,
    name: "Bob",
};


/* Exclude<T1, T2> */

// Type1 에서 Type2를 제와하고 사용하는 방식
// Omit 과 다른점은 Omit은 프로퍼티들을 제거 
// Exclude는 타입으로 제거한다.

// T1의 타입들 중에서 T2 타입과 겹치는 타입을 제외 시킨다.

// T1이 string | number 라고 할 때
type T1 = string | number; 
// T2는 Exclude T1에서 number를 제외
type T2 = Exclude<T1, number>; 


type T3 = string | number | boolean;
// boolean만 남게 된다.
type T4 = Exclude<T3, number | string>;


/* NonNullable<Type> */

// Null을 제외한 타입을 생성한다.
// undefined도 함께 제외시킨다.

type T5 = string | null | undefined | void;
// string과 void만 남게 된다.
type T6 = NonNullable<T5>;
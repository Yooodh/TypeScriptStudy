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
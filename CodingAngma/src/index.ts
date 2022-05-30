/*********** #1 타입스크립트를 쓰는 이유 ***********/

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


/*********** #2 기본 타입 ***********/

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

/*********** #3 인터페이스 ***********/

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

// Toy와 Car을 동시에 확장해서 ToyCar 만들기
interface ToyCar extends Car, Toy {
    price : number;
}
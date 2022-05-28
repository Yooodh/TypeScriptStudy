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
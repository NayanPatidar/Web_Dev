let a: number = 3;
// console.log(a);

function greet(firstName: string) {
  console.log(`Hello ${firstName}`);
}

// greet("Nayan");

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function doSomething(keyPressed: Direction) {
  if (keyPressed == Direction.Right) {
    console.log(keyPressed);
  }
}

// doSomething(Direction.Right);

type Input = string | number;

function firstElement(arr: Input[]): Input {
  return arr[0];
}

const value = firstElement(["Nayan", "Patidar"]);
// console.log();

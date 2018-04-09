
//Global Variables
let money = 0;

//Construcor Function for assignments

class Assignments {
  constructor(max, pay, assignment) {
    this.assignment = assignment;
    this.max = max;
    this.earnings = pay;
  }

  increase(increase = 1) {
    let progressVal = 0;
    let loc = 0;
    let max = this.max;
    let earning = this.earnings;

    return () => {
      const assignment = document.querySelector('.assignment');
      const progress = assignment.querySelector('.progress');
      const text = assignment.querySelector('.assign-text');
      console.log(max);

      if(loc < max){
        console.log('you');
        progressVal += 100/max*increase;
        loc += increase;
        progress.style.width = `${progressVal}%`;
        text.textContent = `This is the first Task ${loc}/${max}`;
      }

       if(loc == max){
         loc += increase;
        const moneyElem = document.querySelector('.money');
        text.textContent = 'Finished';
        money += earning;
        moneyElem.textContent = `${money}$`;
        taskOne = null;
      }
    }
  }
}

//Adding the function to increase LoC count to the Constructors Prototype


//Test
let taskOne = new Assignments(10, 10, 'The first Assignment');
let taskTwo = new Assignments(10, 10, 'The Second Assignment');

//LoC Button Event Handler
const locButton = document.querySelector('.loc');
locButton.addEventListener('click', taskOne.increase(2));


//Global Variables
let money = 0;
let availableTasks  =  [];

//Construcor Function for assignments

class Assignments {
  constructor(codeSize, pay, assignment) {
    this.assignment = assignment;
    this.codeSize = codeSize;
    this.earnings = pay;
  }

  increase(increase = 1) {
    let progressVal = 0;
    let loc = 0;
    let codeSize = this.codeSize;
    let earning = this.earnings;

    return () => {
      const assignment = document.querySelector('.assignment');
      const progress = assignment.querySelector('.progress');
      const text = assignment.querySelector('.assign-text');
      console.log(codeSize);

      if(loc < codeSize){
        console.log('you');
        progressVal += 100/codeSize*increase;
        loc += increase;
        progress.style.width = `${progressVal}%`;
        text.textContent = `This is the first Task ${loc}/${codeSize}`;
      }

       if(loc == codeSize){
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

//Function to add the Available Tasks to the DOM

function addTaskToDom(object) {
  const tasksElement = document.querySelector('.secondary');
  const container = document.createElement('div');
  container.className = 'available-tasks';

  container.innerHTML = `${object.assignment} <br><br>
                        Scale: ${object.codeSize} LoC <br>
                        Reward: ${object.earnings}$`;
  tasksElement.appendChild(container);
}

//Test
let taskOne = new Assignments(10, 10, 'The first Assignment');
let taskTwo = new Assignments(10, 10, 'The Second Assignment');
let taskThree = new Assignments(10, 10, 'The Third Assignment');

availableTasks.push(taskOne);
availableTasks.push(taskTwo);
availableTasks.push(taskThree);

(() => {
  for(let task of availableTasks){
    addTaskToDom(task);
  }
})()

//LoC Button Event Handler
const locButton = document.querySelector('.loc');
locButton.addEventListener('click', taskOne.increase(2));

console.log(client);

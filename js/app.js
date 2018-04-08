let money = 0;

function increaseAssignment(max, earning) {
  let progressVal = 0;
  let loc = 0;

  return function() {
    const assignment = document.querySelector('.assignment');
    const progress = assignment.querySelector('.progress');
    const text = assignment.querySelector('.assign-text');
    console.log(max);

    if(loc < max){
      console.log('you');
      progressVal += 100/max;
      loc++;
      progress.style.width = `${progressVal}%`;
      text.textContent = `This is the first Task ${loc}/${max}`;
    }

     if(loc == max){
       loc++;
      const moneyElem = document.querySelector('.money');
      text.textContent = 'Finished';
      money += earning;
      moneyElem.textContent = `${money}$`;
      taskOne= null;
    }
  }
}

let taskOne = increaseAssignment(10, 10);

const locButton = document.querySelector('.loc');
locButton.addEventListener('click', taskOne);

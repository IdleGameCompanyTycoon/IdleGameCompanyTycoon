//Class to create new contracts
class Contracts {
  constructor(codeSize, pay, assignment, descr) {
    this.assignment = assignment;
    this.codeSize = codeSize;
    this.earnings = pay;
    this.description = descr;
    this.progressVal = 0;
    this.progressCode = 0;
    this.domElem = gameApp.newContractDomElem(this);
  }

  increase(increase = 1) {

    let loc = 0;
    let codeSize = this.codeSize;
    let earning = this.earnings;

    return () => {

      if(loc < codeSize){
        this.progressVal += 100/codeSize*increase;
        loc += increase;
      }

       if(loc == codeSize){
         loc += increase;
        model.money += earning;
      }
    }
  }
}



//Fetch requests
const dataRequests = {
  getContract: function () {
          return fetch('/getData', {
                    method: 'GET',
                    })
        }

}



// Model for Data
const model = {
    money: 0,
    availableContracts: [],
    activeContracts: [],
    createContract: function(obj){
      return new Contracts(obj.codesize, obj.payment, obj.contract, obj.description);
    },

    deleteFromArray: function(arr, object){
      let i = arr.indexOf(object);
      arr.splice(i, 1);
    }
}



//Controller for communication between model and view
class GameController {
  constructor(gameView) {
    this.gameView = gameView;
  }

  //Create a new Contract Dom element
  newContractDomElem(obj) {
    return this.gameView.createNewContractDom(obj);
  }

  //Get all available tasks from the model
  getAvailableContracts() {
    return model.availableContracts;
  }

  //Get all active tasks from the model
  getActiveContracts() {
    return model.activeContracts;
  }

  //Get the money
  getMoney() {
    return model.money;
  }

  //Create contract interval
  createContracts() {
    setInterval(function() {
      if(model.availableContracts.length < 6) {
        dataRequests.getContract()
                    .then(response => response.json())
                    .then(response => {
                        const obj = response.rows[0];
                        const newContract = model.createContract(obj);
                        model.availableContracts.push(newContract);
                        gameApp.gameView.addAvailableContracts(newContract);
                        })
      }
    }, 10000)
  }

  //Function to accept an contract
  contractAccepted(elem) {
    let contractObject = model.availableContracts.find(obj => obj.domElem === elem.closest('div'));
    model.deleteFromArray(model.availableContracts, contractObject);
    contractObject.domElem = this.gameView.createActiveContractDom(contractObject);
    model.activeContracts.push(contractObject);
    this.gameView.removeElem(elem.closest('div'));
    this.gameView.addActiveContracts(contractObject);
  }

  //Handles all click events
  clickHandler(evt) {
    if (evt.target.classList.contains('fa-check', 'accept-contract-button')) {
      let elem = evt.target;
      gameApp.contractAccepted(elem);
    }
  }

  init() {
    this.gameView.init();
    this.createContracts();
  }
}



//View rendering
class GameView {
  init() {
    const allAvailableContracts = gameApp.getAvailableContracts();
    allAvailableContracts.forEach(obj => this.addAvailableContracts(obj));
  }

  //Creates new Dom element for contracts
  createNewContractDom(object) {
    const container = document.createElement('div');
    const text = document.createElement('p');
    const button = document.createElement('i');
    container.className = 'available-tasks';

    text.innerHTML = `${object.assignment} <br><br>
                          Scale: ${object.codeSize} LoC <br>
                          Reward: ${object.earnings}$`;
    button.setAttribute('class', 'fas fa-check accept-contract-button')

    container.append(text, button);

    return container;
  }

  //Creates active dom element for Contracts
  createActiveContractDom(object) {
    const newActiveContract = document.createElement('div');
    const newProgressBar = document.createElement('div');
    const newContractText = document.createElement('span');

    newActiveContract.classList.add('assignment');
    newProgressBar.classList.add('progress');
    newContractText.classList.add('assign-text');

    newContractText.textContent = `${object.assignment} ${object.progressCode}/${object.codeSize}`;

    newActiveContract.append(newProgressBar, newContractText);

    return newActiveContract;
  }

  //Add available Task to domElem
  addAvailableContracts(obj) {
    document.querySelector('.secondary').appendChild(obj.domElem);
  }

  //Add active tasks to dom
  addActiveContracts(obj) {
    document.querySelector('.assignments').appendChild(obj.domElem);
  }

  //Remove dom elemen
  removeElem(elem) {
    elem.remove();
  }
}


//Init everything
const gameView = new GameView();
const gameApp = new GameController(gameView);

gameApp.init();

//eventlistener for all clicks
document.querySelector('body').addEventListener('click', gameApp.clickHandler);

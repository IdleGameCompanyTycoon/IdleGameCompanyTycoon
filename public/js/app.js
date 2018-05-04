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
    const that = this;

    //Will be esecuted if the contract hasn't met its target yet
    if(that.progressCode < that.codeSize){
      that.progressVal += 100/that.codeSize*increase;
      that.progressCode += increase;
    }

    //Will be executed when the contract is finished
    if(that.progressCode == that.codeSize){
      that.progressCode += increase;
      model.money += that.earnings;
      return 'finished';
    }

    return 'in progress';
  }
}

//Class for employees

class Employee {
  constructor(firtsName, lastName, img, job) {
    this.firstName = firtsName;
    this.lastName = lastName;
    this.picture = img;
    this.job = job;
  }
}

//Subclass for developers

class Developer extends Employee {
  constructor(firstName = 'Max', lastName = 'Mustermann', img = '') {
    super(firstName, lastName, img, 'Developer');
    this.skills = new Skills();
    this.domElem = gameApp.newApplicationDomElem(this);
  }
}

//Class for Employee skills

class Skills {
  constructor() {
    this.speed = this.randomVal();
    this.social = this.randomVal();

    //Game Developement skills
    this.action = this.randomVal();
    this.strategie = this.randomVal();
    this.puzzle = this.randomVal();
    this.tycoon = this.randomVal();
    this.shoote = this.randomVal();
    this.jumpNrun = this.randomVal();
  }

  randomVal() {
    return Number(Math.random().toFixed(2));
  }
}

//Fetch requests
const dataRequests = {
  getRandomEntry: function (table) {
          return fetch(`/getData?table=${table}`, {
                    method: 'GET',
                    })
        }

}



// Model for Data
const model = {
    money: 0,
    availableContracts: [],
    activeContracts: [],
    availableApplications: [],
    createContract: function(obj){
      return new Contracts(obj.codesize, obj.payment, obj.contract, obj.description);
    },

    createEmployee: function(obj) {
      return new Developer(obj.firstname, obj.lastname, obj.picture);
    },

    //Function to delete an object from an Array
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

  //newApplicationElement
  newApplicationDomElem(obj) {
    return this.gameView.createNewApplicationDom(obj);
  }

  //Get all available tasks from the model
  getAvailableContracts() {
    return model.availableContracts;
  }

  //Get all active tasks from the model
  getActiveContracts() {
    return model.activeContracts;
  }

  getAvailableApplications() {
    return model.availableApplications;
  }

  //Get the money
  getMoney() {
    return model.money;
  }

  //Create contract interval
  createContracts() {
    const that = this;
    const min = 5,
    max = 30;
    let rand = Math.floor(Math.random() * (max - min + 1) + min);

    setTimeout(function() {
      if(model.availableContracts.length < 6) {
        dataRequests.getRandomEntry('contracts')
                    .then(response => response.json())
                    .then(response => {
                        const obj = response.rows[0];
                        const newContract = model.createContract(obj);
                        model.availableContracts.push(newContract);
                        gameApp.gameView.addAvailableContracts(newContract);
                        })
      }

      that.createContracts();
    }, rand*1000)
  }

  //Create Available applications
  createApplications() {

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

  //Function for to add LoC to contract
  addLoc() {
    const activeContract = document.querySelector('.assignment');

    if (activeContract != undefined){
      let contractObject = model.activeContracts.find(obj => obj.domElem === activeContract);
      const statusCon = contractObject.increase();

      if (statusCon == 'in progress') {
        gameApp.gameView.progressBar(contractObject);
      }

      else if (statusCon == 'finished') {
        model.deleteFromArray(model.activeContracts, contractObject)
        gameApp.gameView.removeElem(contractObject.domElem);
        contractObject = null;
        gameApp.gameView.updateMoney();
      }
    }
  }

  //Handles all click events
  clickHandler(evt) {
    if (evt.target.classList.contains('fa-check', 'accept-contract-button')) {
      let elem = evt.target;
      gameApp.contractAccepted(elem);
    }

    if (evt.target.classList.contains('loc')) {
      gameApp.addLoc();
    }

    if (evt.target.classList.contains('nav-button')) {
      let elem = evt.target;
      gameApp.gameView.changeMenue(elem);
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

  //Creates a new dom element for Employee applications
  createNewApplicationDom(object) {
    const container = document.createElement('div');
    const text = document.createElement('p');
    const button = document.createElement('i');
    const picture = document.createElement('img');
    container.className = 'available-applications';
    picture.setAttribute('src', object.picture);

    text.innerHTML = `${object.firstName} ${object.lastName}<br><br>
                          Job: ${object.job}`;
    button.setAttribute('class', 'fas fa-check accept-contract-button')

    container.append(text, picture, button);

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
    const target = document.querySelector('.available-contracts-menue');
    if (target != undefined) {
      target.appendChild(obj.domElem);
    }
  }

  //Add active tasks to dom
  addActiveContracts(obj) {
    const target = document.querySelector('.assignments');
    if (target != undefined) {
      target.appendChild(obj.domElem);
    }
  }

  // General add to dom function
  addToDom(obj, target) {
    const targetElem = document.querySelector(target);

    if (targetElem != undefined) {
      targetElem.appendChild(obj.domElem);
    }
  }

  //Remove dom elemen
  removeElem(elem) {
    elem.remove();
  }

  //Change panel
  changeMenue(elem) {
    const that = this;
    const menue = elem.parentElement;
    let panel,
        parent;

    if (menue.classList.contains('first-nav')) {
      parent = document.querySelector('.second-panel');
      panel = parent.children[0];
      setTimeout(that.renderHandlerSecondaryMenue(), 0);
    }
    else if (menue.classList.contains('second-nav')) {
      parent = document.querySelector('main');
      panel = parent.children[0];
    }
    const newPanelClass = elem.classList[1] + '-menue';

    const newPanel = document.createElement('div');
    newPanel.classList.add(newPanelClass);
    panel.remove();

    parent.appendChild(newPanel);
  }

  //Update money
  updateMoney() {
    const money = gameApp.getMoney();
    document.querySelector('.money').textContent = `${money}$`;
  }

  //Adjust progress bar
  progressBar(obj) {
    const elem = obj.domElem;
    const progress = elem.querySelector('.progress');
    const text = elem.querySelector('.assign-text');

    progress.style.width = `${obj.progressVal}%`;
    text.textContent = `${obj.assignment} ${obj.progressCode}/${obj.codeSize}`;
  }

  //Function to handle render actions
  renderHandlerSecondaryMenue() {
    const that = this;
    const menue = document.querySelector('.second-panel').children[0].classList;
    if (menue.contains('available-contracts-menue')) {
      const data = that.getAvailableApplications();
      that.renderLoop(data, '.available-contracts-menue');
    }
  }

  //Loops through the elements of an array and adds them to the dom
  renderLoop(arr, target) {
    const that = this;
    for (let val of arr) {
      that.addToDom(val, target);
    }
  }
}


//Init everything
const gameView = new GameView();
const gameApp = new GameController(gameView);

gameApp.init();

//eventlistener for all clicks
document.querySelector('body').addEventListener('click', gameApp.clickHandler);

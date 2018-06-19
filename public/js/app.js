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

    //Will be esecuted if the contract hasn't met its target yet
    if(this.progressCode < this.codeSize){
      this.progressVal += 100/this.codeSize*increase;
      this.progressCode += increase;
    }

    //Will be executed when the contract is finished
    if(this.progressCode == this.codeSize){
      this.progressCode += increase;
      model.money += this.earnings;
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
    this.salary = 1;
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
    activeEmployees: [],
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
                        gameApp.gameView.addToDom(newContract.domElem, '.available-contracts-menue');
                        })
      }

      that.createContracts();
    }, rand*1000)
  }

  //Create Available applications
  createApplications() {
    const that = this;
    const min = 5,
    max = 30;
    let rand = Math.floor(Math.random() * (max - min + 1) + min);

    setTimeout(function() {
      if(model.availableContracts.length < 6) {
        dataRequests.getRandomEntry('employees')
                    .then(response => response.json())
                    .then(response => {
                        const obj = response.rows[0];
                        const newApplicant = model.createEmployee(obj);
                        model.availableApplications.push(newApplicant);
                        gameApp.gameView.addToDom(newApplicant.domElem, '.applications-menue');
                        })
      }

        that.createApplications();
    }, rand*1000)
  }

  //Function to accept an contract
  contractAccepted(elem) {
    let contractObject = model.availableContracts.find(obj => obj.domElem === elem.closest('div'));
    model.deleteFromArray(model.availableContracts, contractObject);
    contractObject.domElem = gameApp.gameView.createActiveContractDom(contractObject);
    model.activeContracts.push(contractObject);
    gameApp.gameView.removeElem(elem.closest('div'));
    let currentContract = document.querySelector('div.current-contract .assignment')

    if (currentContract == undefined) {
      gameApp.gameView.addToDom(contractObject.domElem, '.current-contract');
    } else {
      gameApp.gameView.addToDom(contractObject.domElem, '.accepted-contract');
    }

  }

  employeeAccepted(elem) {
    let contractObject = model.availableContracts.find(obj => obj.domElem === elem.closest('div'));
    model.deleteFromArray(model.availableContracts, contractObject);
    contractObject.domElem = gameApp.gameView.createActiveContractDom(contractObject);
    model.activeContracts.push(contractObject);
    gameApp.gameView.removeElem(elem.closest('div'));
  }

  //Function for to add LoC to contract
  addLoc() {
      const activeContract = document.querySelector('div.current-contract .assignment');

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

        let nextContract = document.querySelector('div.accepted-contract .assignment');
        if (nextContract === null) return;
        gameApp.gameView.addToDom(nextContract, '.current-contract');
      }
    }
  }

  //Function for activating one contract
  activateContract(evt) {

    let currentContract = document.querySelector('div.current-contract .assignment');

    if (currentContract == undefined)
    {
      gameApp.gameView.addToDom(evt.target.parentElement, '.current-contract');

    } else {
      gameApp.gameView.addToDom(currentContract, '.accepted-contract');
      gameApp.gameView.addToDom(evt.target.parentElement, '.current-contract');
    }

  }

  //Loop functions

  /*    TODO: Make the Monthly Loop work, pay salaries and other monthly costs, events and so on IMPORTANT -> Make it work via the game loop so the game loop
        and the months are in sync.
        TODO: Make the Game Loop work for the code that has to run every second, like LoC Generation  */

  //Function which gets called every "month"
  monthLoop() {

  }

  //Gameloop to simulate work and sales
  gameLoop() {

  }

  //Handles all click events
  clickHandler(evt) {
    if (evt.target.classList.contains('fa-check')) {
      gameApp.eventHandler(evt);
    }

    if (evt.target.classList.contains('assignment') || evt.target.parentElement.classList.contains('assignment')) {
      gameApp.activateContract(evt);
    }

    if (evt.target.classList.contains('loc')) {
      gameApp.addLoc();
    }

    if (evt.target.classList.contains('nav-button')) {
      let elem = evt.target;
      gameApp.gameView.changeMenue(elem);
    }
  }

  //Custome Event Handler for the Buttons
  eventHandler(evt)  {
    //Object to store the different events and function calls associated with them
    let eventsObj = {
      'accept-contract-button' : gameApp.contractAccepted,
    }

    //Call the event selected by the class of the clicked button
    eventsObj[evt.target.classList[2]](evt.target);
  }

  init() {
    this.gameView.init();
    this.createContracts();
    this.createApplications();
  }
}



//View rendering
class GameView {
  init() {
    this.createContractCategorys();
  }


  //Creates the contract categorys for main
  createContractCategorys() {
    var current = document.createElement('p');
    current.innerHTML = `<h2>Current Contract</h2><br>`;
    document.querySelector('.current-contract').appendChild(current);

    var accepted = document.createElement('p');
    accepted.innerHTML = `<br><h2>All Contracts</h2><br>`;
    document.querySelector('.accepted-contract').appendChild(accepted);
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
    button.setAttribute('class', 'fas fa-check accept-contract-button accept-button')

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
    button.setAttribute('class', 'fas fa-check accept-application-button accept button')

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

  createActiveEmployeeDom(object) {
    const newActiveEmployee = document.createElement('div');
    const text = document.createElement('p');
    const picture = document.createElement('img');
    newActiveEmployee.className = 'available-applications';
    picture.setAttribute('src', object.picture);

    text.innerHTML = `${object.firstName} ${object.lastName}<br><br>
                          Job: ${object.job}`;


    return newActiveEmployee;
  }

  // General add to dom function
  addToDom(elem, target) {
    const targetElem = document.querySelector(target);

    if (targetElem != undefined) {
      targetElem.appendChild(elem);
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
        parent,
        navMenueFunction;

    if (menue.classList.contains('first-nav')) {
      parent = document.querySelector('.second-panel');
      panel = parent.children[0];
      navMenueFunction = that.renderHandlerSecondaryMenue;
    }
    else if (menue.classList.contains('second-nav')) {
      parent = document.querySelector('main');
      panel = parent.children[0];
      navMenueFunction = that.renderHandlerMainMenue;
    }
    const newPanelClass = elem.classList[1] + '-menue';

    const newPanel = document.createElement('div');
    newPanel.classList.add(newPanelClass);
    panel.remove();

    parent.appendChild(newPanel);

    navMenueFunction();
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
    const menue = document.querySelector('.second-panel').children[0];
    if (menue.classList.contains('available-contracts-menue')) {
      const data = gameApp.getAvailableContracts();
      gameApp.gameView.renderLoop(data, '.available-contracts-menue');
    }

    if (menue.classList.contains('applications-menue')) {
      const data = gameApp.getAvailableApplications();
      gameApp.gameView.renderLoop(data, '.applications-menue');
    }
  }

  renderHandlerMainMenue() {

  }

  //Loops through the elements of an array and adds them to the dom
  renderLoop(arr, target) {
    const wrapper = document.createElement('div');
    for (let val of arr) {
      wrapper.appendChild(val.domElem);
    }

    this.addToDom(wrapper, target);
  }
}


//Init everything
const gameView = new GameView();
const gameApp = new GameController(gameView);

gameApp.init();

//eventlistener for all clicks
document.querySelector('body').addEventListener('touchstart', gameApp.clickHandler);
document.querySelector('body').addEventListener('click', gameApp.clickHandler);

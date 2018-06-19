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
    if(this.progressCode === this.codeSize){
      this.progressCode += increase;
      model.gameprogress.money += this.earnings;
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
    gameprogress: {
      money: 0,
      availableContracts: [],
      activeContracts: [],
      availableApplications: []
    },
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
    },

    //Object for all save relevant variables
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
    return model.gameprogress.availableContracts;
  }

  //Get all active tasks from the model
  getActiveContracts() {
    return model.gameprogress.activeContracts;
  }

  getAvailableApplications() {
    return model.gameprogress.availableApplications;
  }

  //Get the money
  getMoney() {
    return model.gameprogress.money;
  }

  //Create contract interval
  createContracts() {
    const that = this;
    const min = 5,
    max = 30;
    let rand = Math.floor(Math.random() * (max - min + 1) + min);

    setTimeout(function() {
      if(model.gameprogress.availableContracts.length < 6) {
        dataRequests.getRandomEntry('contracts')
                    .then(response => response.json())
                    .then(response => {
                        const obj = response.rows[0];
                        const newContract = model.createContract(obj);
                        model.gameprogress.availableContracts.push(newContract);
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
      if(model.gameprogress.availableContracts.length < 6) {
        dataRequests.getRandomEntry('employees')
                    .then(response => response.json())
                    .then(response => {
                        const obj = response.rows[0];
                        const newApplicant = model.createEmployee(obj);
                        model.gameprogress.availableApplications.push(newApplicant);
                        gameApp.gameView.addToDom(newApplicant.domElem, '.applications-menue');
                        })
      }

      that.createApplications();
    }, rand*1000)
  }

  //Function to accept an contract
  contractAccepted(elem) {
    let contractObject = model.gameprogress.availableContracts.find(obj => obj.domElem === elem.closest('div'));
    model.deleteFromArray(model.gameprogress.availableContracts, contractObject);
    contractObject.domElem = gameApp.gameView.createActiveContractDom(contractObject);
    model.gameprogress.activeContracts.push(contractObject);
    gameApp.gameView.removeElem(elem.closest('div'));
    let currentContract = document.querySelector('div.current-contract .assignment')

    if (currentContract === undefined) {
      gameApp.gameView.addToDom(contractObject.domElem, '.current-contract');
    } else {
      gameApp.gameView.addToDom(contractObject.domElem, '.accepted-contract');
    }

  }

  //Function for to add LoC to contract
  addLoc() {
      const activeContract = document.querySelector('div.current-contract .assignment');
    console.log(model.gameprogress);
    if (activeContract !== undefined){
      let contractObject = model.gameprogress.activeContracts.find(obj => obj.domElem === activeContract);
      const statusCon = contractObject.increase();

      if (statusCon === 'in progress') {
        gameApp.gameView.progressBar(contractObject);
      }

      else if (statusCon === 'finished') {
        model.deleteFromArray(model.gameprogress.activeContracts, contractObject)
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

    if (currentContract === undefined)
    {
      gameApp.gameView.addToDom(evt.target.parentElement, '.current-contract');

    } else {
      gameApp.gameView.addToDom(currentContract, '.accepted-contract');
      gameApp.gameView.addToDom(evt.target.parentElement, '.current-contract');
    }

  }

  //Saves all progress to localStorage
  saveProgress() {
    localStorage.setItem('SaveGameIGCT', JSON.stringify(model.gameprogress));
  }
  loadProgress(){
    var retrievedItem = localStorage.getItem('SaveGameIGCT');
    var savegame = JSON.parse(retrievedItem);
    model.gameprogress = savegame;
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
    if (evt.target.classList.contains('save')|| evt.target.parentElement.classList.contains('save')) {
      gameApp.saveProgress();
    }
    if (evt.target.classList.contains('load')|| evt.target.parentElement.classList.contains('load')) {
      gameApp.loadProgress();
    }
  }

  //Custome Event Handler for the Buttons
  eventHandler(evt)  {
    let eventsObj = {
      'accept-contract-button' : gameApp.contractAccepted,
    }
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
    this.createsaveButtons();
  }


  //Save and Load Buttons
  createsaveButtons() {
    const saveload = document.createElement('div');
    saveload.className = 'saveload';
    const containersave = document.createElement('div');
    containersave.className = 'save';
    const containerload = document.createElement('div');
    containerload.className = 'load';
    const textsave = document.createElement('p');
    textsave.innerHTML = `Save`;
    const textload = document.createElement('p');
    textload.innerHTML = `Load`;
    const buttonsave = document.createElement('i');
    const buttonload = document.createElement('i');
    containersave.append(textsave, buttonsave);
    containerload.append(textload, buttonload);
    saveload.appendChild(containersave);
    saveload.appendChild(containerload);
    document.querySelector('.info-panel').appendChild(saveload);
    
  }

  //Creates the contract categorys for main
  createContractCategorys() {
    const containercur = document.createElement('div');
    var current = document.createElement('p');
    containercur.className = 'current-contract';
    current.innerHTML = `<h2>Current Contract</h2><br>`;
    document.querySelector('.active-contracts-menue').appendChild(containercur);
    document.querySelector('.current-contract').appendChild(current);

    const containeracc = document.createElement('div');
    var accepted = document.createElement('p');
    containeracc.className = 'accepted-contract';
    accepted.innerHTML = `<br><h2>All Contracts</h2><br>`;
    document.querySelector('.active-contracts-menue').appendChild(containeracc);
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

  // General add to dom function
  addToDom(elem, target) {
    const targetElem = document.querySelector(target);

    if (targetElem !== undefined) {
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

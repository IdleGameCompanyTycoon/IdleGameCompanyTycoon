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
      var test = this.progressCode +increase;
      this.progressCode = Math.round(test*100)/100;
      //this.progressCode += increase;
    }

    //Will be executed when the contract is finished
    if(this.progressCode >= this.codeSize){
      this.progressCode += increase;
      model.gameProgress.money += this.earnings;
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
    //Object for all save relevant variables
    gameProgress: {
      money: 0,
      availableContracts: [],
      activeContracts: [],
      currentContracts: [],
      availableApplications: [],
      activeEmployees: []
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

    getObject: function(arr, elem) {
      return arr.find(obj => obj.domElem === elem);
    },

    //Object for all DOM page elements
    pageObject: {}
}



//Controller for communication between model and view
class GameController {
  constructor(gameView, pageCreation) {
    this.gameView = gameView;
    this.pageCreationView = pageCreation;
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
    return model.gameProgress.availableContracts;
  }

  //Get all active tasks from the model
  getActiveContracts() {
    return model.gameProgress.activeContracts;
  }

  getAvailableApplications() {
    return model.gameProgress.availableApplications;
  }

  //Get the money
  getMoney() {
    return model.gameProgress.money;
  }

  //Create contract interval
  createContracts() {
    const that = this;
    const min = 5,
    max = 30;
    let rand = Math.floor(Math.random() * (max - min + 1) + min);

    setTimeout(function() {
      if(model.gameProgress.availableContracts.length < 6) {
        dataRequests.getRandomEntry('contracts')
                    .then(response => response.json())
                    .then(response => {
                        const obj = response.rows[0];
                        const newContract = model.createContract(obj);
                        model.gameProgress.availableContracts.push(newContract);
                        gameApp.gameView.addToDom(newContract.domElem, model.pageObject.availableContractsPage);
                        })
      }

      that.createContracts();
    }, rand*1000)
  }

  employeeLocGen(){
    const that=this;

    setTimeout(function() {
      if(model.gameprogress.activeEmployees.length > 0) {
        model.gameprogress.activeEmployees.forEach(element => {
          var loc = element.skills.speed;
          that.addLoc(loc);
          console.log(model.gameprogress.activeEmployees);
        });
        
      }
      that.employeeLocGen();
    },1000)
  }

  //Create Available applications
  createApplications() {
    const that = this;
    const min = 5,
    max = 30;
    let rand = Math.floor(Math.random() * (max - min + 1) + min);

    setTimeout(function() {
      if(model.gameProgress.availableContracts.length < 6) {
        dataRequests.getRandomEntry('employees')
                    .then(response => response.json())
                    .then(response => {
                        const obj = response.rows[0];
                        const newApplicant = model.createEmployee(obj);
                        model.gameProgress.availableApplications.push(newApplicant);
                        gameApp.gameView.addToDom(newApplicant.domElem, model.pageObject.employeeApplicationsPage);
                        })
      }

      that.createApplications();
    }, rand*1000)
  }

  //Function to accept an contract
  contractAccepted(elem) {
    let contractObject = model.gameProgress.availableContracts.find(obj => obj.domElem === elem.closest('div'));
    model.deleteFromArray(model.gameProgress.availableContracts, contractObject);
    contractObject.domElem = gameApp.gameView.createActiveContractDom(contractObject);
    gameApp.gameView.removeElem(elem.closest('div'));
    let currentContract = document.querySelector('div.current-contract .assignment')

    if (!currentContract) {
      gameApp.gameView.addToDom(contractObject.domElem, model.pageObject.acceptedContractsPage, '.current-contract');
      model.gameProgress.currentContracts.push(contractObject);
    } else {
      gameApp.gameView.addToDom(contractObject.domElem, model.pageObject.acceptedContractsPage,'.accepted-contract');
      model.gameProgress.activeContracts.push(contractObject);
    }

  }

  //Function to accept an employee
  employeeAccepted(elem) {
    let employeeObject = model.gameprogress.availableApplications.find(obj => obj.domElem === elem.closest('div'));
    model.deleteFromArray(model.gameprogress.availableApplications, employeeObject);
    employeeObject.domElem = gameApp.gameView.createActiveEmployeeDom(employeeObject);
    gameApp.gameView.removeElem(elem.closest('div'));
    gameApp.gameView.addToDom(employeeObject.domElem, model.pageObject.activeEmployeesPage);
    model.gameprogress.activeEmployees.push(employeeObject);
  }

  //Function for to add LoC to contract
  addLoc(amount) {
    const activeContract = model.pageObject.acceptedContractsPage.querySelector('.current-contract .assignment');

    if (activeContract){
      let contractObject = model.getObject(model.gameProgress.currentContracts, activeContract);

      //Increases the LoC and gets back a status if the contract is finished or not
      const statusCon = contractObject.increase(amount);

      if (statusCon === 'in progress') {
        gameApp.gameView.progressBar(contractObject);
      }

      else if (statusCon === 'finished') {
        model.deleteFromArray(model.gameProgress.currentContracts, contractObject)
        gameApp.gameView.removeElem(contractObject.domElem);
        contractObject = null;
        gameApp.gameView.updateMoney();

        let nextContract = model.gameProgress.activeContracts[0];
        if (!nextContract) return;
        this.newActiveContract(nextContract.domElem);
      }
    }
  }

  //Function for activating one contract
  activateContract(evt) {
    gameApp.newActiveContract(evt.target.parentElement);
  }

  //Function to select new active contract (Accepts the DOM Element of the contract as argument)
  newActiveContract(elem) {

    const currentContract = document.querySelector('.current-contract .assignment');

    if (!currentContract)
    {
      const newCurObj = model.getObject(model.gameProgress.activeContracts, elem);

      gameApp.gameView.addToDom(elem, model.pageObject.acceptedContractsPage, '.current-contract');
      model.deleteFromArray(model.gameProgress.activeContracts, elem);
      model.gameProgress.currentContracts.push(newCurObj);
    } else if (currentContract !== elem) {
      gameApp.gameView.addToDom(currentContract, model.pageObject.acceptedContractsPage, '.accepted-contract');
      gameApp.gameView.addToDom(elem, model.pageObject.acceptedContractsPage, '.current-contract');

      //Get the actual Objects from the DOM nodes with the helper function getObject
      const newCurObj = model.getObject(model.gameProgress.activeContracts, elem);
      const oldCurObj = model.getObject(model.gameProgress.currentContracts, currentContract);

      //Delete the contracts from their prior arrays and put them into their new arrays
      model.gameProgress.currentContracts.push(newCurObj);
      model.gameProgress.activeContracts.push(oldCurObj);
      model.deleteFromArray(model.gameProgress.activeContracts, newCurObj);
      model.deleteFromArray(model.gameProgress.currentContracts, oldCurObj);
    }

  }

  //Saves all progress to localStorage
  saveProgress() {
    localStorage.setItem('SaveGameIGCT', JSON.stringify(model.gameProgress));
  }
  loadProgress(){
    var retrievedItem = localStorage.getItem('SaveGameIGCT');
    var savegame = JSON.parse(retrievedItem);
    model.gameProgress = savegame;
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
      'accept-application-button' : gameApp.employeeAccepted,
    }

    //Uses the class of the object as identifier for the event function which has to be called
    eventsObj[evt.target.classList[2]](evt.target);
  }

  init() {
    model.pageObject = this.pageCreationView.initPages(model.gameprogress.availableContracts,
                                    model.gameprogress.currentContracts,
                                    model.gameprogress.activeContracts,
                                    model.gameprogress.availableApplications,
                                    model.gameprogress.activeEmployees);
    this.gameView.init();
    this.createContracts();
    this.createApplications();
    this.employeeLocGen();
    document.querySelector('.second-panel').appendChild(model.pageObject.availableContractsPage);
    document.querySelector('main').appendChild(model.pageObject.acceptedContractsPage);
  }
}



//View rendering
class GameView {
  init() {
    this.createSaveButtons();
  }


  //Save and Load Buttons
  createSaveButtons() {
    const saveload = document.createElement('div');
    saveload.className = 'saveload';
    const containersave = document.createElement('div');
    containersave.className = 'save';
    const containerload = document.createElement('div');
    containerload.className = 'load';
    const textsave = document.createElement('p');
    textsave.textContent = `Save`;
    const textload = document.createElement('p');
    textload.textContent = `Load`;
    const buttonsave = document.createElement('i');
    const buttonload = document.createElement('i');
    containersave.append(textsave, buttonsave);
    containerload.append(textload, buttonload);
    saveload.appendChild(containersave);
    saveload.appendChild(containerload);
    document.querySelector('.info-panel').appendChild(saveload);

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

  //Create active dom element for Employee
  createActiveEmployeeDom(object) {
    const newActiveEmployee = document.createElement('div');
    const newEmployeeText = document.createElement('p');
    newActiveEmployee.classList.add('employee');
    newEmployeeText.classList.add('empl-text');
    newEmployeeText.textContent = `${object.firstName} ${object.lastName} ${object.job} ${object.skills.speed}`;

    newActiveEmployee.append(newEmployeeText);

    return newActiveEmployee;
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
  addToDom(elem, target, optionalSelector) {

    if(optionalSelector && target) {
      target.querySelector(optionalSelector).appendChild(elem);
      return
    }

    if (target !== undefined) {
      target.appendChild(elem);
    }
  }

  //Remove dom elemen
  removeElem(elem) {
    elem.remove();
  }

  //Change panel
  changeMenue(elem) {
    const menue = elem.parentElement;
    let panel,
        parent,
        navMenueFunction;

    if (menue.classList.contains('first-nav')) {
      parent = document.querySelector('.second-panel');
      panel = parent.children[0];
      navMenueFunction = this.renderHandlerSecondaryMenue;
    }
    else if (menue.classList.contains('second-nav')) {
      parent = document.querySelector('main');
      panel = parent.children[0];
      navMenueFunction = this.renderHandlerMainMenue;
    }
    panel.remove();

    navMenueFunction(elem);
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
  renderHandlerSecondaryMenue(elem) {
    const menue = document.querySelector('.second-panel');

    switch (elem.classList[1]) {
      case 'applications':
        menue.appendChild(model.pageObject.employeeApplicationsPage);
        break;
      case 'available-contracts':
        menue.appendChild(model.pageObject.availableContractsPage);
        break;
      default:
        menue.appendChild(document.createElement('div'));
        break;
    }
  }

  renderHandlerMainMenue(elem) {
    const menue = document.querySelector('main');

    switch (elem.classList[1]) {
      case 'active-contracts':
        menue.appendChild(model.pageObject.acceptedContractsPage);
        break;
      case 'active-employees':
        menue.appendChild(model.pageObject.activeEmployeesPage);
        break;
      default:
        menue.appendChild(document.createElement('div'));
        break;
    }
  }

  //Loops through the elements of an array and adds them to the dom
  renderLoop(arr, target, optionalSelector) {
    const wrapper = document.createElement('div');
    for (let val of arr) {
      this.addToDom(val, target);
    }
  }
}

//Class for the generation of Page DOM Objects
class MenuPages extends GameView {
  availableContractsPage(objArr) {
    const page = document.createElement('div');
    page.innerHTML = `<p><h2>Available Contracts</h2><br></p>`;
    this.renderLoop(objArr, page);
    return page;
  }

  acceptedContractsPage(acceptedObjArr, currentObjArr) {
    const page = document.createElement('div');

    const containerCur = document.createElement('div');
    containerCur.className = 'current-contract';
    containerCur.innerHTML = `<p><h2>Current Contract</h2><br></p>`;

    const containerAcc = document.createElement('div');
    containerAcc.className = 'accepted-contract';
    containerAcc.innerHTML = `<p><br><h2>All Contracts</h2><br></p>`;

    this.renderLoop(acceptedObjArr, containerAcc);
    this.renderLoop(currentObjArr, containerCur);

    page.append(containerCur, containerAcc);

    return page;
  }

  employeeApplicationsPage(objArr) {
    const page = document.createElement('div');
    page.innerHTML = `<p><h2>Applications</h2><br></p>`;
    this.renderLoop(objArr, page);
    return page;
  }

  activeEmployeesPage(objArr) {
    const page = document.createElement('div');
    page.classList.add('working-employees');
    page.innerHTML = `<p><h2>Employees</h2><br></p>`;
    this.renderLoop(objArr, page);
    return page;
  }

  //All pages get created and the function returns an page object with all pages
  initPages(availableContractsArr, currentContractsArr, acceptedContractsArr, employeeApplicationsArr, activeEmployeesArr) {
    const pageObject = {
      availableContractsPage: this.availableContractsPage(availableContractsArr),
      acceptedContractsPage: this.acceptedContractsPage(acceptedContractsArr, currentContractsArr),
      employeeApplicationsPage: this.employeeApplicationsPage(employeeApplicationsArr),
      activeEmployeesPage: this.activeEmployeesPage(activeEmployeesArr)
    }

    return pageObject;
  }
}

//Init everything
const gameView = new GameView();
const gamePageCreation = new MenuPages();
const gameApp = new GameController(gameView, gamePageCreation);

gameApp.init();

//eventlistener for all clicks
document.querySelector('body').addEventListener('touchstart', gameApp.clickHandler);
document.querySelector('body').addEventListener('click', gameApp.clickHandler);

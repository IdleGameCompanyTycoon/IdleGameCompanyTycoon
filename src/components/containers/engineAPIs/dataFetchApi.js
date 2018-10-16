import environment from '../../../environment.json';

// Initiate the fetching of new applications
export const initApplicationGen = (obj, dataObj) => {
  const settings =  environment.settings.applications
  let randomTimer = Math.floor(Math.random() * (settings.maxTime - settings.minTime + 1) + settings.minTime) * 1000;

  setTimeout(() => {
    let availableApplicationsArr = obj.state.availableApplications;
    if(availableApplicationsArr.length < settings.maxApplications) {
      fetch(`http://${environment.backend}/getData?operation=getApplication`)
          .then(res => res.json())
          .then(res => {
            availableApplicationsArr.push(res);
            obj.setState({
              availableApplications: availableApplicationsArr
            })
            console.log('success');
            initApplicationGen(obj);
          })
          .catch(err => {
            console.log(err);
            initApplicationGen(obj);
          })
    } else {
      initApplicationGen(obj);
    }
  }, randomTimer)
}

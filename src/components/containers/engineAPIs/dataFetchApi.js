import environment from '../../../environment.json';

export const initApplicationGen = (obj, dataObj) => {
  const minTime = 5;
  const maxTime = 20;
  let randomTimer = Math.floor(Math.random() * (maxTime - minTime + 1) + minTime) * 1000;

  setTimeout(() => {
    fetch('http://' + environment.backend + '/getData?operation=getApplication')
        .then(res => res.json())
        .then(res => {
          let availableApplicationsArr = obj.state.availableApplications;
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
  }, randomTimer)
}

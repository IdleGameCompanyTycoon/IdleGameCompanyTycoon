import React from 'react';

const handleFreelancerChange = (contractTime, application, optionsSetter) => {
    application.contractTime = contractTime;
    optionsSetter(true);
}

// This component needs an if condition for each employeetype to provide certain special options. Only if necessary of course. The default return is basically null
const EmployeeTypeApplicationOptions = (props) => {

    // For freelancer types
    if (props.application.employeetype === 'freelancer') {
        console.log(props.application)
        if (!props.application.contractTime && props.optionsSet) {
            props.setOptions(false);
        }

        return (
            <select value={props.application.contractTime} onChange={(evt) => handleFreelancerChange(evt.target.value, props.application, props.setOptions)}>
                <option value="">Please Select the time in months</option>
                <option value="1">1 Month</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                {/* <option value="end-of-project">Until the end of the Project</option> FIXME: Logic for this option still missing */}
            </select>
        )
    }
    
    // Default case
    return (
        <React.Fragment/>
    )
}
export default EmployeeTypeApplicationOptions;

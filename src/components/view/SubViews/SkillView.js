import React, { Component } from 'react';
import '../../../assets/css/Skill-view.css';

class SkillView extends Component {
    constructor() {
        super();
        this.state = {
            hideDetail: true
        }
    }

    // TODO: Add a click handler to show details for sub skill views + add styling for sub skill views

    render() {
        return(
            <div className={'Skill-view ' + (this.props.shouldHide ? 'hidden' : '')}>
                {
                    Object.keys(this.props.skills).map((key, i) => {
                        const skillRaw = this.props.skills[key];
                        const skillObject = (typeof skillRaw === 'object' && !Array.isArray(skillRaw));

                        const labelArr = key.split(/(?=[A-Z])/)
                        labelArr[0] = labelArr[0].charAt(0).toUpperCase() + labelArr[0].slice(1);

                        let skill = skillRaw;

                        if(skillObject) {
                            const skillVals = Object.values(skillRaw);
                            skill = skillVals.reduce((previous, value) => previous+value, 0);
                            skill = skill.toFixed(2)/skillVals.length;
                        }

                        return(
                            <div key={key + i} className="Skill-view-skill">
                                <div className="Skill-view-skill-container">
                                    <span>{labelArr.join(' ')}</span> 
                                    <div className="Skill-view-bar-outer">
                                        <div className="Skill-view-bar-inner" style={{width: (skill*100+'%')}}></div>
                                    </div>
                                </div>
                                {skillObject && <SkillView skills={skillRaw} shouldHide={this.state.hideDetail}/>}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default SkillView;
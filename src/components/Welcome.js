import React, {Component} from 'react'
import Door from '../img/door.jpg'
import {Tooltip } from 'antd';

export default class Welcome extends Component {
    render() {
        return (
          <div style={{height: '92vh', backgroundColor:'black'}}>
            <div className="chalkboard">
              <div>
                <p className="animated-text">Schedule Manager:</p>
                  
              </div>
                   
              <div className="door-container">
              <Tooltip title="Click on me to enter room" overlayStyle={{ opacity: 0.5 }} open>   
                    <a href="event">
                      <img
                        src={Door}
                        alt="Door"
                        style={{width:'15em', height:'30em', marginLeft: '5em', marginTop:"11em", opacity:"0.85"}}
                    />
                    </a>
                    </Tooltip>
              </div>
              
            </div>
            </div>
          );
    }
}

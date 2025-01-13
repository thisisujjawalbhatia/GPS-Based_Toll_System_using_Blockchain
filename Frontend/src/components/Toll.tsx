import * as React from 'react';
import {IonIcon } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';

interface ITollProps {
	tName:string,
	tDate:string,
	tPrice:string
}

const Toll: React.FunctionComponent<ITollProps> = (props) => {
  return (
    <div className="toll">
      <div className="aaaaaa">

      
        <div className="ic">
                <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_7_79)">
                  <path d="M21.375 53.4375H24.9375V57H0V0H28.5V10.6875H21.375V36.293L51.5728 21.208L56.7217 31.5337L21.375 49.207V53.4375ZM21.375 45.1992L28.5 41.6367V36.7383L21.375 40.3008V45.1992ZM32.0625 39.8555L39.1875 36.293V31.3945L32.0625 34.957V39.8555ZM49.9585 25.9951L42.75 29.6133V34.5117L51.9346 29.9194L49.9585 25.9951ZM17.8125 35.625V17.8125H10.6875V35.625H17.8125ZM3.5625 7.125H24.9375V3.5625H3.5625V7.125ZM17.8125 53.4375V39.1875H7.125V14.25H17.8125V10.6875H3.5625V53.4375H17.8125Z" fill="black"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_7_79">
                  <rect width="57" height="57" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
        </div>
              <div className="cont">
                <div className="tname">
                  <div>{props.tName}</div> 
                  <IonIcon className='tic' aria-hidden="true" style={{marginTop:'2px'}} icon={locationOutline} />
                </div>
                <div className="tdate">{props.tDate}</div>
                <div className="tprice">₹{props.tPrice}</div>
              </div>
              </div>
              <div className="tdetails">
                Details
              </div>
    </div>
  );
  
};

export default Toll;

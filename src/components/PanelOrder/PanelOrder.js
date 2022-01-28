import React from 'react';
import classes from './PanelOrder.module.css';

const PanelOrder = (props) => {

    var dictRepairables = { 
        'cutOffPitchWork' : 'پیچ بریده', 
        'cylinder' : 'سیلندر', 
        'cylinderhead' : 'سرسیلندر',
        'disk' : 'دیسک',
        'excel' : 'اکسل',
        'tooppi' : 'توپی',
        'weldingWork' : 'کار جوشکاری'
    };

    var dictAddress = {
        'address' : 'آدرس',
        'nameOfTheBusiness' : 'صاحب مکانیکی',
        'ownerFirstAndLastName' : 'نام و نام خانوادگی',
        'ownerMobileNumber' : 'شماره موبایل',
        'telephone' : 'تلفن ثابت'
    };

    // let timeArray = [];

    // const time = Object.keys( props.time ).map(igKey => {
    //     timeArray.push(props.time[igKey]);
    //     console.log(props.time[igKey]);
    // });

    //console.log(props.time.day);

    const orderSummary = Object.keys( props.repairables ).map( igKey => {
        return (
            <li key={igKey}>
                <span style={{ fontSize: "30px" }}>{dictRepairables[igKey]}</span> : {props.repairables[igKey]}
            </li>
        );
    } );

    console.log(props.repairables);

    const contactSummary = Object.keys( props.contactdata )
    .map( igKey => {
        return (
            <li key={igKey}>
                <span style={{ fontSize: "30px" }}>{dictAddress[igKey]}</span> : {props.contactdata[igKey]}
            </li>
        );
    } );

    console.log(props.contactdata);

    return (
        <div className={classes.PanelOrder}>

            <div style={{display: "flex"}}>
                <div className={classes.summary}>
                    {contactSummary}
                </div>

                <div className={classes.summary}>
                    {orderSummary}
                </div>
            </div>

            <div>
                <div className={classes.clockRow}>
                    {props.time.hour} : {props.time.minute} : {props.time.second}
                </div>

                <div className={classes.clockRow}>
                    {props.time.year} , {props.time.month} , {props.time.day}
                </div>
            </div>
        </div>
    );
}

// const PanelOrder = ( props ) => {
//     const repairables = [];

//     for ( let repairableName in props.repairables ) {
//         repairables.push(
//             {
//                 name: repairableName,
//                 amount: props.repairables[repairableName]
//             }
//         );
//     }

//     console.log(repairables);

//     const repairableOutput = repairables.map(ig => {
//         return <span 
//             style={{
//                 textTransform: 'capitalize',
//                 display: 'inline-block',
//                 margin: '0 8px',
//                 border: '1px solid #ccc',
//                 padding: '5px'
//                 }}
//             key={ig.name}>{ig.name} ({ig.amount})</span>;
//     });

//     return (
//         <div className={classes.PanelOrder}>
//             <p>repairables: {repairableOutput}</p>
//         </div>
//     );
// };

export default PanelOrder;
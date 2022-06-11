import { TableCell, TableRow } from "@material-ui/core";
import { useState } from "react";
import Controls from "./Controls/Controls";

// const initialFValues = {
//     index: 0,
//     drugType: "",
//     drugName: "",
//     isBeforeFood: false,
//     isMorning: false,
//     isAfternoon: false,
//     isEvening: false
// }

function TableRows({ row, handleDataChange, deleteRow, patientDetails }) {
    var index = row.index
    // var [patientId, setPatientId] = useState(patientDetails.patientId);
    // var [patientUHID, setPatientUHID] = useState(patientDetails.patientUHID);
    var [drugType, handleChangeDrugType] = useState(row.drugType);
    var [drugName, handleChangeDrugName] = useState(row.drugName);
    var [isBeforeFood, handleChangeBeforeFood] = useState(row.isBeforeFood);
    var [isMorning, handleChangeIsMorning] = useState(row.isMorning);
    var [isAfternoon, handleChangeIsAfternoon] = useState(row.isAfternoon);
    var [isEvening, handleChangeIsEvening] = useState(row.isEvening);

    const updateValues = e => {
        var inputName = e.target.name
        var inputValue = e.target.value
        
        if (inputName === 'drugType') {
            handleChangeDrugType(inputValue)
            drugType = inputValue
        } else if (inputName === 'drugName') {
            handleChangeDrugName(inputValue)
            drugType = inputValue
        }
        else if (inputName === 'isBeforeFood') {
            handleChangeBeforeFood(inputValue)
            isBeforeFood = inputValue
        } 
        else if (inputName === 'isMorning') {
            handleChangeIsMorning(inputValue)
            isMorning = inputValue
        } 
        else if (inputName === 'isAfternoon') {
            handleChangeIsAfternoon(inputValue)
            isAfternoon = inputValue
        } 
        else if (inputName === 'isEvening') {
            handleChangeIsEvening(inputValue)
            isEvening = inputValue
        } 

        handleDataChange({            
            index: index,
            patientId: patientDetails.patientId,
            staffId: patientDetails.staffId,
            patientAppointmentId: patientDetails.id,
            drugType: drugType,
            drugName: drugName,
            isBeforeFood: isBeforeFood,
            isMorning: isMorning,
            isAfternoon: isAfternoon,
            isEvening: isEvening,
            
        })
    }

    const removeRow = () => {
        deleteRow(index)
    }

    return (
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell><Controls.Input name="drugType" value={drugType} onChange={updateValues} /></TableCell>
            <TableCell><Controls.Input name="drugName" value={drugName} onChange={updateValues} /></TableCell>            
            <TableCell>
                <Controls.Checkbox name="isBeforeFood" value={isBeforeFood} onChange={updateValues}></Controls.Checkbox>
                <Controls.Checkbox name="isMorning" value={isMorning} onChange={updateValues}></Controls.Checkbox>
                <Controls.Checkbox name="isAfternoon" value={isAfternoon} onChange={updateValues}></Controls.Checkbox>
                <Controls.Checkbox name="isEvening" value={isEvening} onChange={updateValues}></Controls.Checkbox>
            </TableCell>
            <TableCell><button type="button" className="btn btn-remove" onClick={removeRow}>&times;</button></TableCell>
        </TableRow>
    )
}

export default TableRows
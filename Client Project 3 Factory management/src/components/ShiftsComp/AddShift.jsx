import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShift } from "../../dataBaseService";
import "bootstrap/dist/css/bootstrap.min.css";

const AddShift = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);

  const initialShiftState = {
    employeeId: "",
    date: "",
    startingHour: 0,
    endingHour: 0,
    sumHours: 0,
  };

  const [shiftState, setShiftState] = useState(initialShiftState);

  const handleAddShift = async () => {
    try {
      if (
        shiftState.startingHour >= 0 &&
        shiftState.startingHour <= 23 &&
        shiftState.endingHour >= 0 &&
        shiftState.endingHour <= 23
      ) {
        let sumHours;
        if (shiftState.startingHour < shiftState.endingHour) {
          sumHours = shiftState.endingHour - shiftState.startingHour;
        } else {
          sumHours = 24 - shiftState.startingHour + shiftState.endingHour;
        }
        const updatedShiftState = { ...shiftState, sumHours };
        const data = await addShift(updatedShiftState);
        dispatch({ type: "ADD SHIFT", payload: data });
        setShiftState(initialShiftState);
        alert("Adding the shift successfully");
      } else {
        alert("The start hour and end hour are incorrect, try again");
      }
    } catch (error) {
      console.error("Error adding shift:", error);
      alert("Something went wrong while adding the shift. Please try again.");
    }
  };

  return (
    <div className="col-md-6 mb-4">
      <div className="card">
        <div className="card-header">
          <h3>Add Shift</h3>
        </div>
        <div className="card-body">
          <div className="form-group mb-3">
            <label htmlFor="employeeId">Employee</label>
            <select
              className="form-control"
              id="employeeId"
              value={shiftState?.employeeId}
              onChange={(e) =>
                setShiftState({ ...shiftState, employeeId: e.target.value })
              }
            >
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={shiftState?.date}
              onChange={(e) =>
                setShiftState({ ...shiftState, date: e.target.value })
              }
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="startingHour">Starting Hour</label>
            <input
              type="number"
              className="form-control"
              id="startingHour"
              value={shiftState?.startingHour}
              onChange={(e) =>
                setShiftState({ ...shiftState, startingHour: +e.target.value })
              }
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="endingHour">Ending Hour</label>
            <input
              type="number"
              className="form-control"
              id="endingHour"
              value={shiftState?.endingHour}
              onChange={(e) =>
                setShiftState({ ...shiftState, endingHour: +e.target.value })
              }
            />
          </div>
          <button className="btn btn-primary" onClick={handleAddShift}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddShift;

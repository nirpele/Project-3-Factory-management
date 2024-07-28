import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { deleteShift, updateShift } from "../../dataBaseService";
import "bootstrap/dist/css/bootstrap.min.css";

const Shift = ({ shift }) => {
  
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.shifts);
  const employees = useSelector((state) => state.employees);

  const [shiftState, setShiftState] = useState({
    employeeId: "",
    date: new Date().toISOString().slice(0, 10),
    startingHour: 0,
    endingHour: 0,
    sumHours:0
  });

  useEffect(() => {
    if (shifts.length > 0) {
      const shiftParam = shifts?.find(
        (shiftItem) => shiftItem._id === shift._id
      );
      console.log("Shift Param:", shiftParam);
      setShiftState(shiftParam);
      console.log("Shift State:", shiftState);
    }
  }, [shifts]);
  

  const handleUpdate = async () => {
    try {
      // Validate the starting and ending hours
      if (
        shiftState.startingHour >= 0 &&
        shiftState.endingHour >= 0 &&
        shiftState.startingHour <= 23 &&
        shiftState.endingHour <= 23
      ) {
        // Calculate sumHours
        let sumHours;
        if (shiftState.startingHour < shiftState.endingHour) {
          sumHours = shiftState.endingHour - shiftState.startingHour;
        } else {
          sumHours = 24 - shiftState.startingHour + shiftState.endingHour;
        }
  
        // Create an object with the updated sumHours
        const updatedShiftState = { ...shiftState, sumHours };
  
        // Update the shift with the new state
        await updateShift(shiftState._id, updatedShiftState);
  
        // Dispatch the action with the updated shift state
        dispatch({
          type: "UPDATE SHIFT",
          payload: updatedShiftState,
        });
        alert("Updated shift successfully");
      } else {
        alert("The start hour and end hour are incorrect, try again");
      }
    } catch (error) {
      alert("Something went wrong while Updating the shift. Please try again.");
      console.error("Error updating shift:", error);
    }
  };
  

  const handleDelete = async () => {
    try {
      await deleteShift(shift._id);
      dispatch({ type: "DELETE SHIFT", payload: shift._id });
      alert("Deleted shift successfully");
    } catch (error) {
      alert("Something went wrong while Deleting the shift. Please try again.");
      console.error("Error deleting shift:", error);
    }
  };

  return (
    <div className="col-md-6 mb-4">
      <div className="card">
        <div className="card-body">
          <div className="form-group mb-3">
            <label htmlFor="employeeId">Employee Name:</label>
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
              value={shiftState?.date.toString().slice(0, 10)}
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
          <button className="btn btn-primary  me-2" onClick={handleUpdate}>
            Update
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shift;

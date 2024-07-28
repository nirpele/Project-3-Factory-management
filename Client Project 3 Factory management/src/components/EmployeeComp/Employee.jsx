import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { deleteEmployee, updateEmployee } from "../../dataBaseService";
import 'bootstrap/dist/css/bootstrap.min.css';

const Employee = ({ employee }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const departments = useSelector((state) => state.departments);

  const [employeeState, setEmployeeState] = useState({
    firstName: "",
    lastName: "",
    startWorkYear: 0,
    departmentId: "",
  });

  useEffect(() => {
    if (employees.length > 0) {
      const employeeParam = employees.find(
        (employeeItem) => employeeItem._id === employee._id
      );
      console.log("Employee Param:", employeeParam);
      setEmployeeState(employeeParam);
      console.log("Employee State:", employeeState);
    }
  }, [employees, employee._id]);

  const handleUpdate = async () => {
    try {
      await updateEmployee(employee._id, employeeState);
      dispatch({
        type: "UPDATE EMPLOYEE",
        payload: { ...employeeState, _id: employeeState._id },
      });
      alert("Updated the employee successfully");
    } catch (error) {
      alert("Something went wrong while Updating the employee. Please try again.");
      console.error("Error updating employee:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(employee._id);
      dispatch({ type: "DELETE EMPLOYEE", payload: employee._id });
      alert("Updated the employee successfully");
    } catch (error) {
      alert("Something went wrong while Deleting the employee. Please try again.");
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="col-md-6 mb-4">
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group mb-3" style={{ backgroundColor: "#6495ED" }}>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={employeeState?.firstName || ""}
                onChange={(e) =>
                  setEmployeeState({ ...employeeState, firstName: e.target.value })
                }
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={employeeState?.lastName || ""}
                onChange={(e) =>
                  setEmployeeState({ ...employeeState, lastName: e.target.value })
                }
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="startWorkYear">Start Work Year:</label>
              <input
                type="number"
                className="form-control"
                id="startWorkYear"
                value={employeeState?.startWorkYear || 0}
                onChange={(e) =>
                  setEmployeeState({
                    ...employeeState,
                    startWorkYear: +e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="departmentId">Department:</label>
              <select
                className="form-control"
                id="departmentId"
                value={employeeState?.departmentId || ""}
                onChange={(e) =>
                  setEmployeeState({ ...employeeState, departmentId: e.target.value })
                }
              >
                <option value="">Select a department</option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" className="btn btn-primary me-2" onClick={handleUpdate}>
              Update
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Employee;

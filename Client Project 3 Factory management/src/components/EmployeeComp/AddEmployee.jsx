import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../../dataBaseService";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddEmployee = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments);
  const initialEmployeeState = {
    firstName: "",
    lastName: "",
    startWorkYear: 0,
    departmentId: "",
  };

  const [employeeState, setEmployeeState] = useState(initialEmployeeState);

  const handleAddEmployee = async () => {
    try {
      const data = await addEmployee(employeeState);
      dispatch({ type: "ADD EMPLOYEE", payload: data });
      setEmployeeState(initialEmployeeState);
      alert("Adding the employee successfully");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Something went wrong while adding the employee. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Add Employee</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={employeeState?.firstName}
                    onChange={(e) =>
                      setEmployeeState({ ...employeeState, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={employeeState?.lastName}
                    onChange={(e) =>
                      setEmployeeState({ ...employeeState, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="startWorkYear">Start Work Year</label>
                  <input
                    type="number"
                    className="form-control"
                    id="startWorkYear"
                    value={employeeState?.startWorkYear}
                    onChange={(e) =>
                      setEmployeeState({
                        ...employeeState,
                        startWorkYear: +e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="departmentId">Department</label>
                  <select
                    className="form-control"
                    id="departmentId"
                    value={employeeState?.departmentId}
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
                <button type="button" className="btn btn-primary w-100" onClick={handleAddEmployee}>
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;

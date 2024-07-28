import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDepartment } from '../../dataBaseService';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddDepartment = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const initialDepartmentState = {
    name: "",
    managerId: ""
  };

  const [departmentState, setDepartmentState] = useState(initialDepartmentState);

  const handleAddDepartment = async () => {
    try {
      const data = await addDepartment(departmentState);
      dispatch({ type: "ADD DEPARTMENT", payload: data });
      setDepartmentState(initialDepartmentState);
      alert("Adding the department successfully");
    } catch (error) {
      console.error("Error adding department:", error);
      alert("Something went wrong while adding the department. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Add Department</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={departmentState?.name}
                    onChange={(e) =>
                      setDepartmentState({ ...departmentState, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="managerId">Manager</label>
                  <select
                    className="form-control"
                    id="managerId"
                    value={departmentState?.managerId}
                    onChange={(e) =>
                      setDepartmentState({ ...departmentState, managerId: e.target.value })
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
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleAddDepartment}
                >
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

export default AddDepartment;

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { deleteDepartment, updateDepartment } from "../../dataBaseService";
import 'bootstrap/dist/css/bootstrap.min.css';

const Department = ({ department }) => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments);
  const employees = useSelector((state) => state.employees);

  const [departmentState, setDepartmentState] = useState({
    name: "",
    managerId: ""
  });

  useEffect(() => {
    if (departments.length > 0) {
      const departmentParam = departments.find(
        (departmentItem) => departmentItem._id === department._id
      );
      console.log("Department Param:", departmentParam);
      setDepartmentState(departmentParam);
      console.log("Department State:", departmentState);
    }
  }, [departments]);

  const handleUpdate = async () => {
    try {
      await updateDepartment(department._id, departmentState);
      dispatch({
        type: "UPDATE DEPARTMENT",
        payload: { ...departmentState, _id: departmentState._id },
      });
      alert("Updated the department successfully");
    } catch (error) {
      alert("Something went wrong while Updating the department. Please try again.");
      console.error("Error updating department:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDepartment(department._id);
      dispatch({ type: "DELETE DEPARTMENT", payload: department._id });
      alert("Deleted the department successfully");
    } catch (error) {
      alert("Something went wrong while Deleting the department. Please try again.");
      console.error("Error deleting department:", error);
    }
  };

  return (
    <div className="col-md-6 mb-4">
      <div className="card">
        <div className="card-body">
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
            <button className="btn btn-primary me-2" onClick={handleUpdate}>Update</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Department;

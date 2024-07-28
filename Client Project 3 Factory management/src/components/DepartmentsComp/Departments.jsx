import { useSelector } from "react-redux";
import AddDepartment from "./AddDepartment"; // Updated import
import Department from "./Department"; // Updated import
import { useState } from "react";

const Departments = () => {
  const departments = useSelector((state) => state.departments);
  const employees = useSelector((state) => state.employees);
  const [departmentSearch, setDepartmentSearch] = useState("");
  const [managerSearch, setManagerSearch] = useState("");

  const handleDepartmentSearchChange = (e) => {
    setDepartmentSearch(e.target.value);
  };

  const handleManagerSearchChange = (e) => {
    setManagerSearch(e.target.value);
  };

  const getManagerName = (employeeId) => {
    const employee = employees.find((emp) => emp._id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}`.toLowerCase() : '';
  };

  const filteredDepartments = departments?.filter((department) => {
    const departmentName = department.name.toLowerCase();
    const managerName = getManagerName(department.managerId);
    const matchesDepartmentName = departmentSearch ? departmentName.startsWith(departmentSearch.toLowerCase()) : true;
    const matchesManagerName = managerSearch ? managerName.startsWith(managerSearch.toLowerCase()) : true;
    return matchesDepartmentName && matchesManagerName;
  });

  return (
    <>
      <div style={{ width: "50%", float: "right" }}>
        <AddDepartment />
      </div>
      <div style={{ width: "50%", float: "left" }}>
        <div>
          <input
            type="text"
            placeholder="Search by department name"
            value={departmentSearch}
            onChange={handleDepartmentSearchChange}
            style={{ marginRight: "10px", marginBottom: "10px" }}
          />
          <input
            type="text"
            placeholder="Search by manager name"
            value={managerSearch}
            onChange={handleManagerSearchChange}
            style={{ marginBottom: "10px" }}
          />
        </div>
        {filteredDepartments?.map((department) => (
          <Department key={department._id} department={department} />
        ))}
        <br />
      </div>
    </>
  );
};

export default Departments;

import { useSelector } from 'react-redux';
import AddEmployee from './AddEmployee'; // Updated import
import Employee from './Employee'; // Updated import
import { useState } from 'react';

const Employees = () => {
  const employees = useSelector((state) => state.employees); // Updated selector
  const departments = useSelector((state) => state.departments); // Get departments from the store
  const [nameSearch, setNameSearch] = useState('');
  const [departmentSearch, setDepartmentSearch] = useState('');

  const handleNameSearchChange = (e) => {
    setNameSearch(e.target.value);
  };

  const handleDepartmentSearchChange = (e) => {
    setDepartmentSearch(e.target.value);
  };

  const getDepartmentName = (departmentId) => {
    const department = departments.find((dept) => dept._id === departmentId);
    return department ? department.name.toLowerCase() : '';
  };

  const filteredEmployees = employees?.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    const departmentName = getDepartmentName(employee.departmentId);
    const matchesName = nameSearch ? fullName.startsWith(nameSearch.toLowerCase()) : true;
    const matchesDepartment = departmentSearch ? departmentName.startsWith(departmentSearch.toLowerCase()) : true;
    return matchesName && matchesDepartment;
  });

  return (
    <>
      <div style={{ width: '50%', float: 'right' }}>
        <AddEmployee /> {/* Updated component */}
      </div>
      <div style={{ width: '50%', float: 'left' }}>
        <div>
          <input
            type="text"
            placeholder="Search by name"
            value={nameSearch}
            onChange={handleNameSearchChange}
            style={{ marginRight: '10px', marginBottom: '10px' }}
          />
          <input
            type="text"
            placeholder="Search by department"
            value={departmentSearch}
            onChange={handleDepartmentSearchChange}
            style={{ marginBottom: '10px' }}
          />
        </div>
        {filteredEmployees?.map((employee) => (
          <Employee key={employee._id} employee={employee} /> /* Updated component */
        ))}
        <br />
      </div>
    </>
  );
};

export default Employees;

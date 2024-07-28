import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddShift from "./AddShift";
import Shift from "./Shift";
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Shifts = () => {
  const shifts = useSelector((state) => state.shifts);
  const employees = useSelector((state) => state.employees);
  const departments = useSelector((state) => state.departments);
  const [showAddShift, setShowAddShift] = useState(false);
  const [editShiftId, setEditShiftId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Search states
  const [searchEmployee, setSearchEmployee] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const toggleAddShift = () => {
    setShowAddShift(!showAddShift);
  };

  const toggleEditShift = (shiftId) => {
    setEditShiftId(editShiftId === shiftId ? null : shiftId);
  };

  // Sort the shifts by date
  const sortedShifts = [...shifts]?.sort(
    (b, a) => new Date(a.date) - new Date(b.date)
  );

  // Function to get employee name by ID
  const getEmployeeName = (employeeId) => {
    const employee = employees?.find((emp) => emp._id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : "Unknown";
  };

  const getDepartmentNameByEmployeeId = (employeeId) => {
    const employee = employees?.find((emp) => emp._id === employeeId);
    if (!employee) {
      return "Unknown Department";
    }
    const department = departments?.find(
      (dept) => dept._id === employee.departmentId
    );
    return department ? department.name : "Unknown Department";
  };

  const getDepartmentManagerByEmployeeId = (employeeId) => {
    const employee = employees?.find((emp) => emp._id === employeeId);
    if (!employee) {
      return "Unknown Department";
    }
    const department = departments?.find(
      (dept) => dept._id === employee.departmentId
    );
    if (!department) {
      return "Unknown Department";
    }
    const manager = employees.find((emp) => emp._id === department.managerId);
    return manager
      ? `${manager.firstName} ${manager.lastName}`.toLowerCase()
      : "Unknown";
  };

  // Filter shifts based on search inputs
  const filteredShifts = sortedShifts.filter((shift) => {
    const employeeName = getEmployeeName(shift.employeeId).toLowerCase();
    const departmentName = getDepartmentNameByEmployeeId(shift.employeeId).toLowerCase();
    const shiftDate = new Date(shift.date).toLocaleDateString();

    return (
      employeeName.includes(searchEmployee.toLowerCase()) &&
      departmentName.includes(searchDepartment.toLowerCase()) &&
      shiftDate.includes(searchDate)
    );
  });

  const totalPages = Math.ceil(filteredShifts.length / 5);

  // Get shifts for the current page
  const getCurrentPageShifts = () => {
    const startIndex = (currentPage - 1) * 5;
    const endIndex = Math.min(startIndex + 5, filteredShifts.length);
    return filteredShifts.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [shifts, searchEmployee, searchDepartment, searchDate]);

  return (
    <Container>
      <h2 className="my-4">Shift Schedule</h2>
      <button className="btn btn-secondary" onClick={toggleAddShift}>
        Add Shift
      </button>
      {showAddShift && <AddShift />}
      <Row>
        <Col md={12}>
          <input
            type="text"
            placeholder="Search by Employee Name"
            value={searchEmployee}
            onChange={(e) => setSearchEmployee(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Department Name"
            value={searchDepartment}
            onChange={(e) => setSearchDepartment(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Shift Date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Edit Shift</th>
                <th>Name</th>
                <th>Department</th>
                <th>Manager Name</th>
                <th>Date</th>
                <th>Starting Hour</th>
                <th>Ending Hour</th>
                <th>Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageShifts().map((shift) => (
                <tr key={shift._id}>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => toggleEditShift(shift._id)}
                    >
                      Edit
                    </button>
                    {editShiftId === shift._id && (
                      <Shift key={shift._id} shift={shift} />
                    )}
                  </td>
                  <td>{getEmployeeName(shift.employeeId)}</td>
                  <td>{getDepartmentNameByEmployeeId(shift.employeeId)}</td>
                  <td>{getDepartmentManagerByEmployeeId(shift.employeeId)}</td>
                  <td>{new Date(shift.date).toLocaleDateString()}</td>
                  <td>{shift.startingHour}:00</td>
                  <td>{shift.endingHour}:00</td>
                  <td>{shift.sumHours}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination className="d-flex justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default Shifts;

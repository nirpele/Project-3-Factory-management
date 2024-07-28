import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Table, Button, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ShiftsView = () => {
  const shifts = useSelector((state) => state.shifts);
  const employees = useSelector((state) => state.employees);
  const departments = useSelector((state) => state.departments);

  const [editShiftId, setEditShiftId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Sort the shifts by date
  const sortedShifts = [...shifts]?.sort((b, a) => new Date(a.date) - new Date(b.date));

  // Function to get employee name by ID
  const getEmployeeName = (employeeId) => {
    const employee = employees?.find((emp) => emp._id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : "Unknown";
  };

  const getDepartmentNameByEmployeeId = (employeeId) => {
    // Find the employee by their ID
    const employee = employees?.find((emp) => emp._id === employeeId);
    if (!employee) {
      return "Unknown Department";
    }
    // Use the employee's departmentId to find the department
    const department = departments?.find((dept) => dept._id === employee.departmentId);
    return department ? department.name : "Unknown Department";
  };
  const getDepartmentManegerByEmployeeId = (employeeId) => {
    const employee = employees?.find((emp) => emp._id === employeeId);
    if (!employee) {
      return "Unknown Department";
    }
    const department = departments?.find((dept) => dept._id === employee.departmentId);
    const manager = employees.find((emp) => emp._id === department.managerId);
    if (!manager) {
      return "Unknown Department";
    }
    return manager ? `${manager.firstName} ${manager.lastName}`.toLowerCase() : '';
  };

  const totalPages = Math.ceil(sortedShifts.length / 5);

  // Get shifts for the current page
  const getCurrentPageShifts = () => {
    const startIndex = (currentPage - 1) * 5;
    const endIndex = Math.min(startIndex + 5, sortedShifts.length);
    return sortedShifts.slice(startIndex, endIndex);
  };

  // Function to handle pagination
  const handlePageChange = (page) => {
    console.log("Changing to page:", page); // Debug log
    setCurrentPage(page);
  };

  useEffect(() => {
    // Reset current page when shifts change
    setCurrentPage(1);
  }, [shifts]);

  return (
    <Container>
      <h2 className="my-4">Shift Schedule</h2>
      <Row>
        <Col md={12}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Manager Name</th>
                <th>Date</th>
                <th>Starting Hour</th>
                <th>Ending Hour</th>
                <th>total Hours</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageShifts().map((shift) => (
                <tr key={shift._id}>
                  <td>{getEmployeeName(shift.employeeId)}</td>
                  <td>{getDepartmentNameByEmployeeId(shift.employeeId)}</td>
                  <td>{getDepartmentManegerByEmployeeId(shift.employeeId)}</td>
                  <td>{new Date(shift.date).toLocaleDateString()}</td>
                  <td>{shift.startingHour}:00</td>
                  <td>{shift.endingHour}:00</td>
                  <td>{shift.sumHours}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Pagination Buttons */}
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

export default ShiftsView;

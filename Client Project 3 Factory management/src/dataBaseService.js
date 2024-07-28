import axios from "axios";
const accessToken = sessionStorage["accessToken"];
const mainUrl = "http://localhost:3000/";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addEmployee = async (employee) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/employees",
      employee,
      {
        headers: {
          "x-access-token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    // Handle the error here
    console.error("Error adding employee:", error);
    alert("Error adding employee: " + error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteEmployee = async (employeeId) => {
  try {
    await axios.delete(`http://localhost:3000/employees/${employeeId}`, {
      headers: {
        "x-access-token": accessToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Handle the error here
    console.error("Error deleting employee:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateEmployee = async (employeeId, employee) => {
  try {
    await axios.put(`http://localhost:3000/employees/${employeeId}`, employee, {
      headers: {
        "x-access-token": accessToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Handle the error here
    console.error("Error update employee:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const employeesDatabase = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/employees")
    return data;
  } catch (error) {
    // Handle the error here
    console.error("Error load employees:", error);
    alert("Error load employees: " + error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addDepartment = async (department) => {
  try {
    console.log(department);
    const { data } = await axios.post(
      "http://localhost:3000/departments",
      department,
      {
        headers: {
          "x-access-token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    // Handle the error here
    console.error("Error adding department:", error);
    alert("Error adding department: " + error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteDepartment = async (departmentId) => {
  try {
    await axios.delete(`http://localhost:3000/departments/${departmentId}`, {
      headers: {
        "x-access-token": accessToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Handle the error here
    console.error("Error deleting department:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateDepartment = async (departmentId, department) => {
  try {
    await axios.put(
      `http://localhost:3000/departments/${departmentId}`,
      department,
      {
        headers: {
          "x-access-token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    // Handle the error here
    console.error("Error updating department:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const departmentsDatabase = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/departments")
    return data;
  } catch (error) {
    console.error("Error adding employee:", error);
    alert("Error laod departments: " + error);
    throw error;
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addShift = async (shift) => {
  try {
    console.log(shift);
    const { data } = await axios.post("http://localhost:3000/shifts", shift, {
      headers: {
        "x-access-token": accessToken,
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    // Handle the error here
    console.error("Error adding shift:", error);
    alert("Error adding shift: " + error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateShift = async (shiftId, shift) => {
  try {
    await axios.put(`http://localhost:3000/shifts/${shiftId}`, shift, {
      headers: {
        "x-access-token": accessToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Handle the error here
    console.error("Error updating shift:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteShift = async (shiftId) => {
  try {
    await axios.delete(`http://localhost:3000/shifts/${shiftId}`, {
      headers: {
        "x-access-token": accessToken,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Handle the error here
    console.error("Error deleting shift:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const shiftsDatabase = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/shifts");
    return data;
  } catch (error) {
    // Handle the error here
    console.error("Error loading shifts:", error);
    alert("Error loading shifts: " + error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

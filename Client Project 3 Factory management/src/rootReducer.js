const initialState = {
  departments: [],
  employees: [],
  shifts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD": {
      return {
        ...state,
        employees: action.payload.employees,
        departments: action.payload.departments,
        shifts:action.payload.shifts
      };
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Employees CRUD
    case "ADD EMPLOYEE": {
      return {
        ...state,
        employees: [...state.employees, { ...action.payload }],
      };
    }

    case "DELETE EMPLOYEE": {
      const employees = [...state.employees];
      const employeeIdToDelete = action.payload;
      const index = employees.findIndex(
        (employee) => employee._id === employeeIdToDelete
      );
      if (index !== -1) {
        employees.splice(index, 1);
      }

      return { ...state, employees: employees };
    }

    case "UPDATE EMPLOYEE": {
      const employees = [...state.employees];
      const index = employees.findIndex(
        (employee) => employee._id === action.payload._id
      );
      if (index !== -1) {
        const updatedEmployee = { ...action.payload };
        employees[index] = updatedEmployee;
      }

      return { ...state, employees: employees };
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Departments CRUD
    case "DELETE DEPARTMENT": {
      const departments = [...state.departments];
      const departmentIdToDelete = action.payload;
      const index = departments.findIndex(
        (department) => department._id === departmentIdToDelete
      );
      if (index !== -1) {
        departments.splice(index, 1);
      }

      return { ...state, departments: departments };
    }

    case "UPDATE DEPARTMENT": {
      const departments = [...state.departments];
      const index = departments.findIndex(
        (department) => department._id === action.payload._id
      );
      if (index !== -1) {
        const updatedDepartment = { ...action.payload };
        departments[index] = updatedDepartment;
      }

      return { ...state, departments: departments };
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    case "ADD DEPARTMENT": {
      return {
        ...state,
        departments: [...state.departments, { ...action.payload }],
      };
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //shift crud
    case "DELETE SHIFT": {
      const shifts = [...state.shifts];
      const shiftIdToDelete = action.payload;
      const index = shifts.findIndex(
        (shift) => shift._id === shiftIdToDelete
      );
      if (index !== -1) {
        shifts.splice(index, 1);
      }
    
      return { ...state, shifts: shifts };
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    case "UPDATE SHIFT": {
      const shifts = [...state.shifts];
      const index = shifts.findIndex(
        (shift) => shift._id === action.payload._id
      );
      if (index !== -1) {
        const updatedShift = { ...action.payload };
        shifts[index] = updatedShift;
      }
    
      return { ...state, shifts: shifts };
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    case "ADD SHIFT": {
      return {
        ...state,
        shifts: [...state.shifts, { ...action.payload }],
      };
    }
    
    default:
      return state;
  }
};

export default rootReducer;

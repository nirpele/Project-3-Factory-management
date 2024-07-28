import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteDepartment, updateDepartment } from "../../dataBaseService";

const UpdateDepartment = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments);

  const [departmentState, setDepartmentState] = useState({
    firstName: "",
    lastName: "",
    startWorkYear: 0,
    departmentID: "",
  });

  useEffect(() => {
    if (departmentId && departments.length > 0) {
      const departmentParam = departments?.find(
        (department) => department._id === departmentId
      );
      console.log("Department Param:", departmentParam);
      setDepartmentState(departmentParam);
      console.log("Department State:", departmentState);
    }
  }, [departments]);

  const handleUpdate = async () => {
    await updateDepartment(departmentId, departmentState)
      .then(() => {
        dispatch({
          type: "UPDATE DEPARTMENT",
          payload: { ...departmentState, _id: departmentState._id },
        });
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error updating department:", error);
      });
  };

  const handleDelete = async () => {
    await deleteDepartment(departmentId)
      .then(() => {
        dispatch({ type: "DELETE DEPARTMENT", payload: departmentId });
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error deleting department:", error);
      });
  };

  return (
    <div
      style={{
        width: "50%",
        float: "left",
        border: "3px solid red",
        padding: "10px",
        margin: "0 0 10px",
      }}
    >
      <>
        <br />
        name:
        <input
          type="text"
          value={departmentState?.name}
          onChange={(e) =>
            setDepartmentState({ ...departmentState, name: e.target.value })
          }
        />
        <br />
        managerId:
        <input
          type="text"
          value={departmentState?.managerId}
          onChange={(e) =>
            setDepartmentState({
              ...departmentState,
              managerId: e.target.value,
            })
          }
        />
        <br />
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </>
    </div>
  );
};

export default UpdateDepartment;

import "../css/UsersTable.css"

function UsersTable({
    userData,
    isLoading,
    handleSingleCheck,
    isAllChecked,
    handleAllCheck,
    handleEditUserBtn,
    editUserObj,
    editUserData,
    handleSaveButton,
    handleCancelButton,
    handleDeleteButton
}) {

    const handleEditUserData = (event) => {
        editUserData(prevData => ({ ...prevData, [event.target.name]: event.target.value }))
    }


    return (isLoading ? (
        <div className="d-flex justify-content-center align-items-center my-5">
            <div className="spinner-border" role="status" >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    ) : (
        userData.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center my-5">
                <h4>No User Found</h4>
            </div>
        ) : (
            <div className="table-responsive px-5 py-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="checkbox-col-style">
                                <input
                                    className="form-check-input checkbox-style"
                                    type="checkbox"
                                    checked={isAllChecked}
                                    aria-label="Select/UnSelect All"
                                    onChange={handleAllCheck}
                                />
                            </th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user) => (
                            (Object.values(editUserObj).length > 0 && user.id === editUserObj.id) ?
                                (
                                    <tr key={user.id}>
                                        <td>
                                            <input
                                                className="form-check-input checkbox-style"
                                                type="checkbox"
                                                checked={user.isChecked}
                                                aria-label={`Select/UnSelect ${user.name}`}
                                                onChange={() => handleSingleCheck(user.id)}
                                                disabled
                                            />
                                        </td>
                                        <td className="w-25">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                placeholder="Enter your name"
                                                value={editUserObj.name}
                                                name="name"
                                                onChange={handleEditUserData}
                                            />
                                        </td>
                                        <td className="w-25">
                                            <input
                                                type="email"
                                                className="form-control form-control-sm"
                                                placeholder="Enter your email"
                                                value={editUserObj.email}
                                                name="email"
                                                onChange={handleEditUserData}
                                            />
                                        </td>
                                        <td className="w-25">
                                            <select className="form-select form-select-sm" name="role" value={editUserObj.role} onChange={handleEditUserData}>
                                                <option value="member">Member</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-success btn-sm me-3" onClick={handleSaveButton}>Save</button>
                                            <button type="button" className="btn btn-danger btn-sm" onClick={handleCancelButton}>Cancel</button>
                                        </td>
                                    </tr>
                                ) :
                                (
                                    <tr key={user.id} className={`${user.isChecked ? 'selected-row' : ''}`}>
                                        <td>
                                            <input
                                                className="form-check-input checkbox-style"
                                                type="checkbox"
                                                checked={user.isChecked}
                                                aria-label={`Select/UnSelect ${user.name}`}
                                                onChange={() => handleSingleCheck(user.id)}
                                            />
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td className="text-capitalize">{user.role}</td>
                                        <td>
                                            <i onClick={() => handleEditUserBtn(user)} title="Edit" className="bi bi-pencil-square me-4 edit-icon"></i>
                                            <i onClick={() => handleDeleteButton(user.id)} title="Delete" className="bi bi-trash3-fill text-danger delete-icon"></i>
                                        </td>
                                    </tr>
                                )
                        ))}
                    </tbody>
                </table>
            </div>
        )
    ))
}

export default UsersTable
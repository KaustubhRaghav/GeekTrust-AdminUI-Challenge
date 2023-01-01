import { useState, useEffect } from "react"
import Header from "./Header"
import SearchUsers from "./SearchUsers"
import UsersTable from "./UsersTable"
import UsersTablePagination from "./UsersTablePagination"
import Toast from "./Toast"
import { USERS_PER_PAGE, EMAIL_REGEX, VALID_USERNAME_LENGTH } from "../../services/constants"
import { FETCH_USERS } from "../../services/api"
import axios from "axios"

function Users() {
    const [isLoading, setLoadingStatus] = useState(false)
    const [usersData, setUsersData] = useState([])
    const [filteredUsersData, setFilteredUsersData] = useState([])
    const [searchText, setSearchText] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [currentUsersData, setCurrentUsersData] = useState([])
    const [isAllChecked, setAllCheckedStatus] = useState(false)
    const [editUserObj, setEditUserObj] = useState({})
    const [toastMsgObj, setToastMsgObj] = useState({ label: "", message: "" })

    useEffect(() => {
        getUsersData()
    }, [])

    useEffect(() => {
        let lastUserIndex = currentPage * USERS_PER_PAGE;
        let firstUserIndex = lastUserIndex - USERS_PER_PAGE
        setCurrentUsersData(filteredUsersData.slice(firstUserIndex, lastUserIndex))
        setAllCheckedStatus(false)
    }, [currentPage, filteredUsersData])

    useEffect(() => {
        if (searchText.length > 0) {
            let filteredResult = usersData.filter(user => Object.values(user).join("").toLowerCase().includes(searchText.toLowerCase()))
            setCurrentPage(1)
            setFilteredUsersData(filteredResult)
            setAllCheckedStatus(false)
        } else {
            setCurrentPage(1)
            setFilteredUsersData(usersData)
            setAllCheckedStatus(false)
        }
    }, [searchText])

    useEffect(() => {
        let allSelected = currentUsersData.every(user => user.isChecked)
        allSelected ? setAllCheckedStatus(true) : setAllCheckedStatus(false)
    }, [currentUsersData])

    let pageNumbers = []
    for (let page = 1; page <= Math.ceil(filteredUsersData.length / USERS_PER_PAGE); page++) {
        pageNumbers.push(page)
    }

    if (toastMsgObj.label.length > 0 && toastMsgObj.message.length > 0) {
        setTimeout(() => {
            setToastMsgObj({ label: "", message: "" })
        }, 2000)
    }

    const getUsersData = async () => {
        setLoadingStatus(true)
        try {
            let response = await axios.get(FETCH_USERS)
            let modifiedResponse = formattedResponse(response.data)
            setUsersData(modifiedResponse)
            setFilteredUsersData(modifiedResponse)
            setLoadingStatus(false)
        } catch (error) {
            console.log(error)
        }
    }

    const formattedResponse = (dataArr) => {
        return dataArr.map(data => ({
            ...data, isEdited: false, isChecked: false
        }))
    }

    const handleRestoreButton = () => {
        getUsersData()
        setCurrentPage(1)
        setSearchText("")
    }

    const handleSearchInput = (event) => {
        if (Object.values(editUserObj).length > 0) {
            setToastMsgObj({ label: "error", message: "Cannot search while editing. Please save or cancel the edited changes!" })
        } else {
            setSearchText(event.target.value)
        }
    }

    const handlePageNumber = num => {
        setCurrentPage(num)
    }

    const handleSingleCheck = (userId) => {
        let updateCheckStatus = currentUsersData.map(user => {
            if (user.id === userId) {
                return { ...user, isChecked: !user.isChecked }
            } else {
                return user
            }
        })
        setCurrentUsersData(updateCheckStatus)
    }

    const handleAllCheck = (event) => {
        setAllCheckedStatus(event.target.checked)

        let updateCheckStatus = currentUsersData.map(user => ({ ...user, isChecked: event.target.checked }))
        setCurrentUsersData(updateCheckStatus)
    }

    const handleEditUserBtn = (userObj) => {
        setEditUserObj(userObj)
    }

    const handleDeleteButton = (userId) => {
        setFilteredUsersData(prevData => {
            return prevData.filter(data => data.id !== userId)
        })

        setUsersData(prevData => {
            return prevData.filter(data => data.id !== userId)
        })

        setToastMsgObj({ label: "success", message: "User deleted successfully!" })
    }

    const checkValidation = (userObj) => {

        if (userObj.name.length === 0 || userObj.email.length === 0) {
            setToastMsgObj({ label: "error", message: "Please fill all the fields" })
            return false
        } else if (userObj.name.length < VALID_USERNAME_LENGTH) {
            setToastMsgObj({ label: "error", message: `Name must be atleast ${VALID_USERNAME_LENGTH} characters` })
            return false
        } else if (!EMAIL_REGEX.test(userObj.email)) {
            setToastMsgObj({ label: "error", message: "Please enter valid email address Ex: example@example.com" })
            return false
        }
        return true
    }

    const handleSaveButton = () => {
        if (checkValidation(editUserObj)) {
            setFilteredUsersData(prevData => {
                return prevData.map(data => {
                    if (data.id === editUserObj.id) {
                        return editUserObj
                    } else {
                        return data
                    }
                })
            })

            setUsersData(prevData => {
                return prevData.map(data => {
                    if (data.id === editUserObj.id) {
                        return editUserObj
                    } else {
                        return data
                    }
                })
            })

            setEditUserObj({})
            setToastMsgObj({ label: "success", message: "User details changed successfully!" })
        }
    }

    const handleCancelButton = () => {
        setEditUserObj({})
    }

    const handleDeleteSelectedButton = () => {
        let selectedUsersId = currentUsersData.filter(user => user.isChecked).map(user => user.id)

        setFilteredUsersData(prevData => {
            return prevData.filter(data => !selectedUsersId.includes(data.id))
        })

        setUsersData(prevData => {
            return prevData.filter(data => !selectedUsersId.includes(data.id))
        })

        if ((selectedUsersId.length === currentUsersData.length) && currentPage === pageNumbers[pageNumbers.length - 1]) {
            setCurrentPage(1)
        }

        setToastMsgObj({ label: "success", message: "Users deleted successfully!" })
    }

    return (
        <div>
            <Header handleRestoreButton={handleRestoreButton} />

            <Toast label={toastMsgObj.label} message={toastMsgObj.message} />

            <SearchUsers
                searchText={searchText}
                handleSearchInput={handleSearchInput}
            />

            <UsersTable
                userData={currentUsersData}
                isLoading={isLoading}
                handleSingleCheck={handleSingleCheck}
                isAllChecked={isAllChecked}
                handleAllCheck={handleAllCheck}
                handleEditUserBtn={handleEditUserBtn}
                editUserObj={editUserObj}
                editUserData={setEditUserObj}
                handleSaveButton={handleSaveButton}
                handleCancelButton={handleCancelButton}
                handleDeleteButton={handleDeleteButton}
            />

            <UsersTablePagination
                handlePageNumber={handlePageNumber}
                pageNumbers={pageNumbers}
                currentPage={currentPage}
                handleDeleteSelectedButton={handleDeleteSelectedButton}
            />
        </div>
    )
}

export default Users
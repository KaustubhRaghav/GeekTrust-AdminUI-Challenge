import "../css/SearchUsers.css"

function SearchUsers({ searchText, handleSearchInput }) {
    return (
        <div className="pt-4 d-flex justify-content-center align-items-center">
            <div className="input-group w-50">
                <input
                    type="search"
                    className="form-control search-bar"
                    placeholder="Search by name, email or role"
                    aria-label="Search by name, email or role"
                    aria-describedby="Search"
                    autoFocus
                    name="search"
                    value={searchText}
                    onChange={handleSearchInput}
                />
                <span className="input-group-text search-icon-container" id="Search">
                    <i className="bi bi-search"></i>
                </span>
            </div>
        </div>
    )
}

export default SearchUsers
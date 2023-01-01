import "../css/UsersTablePagination.css"

function UsersTablePagination({ handlePageNumber, pageNumbers, currentPage, handleDeleteSelectedButton }) {
    return (
        <div className="container">
            {(pageNumbers.length > 0) && (
                <div className="row px-5">
                    <div className="col-12 col-lg-3 d-flex justify-content-center justify-content-lg-start align-items-center mb-3 mb-lg-0">
                        <button type="button" className="btn btn-danger" onClick={handleDeleteSelectedButton} title="Delete Selected">Delete Selected</button>
                    </div>
                    <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center mb-3 mb-lg-0">
                        <button
                            type="button"
                            className={`me-2 ${currentPage === pageNumbers[0] ? 'disabled-button' : 'pagination-button-unselected'}`}
                            onClick={() => handlePageNumber(1)}
                            disabled={currentPage === pageNumbers[0]}
                            title="First Page"
                        >
                            {"<<"}
                        </button>

                        <button
                            type="button"
                            className={`me-2 ${currentPage === pageNumbers[0] ? 'disabled-button' : 'pagination-button-unselected'}`}
                            onClick={() => ((currentPage - 1) > 0) && handlePageNumber(currentPage - 1)}
                            disabled={currentPage === pageNumbers[0]}
                            title="Previous Page"
                        >
                            {"<"}
                        </button>

                        {pageNumbers.map(num => (
                            <button
                                type="button"
                                className={`me-2 ${currentPage === num ? 'pagination-button-selected' : 'pagination-button-unselected'}`}
                                key={num}
                                onClick={() => handlePageNumber(num)}
                                title={`Page ${num}`}
                            >
                                {num}
                            </button>
                        ))}

                        <button
                            type="button"
                            className={`me-2 ${currentPage === pageNumbers[pageNumbers.length - 1] ? 'disabled-button' : 'pagination-button-unselected'}`}
                            onClick={() => ((currentPage + 1) <= pageNumbers.length) && handlePageNumber(currentPage + 1)}
                            disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
                            title="Next Page"
                        >
                            {">"}
                        </button>

                        <button
                            type="button"
                            className={`me-2 ${currentPage === pageNumbers[pageNumbers.length - 1] ? 'disabled-button' : 'pagination-button-unselected'}`}
                            onClick={() => handlePageNumber(pageNumbers[pageNumbers.length - 1])}
                            disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
                            title="Last Page"
                        >
                            {">>"}
                        </button>
                    </div>
                    <div className="col-12 col-lg-3 d-flex justify-content-center justify-content-lg-end align-items-center">
                        {`${currentPage} of ${pageNumbers.length}`}
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default UsersTablePagination
function Header({handleRestoreButton}) {
    return (
        <div className="px-3 py-2 d-flex justify-content-between align-items-center border-bottom bg-light">
            <h2 className="fw-bolder">Admin UI</h2>
            <button type="button" className="btn btn-primary" onClick={handleRestoreButton} title="Restore">Restore</button>
        </div>
    )
}

export default Header
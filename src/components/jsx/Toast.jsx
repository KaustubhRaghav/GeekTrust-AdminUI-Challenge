import "../css/Toast.css"

function Toast({ message, label }) {
    return ((label.length > 0 && message.length > 0) ?
        <div className="mb-4">
            <div className={`toast-container ${label === "error" ? 'error-label' : 'success-label'}`}>
                {message}
            </div>
        </div>
        :
        null)
}

export default Toast
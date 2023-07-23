function Status (props) {
    //destructuring props
    const status = props.status;
    return (
        <div className="status">{status}</div>
    )
}

export default Status;
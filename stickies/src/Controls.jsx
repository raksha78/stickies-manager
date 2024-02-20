import AddStickieForm from './AddStickieForm';

function Controls({ onRefresh, onLogout, username, onAddStickie}) {
    return (
        <div className="controls">
            <div className="controls__main">
                <button className="controls__refresh" onClick={onRefresh}><span>Refresh</span><i className="gg-redo"></i></button>
                <button className="controls__logout" onClick={onLogout}><span>Logout</span><i className="gg-log-out"></i></button>
            </div>
            <div className="controls__user">
                <span className="user">Hello,{ } {username}</span>
            </div>
            <AddStickieForm  onAddStickie={onAddStickie}/>
        </div>
    );
}

export default Controls;
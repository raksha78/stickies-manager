import Controls from './Controls';
import './Header.css';

function Header({ username, onLogout, onRefresh, onAddStickie }) {
    return (
        <div className="header">
            <div className="title">
                <h1 className="header__title">Stickies </h1><span className="header__sub">Organize Todos, and Capture Thoughts!</span>
            </div>
            <Controls onLogout={onLogout} onRefresh={onRefresh} username={username} onAddStickie={onAddStickie}/>
        </div>
    );
}

export default Header;
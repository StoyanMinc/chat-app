import Profile from "./Profile";
import UsersList from "./UsersList";

export default function MenuBar() {
    return (
        <div className="menu-bar">
            <Profile />
            <div className="search">
                <div className="search-icon"></div>
                <input type="search" placeholder="Search friends..." />
            </div>
            <UsersList />
        </div>
    )
}
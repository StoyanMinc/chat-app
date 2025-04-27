import Profile from "./Profile";
import Search from "./Search";
import UsersList from "./UsersList";

export default function MenuBar() {
    return (
        <div className="menu-bar">
            <Profile />
            <Search />
            <UsersList />
        </div>
    )
}
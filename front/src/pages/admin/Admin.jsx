
import { AdminNavBar } from "./AdminNavBar";
export function Admin({ isUserAdminToggle }) {

  return (
    <div className="admin">
      <div className="admin__left">
        {isUserAdminToggle && <AdminNavBar />}
      </div>
      <div className="admin__right">
        <p>Welcome to the admin page</p>
        <p>Where you can manage your articles, stock and commands</p>
      </div>

    </div>
  );
}
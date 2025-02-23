import { AdminNavBar } from "./AdminNavBar";
import { AddArticleForm } from "../../components/forms/AddArticleForm";

export function AdminAdd(isUserAdminToggle){
    return (
        <div className="adminAdd">
               {isUserAdminToggle && <AdminNavBar />}
            < AddArticleForm formId="formAdd" /> 
        </div>
    );
}
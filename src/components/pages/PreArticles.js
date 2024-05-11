import {useState, useEffect} from "react";
import Articles from "../utils/Articles";
import ErrorArticle from "../others/ErrorArticle";

const PreArticles = (props) => {
    const [isFoundArticle, setIsFoundArticle] = useState(true);

    useEffect(()=>{
        if(	props.data.length === 0){
            setIsFoundArticle(false);
        }else{
            setIsFoundArticle(true);
        }
    },[props]);

return (
    <>
        {isFoundArticle && <Articles data={props.data} isAdmin={props.isAdmin} refresh={props.refresh} stateRefresh={props.stateRefresh}/>}
        {!isFoundArticle && <ErrorArticle />}
    </>
);
};
export default PreArticles;
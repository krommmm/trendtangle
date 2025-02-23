import { useState } from "react";
import { SelectOption } from "../common/SelectOption";
import { createArticle } from "../../services/service_articles";

export function AddArticleForm({ formId = "myForm" }) {

    const [isNew, setIsNew] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("pull");
    const [selectedGender, setSelectedGender] = useState("male");
    const [selectedColor, setSelectedColor] = useState("blue");
    const [fetchAnswer, setFetchAnswer] = useState(false)

    const selectOptionInfos = [
        { labelName: "category", optionNames: ["pull", "t-shirt", "pants", "shoes"] },
        { labelName: "gender", optionNames: ["male", "female", "unisex", "child"] },
        { labelName: "color", optionNames: ["blue", "orange", "green", "white", "black"] }
    ];

    function toggleIsNew() {
        setIsNew(!isNew);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = createFormData(form);
        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));
        const answer = await createArticle(formData, token);
        form.reset();
        if (answer.ok) {
            setFetchAnswer(true);
        } else {
            setFetchAnswer(false);
        }


    }

    function createFormData(form) {

        const formData = new FormData();
        const formData2 = new FormData(form);
        formData.append("name", formData2.get("name"));
        formData.append("price", formData2.get("price"));
        formData.append("stock", formData2.get("stock"));
        formData.append("isNew", isNew);
        formData.append("discount", formData2.get("discount"));
        formData.append("stars", formData2.get("stars"));
        formData.append("imgUrl", form.imgUrl.files[0]); 
        formData.append("color", selectedColor);
        formData.append("gender", selectedGender);
        formData.append("category", selectedCategory);

        return formData;
    }


    return (

        <form id={formId} onSubmit={(e) => handleSubmit(e)}>
            <div className="inputs">
                <div>
                    <label htmlFor={`${formId}--name`}>Name: </label>
                    <input type="text" name="name" id={`${formId}--name`} placeholder="Name" />
                </div>
                <div>
                    <label htmlFor={`${formId}--price`}>Price: </label>
                    <input type="number" name="price" id={`${formId}--price`} placeholder="Price" step="0.01" />
                </div>
                <div>
                    <label htmlFor={`${formId}--stock`}>Stock: </label>
                    <input type="number" name="stock" id={`${formId}--stock`} placeholder="Stock" />
                </div>
                <div>
                    <label htmlFor={`${formId}--discount`}>Discount: </label>
                    <input type="number" name="discount" id={`${formId}--discount`} placeholder="Discount" min="0.01" max="99.99" step="0.01"/>
                </div>
                <div>
                    <label htmlFor={`${formId}--stars`}>Stars: </label>
                    <input type="number" name="stars" id={`${formId}--stars`} placeholder="Stars" min="0" max="5" />
                </div>
                <div>
                    <label htmlFor={`${formId}--imgUrl`}>Image: </label>
                    <input type="file" name="imgUrl" id={`${formId}--imgUrl`} />
                </div>
            </div>
            <div className="rest">
                <div>
                    <label htmlFor="new">New ?: </label>
                    <div className="isNew" onClick={(e) => toggleIsNew(e)}>{isNew ? "New" : "Old"}</div>
                </div>
                <div>
                    <SelectOption info={selectOptionInfos[0]} back={setSelectedCategory} />
                </div>
                <div>
                    <SelectOption info={selectOptionInfos[1]} back={setSelectedGender} />
                </div>
                <div>
                    <SelectOption info={selectOptionInfos[2]} back={setSelectedColor} />
                </div>
                <div className="submitContainer">
                    <button>Submit</button>
                </div>
                <div className={`formAddAnswer--${fetchAnswer ? "green" : "red"}  formAddAnswer--${JSON.stringify(fetchAnswer)}`}>{fetchAnswer ? "Article created" : "Article could not be created"}</div>
            </div>



        </form>
    );
}
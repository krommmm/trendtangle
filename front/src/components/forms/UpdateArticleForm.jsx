import { SelectOption } from "../common/SelectOption";
import { useState } from "react";
import { modifyArticle } from "../../services/service_articles";

export function UpdateArticleForm({ article, closeModal, onUpdate }) {

    const [isNew, setIsNew] = useState(article.isNew);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [fetchAnswer, setFetchAnswer] = useState(null);

    const [formData, setFormDAta] = useState({
        name: null,
        price: null,
        stock: null,
        discount: null,
        stars: null,
        imgUrl: null,
        isNew: null,
        category: selectedCategory,
        gender: selectedGender,
        color: selectedColor,
    });

    const [answerData, setAnswerData] = useState({
        success: {
            color: "green", msg: "article updated", active: "false"
        },
        faillure: {
            color: "red", msg: "article could not update", active: "false"
        }
    });



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
        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));
        const articleId = e.target.id;

        let myFormData = new FormData();
        if (form.imgUrl.files[0] !== undefined) myFormData.append("imgUrl", form.imgUrl.files[0]);

        myFormData.append("isNew", isNew);
        console.log(isNew);

        const formDataWithoutImgKey = formData;
        delete formDataWithoutImgKey.imgUrl;

        let isObjEmpty = true;
        for (let i = 0; i < Object.keys(formDataWithoutImgKey).length; i++) {
            const key = Object.keys(formDataWithoutImgKey)[i];
            const value = Object.values(formDataWithoutImgKey)[i];
            if (value && value !== undefined && value !== null && value !== "") {
                myFormData.append(`${key}`, value);
                isObjEmpty = false;
            }
        }
        if (isObjEmpty) {
            setFetchAnswer(false);
            setAnswerData({ ...answerData, success: { ...answerData.success, active: "false" } });
        }

        const res = await modifyArticle(myFormData, token, articleId);
        if (res.ok && !isObjEmpty) {
            setFetchAnswer(true);
            setAnswerData({ ...answerData, success: { ...answerData.success, active: "true" } })
        } else {
            setFetchAnswer(false);
            setAnswerData({ ...answerData, success: { ...answerData.success, active: "false" } })
        };

        setTimeout(() => {
            closeModal(false);
        }, 1500);


        form.reset();
        onUpdate();

    }



    return (
        <div className="formUpdateArticle">
            <div className="formUpdateArticle__header">

                <h3>Update your article</h3>
                <i className="fa-regular fa-circle-xmark formUpdateArticle__header__quit" onClick={() => closeModal(false)}></i>
            </div>
            <form id={article._id} onSubmit={(e) => handleSubmit(e)}>
                <div className="inputs">
                    <div>
                        <label htmlFor={`${article._id}--name`}>Name: </label>
                        <input type="text" name="name" id={`${article._id}--name`} placeholder="Name" onChange={(e) => setFormDAta({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor={`${article._id}--price`}>Price: </label>
                        <input type="number" name="price" id={`${article._id}--price`} placeholder="Price" step="0.01" onChange={(e) => setFormDAta({ ...formData, price: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor={`${article._id}--stock`}>Stock: </label>
                        <input type="number" name="stock" id={`${article._id}--stock`} placeholder="Stock" onChange={(e) => setFormDAta({ ...formData, stock: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor={`${article._id}--discount`}>Discount: </label>
                        <input type="number" name="discount" id={`${article._id}--discount`} placeholder="Discount" min="0.01" max="99.99" step="0.01" onChange={(e) => setFormDAta({ ...formData, discount: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor={`${article._id}--stars`}>Stars: </label>
                        <input type="number" name="stars" id={`${article._id}--stars`} placeholder="Stars" min="0" max="5" onChange={(e) => setFormDAta({ ...formData, stars: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor={`${article._id}--imgUrl`}>Image: </label>
                        <input type="file" name="imgUrl" id={`${article._id}--imgUrl`} onChange={(e) => setFormDAta({ ...formData, imgUrl: e.target.files[0] })} />
                    </div>
                </div>
                <div className="rest">
                    <div>
                        <label htmlFor="new">New ?: </label>
                        <div className="isNew" onClick={(e) => toggleIsNew(e)}>{isNew ? "New" : "Old"} </div>
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

                </div>

            </form>
            <div className="formUpdateArticle__footer">
                {fetchAnswer !== null && <p
                    className={`visible--true} submitContainer__answer--${fetchAnswer ? answerData.success.color : answerData.faillure.color} `}>
                    {fetchAnswer ? answerData.success.msg : answerData.faillure.msg}
                </p>
                }
            </div>
        </div>
    );
}
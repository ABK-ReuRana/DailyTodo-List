import React, { useEffect, useState } from 'react'
import "./style.css";

const imgSrc = "https://cdn-icons-png.flaticon.com/128/6463/6463127.png";

const getLocalData = () => {
    const lists = localStorage.getItem('myTodo');
    if (lists) {
        return JSON.parse(lists);
    }
    return [];
}

const TodoItems = () => {
    const [inputData, setInputData] = useState("");
    const [addedItems, setAddedItems] = useState(getLocalData());
    const [isEditItem, setisEditItem] = useState("");
    const [toggleBtn, setToggleBtn] = useState(false);
    // add items
    const addItem = () => {
        if (!inputData) {
            alert('plz Add Notes');
        } else if (inputData && toggleBtn) {
            // add bcz of edit
            setAddedItems(
                addedItems.map((currEle) => {
                   if(currEle.id === isEditItem){
                    return {...currEle, name :  inputData};
                   }
                   return currEle;
                })
            )
            setInputData("");
            setToggleBtn(false);
            setisEditItem();
        } else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setAddedItems([...addedItems, myNewInputData]);
        }
        setInputData("");
    }

    // delete items
    const removeItem = (id) => {
        const filterAllItems = addedItems.filter((itms) => itms.id !== id);
        setAddedItems(filterAllItems);
    }

    // remove All from Items
    const removeAll = () => {
        setAddedItems([]);
    }

    // edit the item
    const updateItem = (id) => {
        // get id of edit item
        const editedItem = addedItems.find((itm) => itm.id === id);
        setInputData(editedItem.name);  // update input data with edited item
        setisEditItem(id);
        setToggleBtn(true);
    }

    // local Storage 
    useEffect(() => {
        localStorage.setItem('myTodo', JSON.stringify(addedItems));
    }, [addedItems]);



    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src={imgSrc} alt="TODO LIST" />
                        <figcaption> Note-it App </figcaption>
                    </figure>

                    <div className='addItems'>
                        <input
                            type="text"
                            placeholder="Write Your Note"
                            className='form-control'
                            value={inputData}
                            onChange={(event) => setInputData(event.target.value)}
                        />
                        {
                            toggleBtn ? (<i className="far fa-edit add-btn" onClick={addItem}></i>) : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)
                        }
                    </div>

                    {/* Show our items */}
                    <div className='showItems'>
                        {
                            addedItems.map(currItem => {
                                return (
                                    <div className='eachItem' key={currItem.id}>
                                        <h3>{currItem.name}</h3>
                                        <div className='todo-btn'>
                                            <i className="far fa-edit add-btn" onClick={() => updateItem(currItem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" onClick={() => removeItem(currItem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className=''>
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>Check List</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoItems;

import React, { useState, useEffect } from 'react'
import './style.css'

// getting the items from localStorage
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists)
  } else {
    return []
  }
}

const Todo = () => {
  const [inputdata, setInputData] = useState("")
  const [items, setItems] = useState(getLocalData())
  const [isEditItem, setIsEditItem] = useState("")
  const [toggleButton, setToggleButton] = useState(false)

  // editing the items
  const editItem = (idno) => {
    const item_todo_edit = items.find((curElem) => {
      return curElem.id == idno
    })
    // setInputData(item_todo_edit.name)
    setIsEditItem(idno)
    setToggleButton(true)
  }

  // add items function to items state
  const addItem = () => {
    console.log(inputdata, "this is input data")
    if (!inputdata) {
      alert("Pls fill the data")
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata }
          }
          return curElem
        })
      )
      setIsEditItem()
      setToggleButton(false)
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      }
      setItems([...items, myNewInputData])
    }
    setToggleButton(false)
  }

  // deleting Items
  const deleteItem = (idno) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== idno;
    })
    setItems(updatedItems)
  }

  // removing all the items
  const removeAll = () => {
    setItems([])
  }

  // storing items into localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items))
  }, [items])


  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img src="./images/todo.svg" alt="todoimage" />
            <figcaption>Add items here</figcaption>
          </figure>
          <div className='addItems'>
            <input type="text" placeholder='✍Write here' className='form-control' value={inputdata} onChange={(e) => setInputData(e.target.value)} />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (<i className="fa fa-plus add-btn" onClick={addItem}></i>)
            }
          </div>

          {/* show our items */}
          <div className='showItems'>
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className='todo-btn'>
                    <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={() => {
                      deleteItem(curElem.id)
                    }}></i>
                  </div>
                </div>
              )
            })}
          </div>
          {/* remove all button */}
          <div className='showItems'><button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>Checklist</span></button></div>
        </div>
      </div>
    </>
  )
}

export default Todo;

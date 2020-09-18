import React, {useState} from 'react';
import axios from 'axios' ;


import plus from '../../assests/img/plus.svg';
import './AddTaskForm.scss'
function AddTaskForm({list, onAddTusk}){
const [visibleForm, setVisibleForm]=useState(false);
const [inputValue, setInputValue]= useState('');
const [isLoading, setIsLoading]= useState(false);

const toggleVisibleForm=()=>{
     setVisibleForm(!visibleForm)
     setInputValue('')
}
const addTusk=()=>{
    const obj= {
      listId: list.id,
      text: inputValue,  
      completed: false
    } 
    setIsLoading(true)
    axios
    .post('http://localhost:3001/tasks', obj)
    .then(({data})=>{
        console.log(data);
        onAddTusk(list.id, data)
        toggleVisibleForm()
    })
    .catch(()=>{
        alert('Помилка при додаванні задачі')
    })
    .finally(()=>{
        setIsLoading(false)
    })
   
}



return(
  
      <div className="task__form">
         {!visibleForm ?     <div onClick={toggleVisibleForm} className="task__form__new">
<img src={plus} alt="Plus"/>
<span>Нова задача</span>
    </div>: <div className="taska__add">
    <input
    value={inputValue}
    onChange={(event)=>setInputValue(event.target.value)}
     type="text"
    className="field"
    placeholder="Текст задачі"
    />
     <button disabled={isLoading}  onClick={addTusk} className="button">
        {isLoading? 'Додавання...' : 'Додати задачу' } 
         </button>
        <button onClick={toggleVisibleForm} className="button button__grey">Відміна</button>
    </div> }
</div>
)
};
export default  AddTaskForm;

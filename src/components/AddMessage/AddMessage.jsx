import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateApi } from '../../middleware/inputMiddleware';

function AddMessage({columnName,statusCol}) {
    const dataMessage = useSelector(state => state.input.dataMessage)
    const currentId = useSelector(state => state.input.id)
    const dispatch = useDispatch();
    function handleClick(e) {
        e.preventDefault()
        const column = dataMessage.length;
        const content = "Task" + (column + 1)
        dispatch(updateApi(columnName, statusCol, content,currentId + ""))
    }
  return (
    <div className="footer" onClick={handleClick}>
            <span>+</span>
            <div>Add task</div>
        </div>
  )
}

export default AddMessage
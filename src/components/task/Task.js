import classNames from 'classnames';
import {useState} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './task.scss';
import '../../style/style.scss';

const Tasks = ({tasks}) => {

    const [completed, setCompleted] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [listTask, setLisetTask] = useState([...tasks]);

    
    const onCompleted = (e) => {
        
        if (completed.indexOf(e.target.textContent) >= 0) {
            setCompleted(state => state.filter(item => item !== e.target.textContent))
        } else {
            setCompleted(state => state.concat([e.target.textContent]))
        }
    };

   const onFilters = (filter) => {
    if (!filter) {
        setLisetTask(tasks);
    } else {
        switch (filter) {
            case 'All': 
                setLisetTask(tasks);
                break;
            case 'Active': 
                setLisetTask(tasks.filter(item => !completed.includes(item)));
                    break;
            case 'Completed': 
                setLisetTask(tasks.filter(item => completed.includes(item)));
                    break;
            default:
                break;
        }
    }
   }

   const clearCompleted = () => {
        setCompleted([]);
        setActiveFilter('Active');
        setLisetTask(tasks);
   }

    const tasksRender = listTask.map(item => {
            return ( <CSSTransition key={item} timeout={500} classNames='fade'>
                    <li key={item} onClick={onCompleted} className={classNames({'task__completed': completed.includes(item) ? true : false})}>{item}</li>
                    </CSSTransition>
            )
         });

    return (
        <div className="task">
            <div className="task__wrapper"> 
                <div className="task__title">
                <div className="task__arrow"></div>
                    <h2 >What needs to be done?</h2></div>
                <div className="task__list">
                        <TransitionGroup component={'ul'}>
                            {tasksRender}
                        </TransitionGroup>
                </div>
                <div className="task__bottom">
                    <div className="task__bottom-items">{tasks.length - completed.length} items left</div>
                    <div className="task__bottom-filters">
                        <button onClick={() => {onFilters('All'); setActiveFilter('All');}}  className={classNames({'task__bottom-filters-active': activeFilter === 'All' ? true : false})}>All</button>
                        <button onClick={() => {onFilters('Active'); setActiveFilter('Active');}} className={classNames({'task__bottom-filters-active': activeFilter === 'Active' ? true : false})}>Active</button>
                        <button onClick={() => {onFilters('Completed'); setActiveFilter('Completed');}} className={classNames({'task__bottom-filters-active': activeFilter === 'Completed' ? true : false})}>Completed</button>
                    </div>
                        <button onClick={() =>clearCompleted()} className="task__bottom-clear">Clear completed</button>
                </div>
            </div>
        </div>
    )
}

export default Tasks;
import React, { Component } from 'react';
import Task from './components/Task';
import { fb } from './api/firebase';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      currentFilter: 'UNCOMPLETE',
      title: '',
      date: '',
      description: '',
      importance: '0',
      tasks: [],
      visibleTasks: []
    }
  }

  componentDidMount() {
    this.getTasksFromDatabase()
  }

  handleDayClick(day) {

    this.setState({ date: day.toLocaleDateString() }, () => {
      
    });
  }

  getTasksFromDatabase = () => {
    fb.database().ref('/tasks').on('value', (data) => {
      let tasks = data.toJSON(); // Object with tasks from Firebase
      if (tasks !== null) {
        let tasksArr = Object.values(tasks).reverse();
        this.setState({tasks: tasksArr, visibleTasks: tasksArr}, () => {
          this.filterTasks('UNCOMPLETE')
        })
      }
      // Now tasks are saved as an OBJECT and can be used in the app
    })
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addTask = (e) => {
    e.preventDefault();

    let ref = fb.database().ref('tasks/').push(); // push id = -LIzZ3G37W
    let pushId = ref.key;

    let newTask = {
      _id: pushId,
      title: this.state.title,
      date: this.state.date,
      importance: parseInt(this.state.importance),
      isDone: false
    }



    ref.set(newTask)

    this.setState({
      title: '',
      date: '',
      importance: ''
    })
  
  }

  filterTasks = (filter) => {
    switch(filter) {
      case 'ALL':
        this.setState({visibleTasks: this.state.tasks});
        break;
      case 'COMPLETE':
        this.setState({
          currentFilter: 'COMPLETE',
          visibleTasks: this.state.tasks.filter(t => t.isDone )})
        break;
      case 'UNCOMPLETE':
        this.setState({
          currentFilter: 'UNCOMPLETE',          
          visibleTasks: this.state.tasks.filter(t => t.isDone === false)})
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.formContainer}>      
          <form style={styles.form}>

            <div style={styles.formLabelLong}>
              <h3>Name a new task</h3>
              <input
                style={styles.longInput}
                autocomplete="off"
                type="text"
                name="title"
                placeholder="New task"
                value={this.state.title}
                onChange={this.handleInputChange}
                />
            </div> 

            <div style={styles.formLabelShort}>
              <h3>Choose a date</h3>
                <DayPickerInput
                    onDayChange={this.handleDayClick}
                    placeholder="DD.MM.YYYY"  
                />
            </div>

            <div style={styles.formLabelShort}>          
              <h3>Importance level</h3>
              <select value={this.state.importance} name="importance" onChange={this.handleInputChange}>
                <option value="0">Low</option>
                <option value="1">Medium</option>
                <option value="2">High</option>
              </select>
            </div>

            <button style={styles.buttonAddTask} onClick={this.addTask}>Add</button>    
          </form>
        </div>  


      <button
        style={this.state.currentFilter === 'UNCOMPLETE' ? styles.activeTextSelected : styles.activeText}
        onClick={() => {this.filterTasks('UNCOMPLETE')}}>Current tasks</button>

      <button 
        style={this.state.currentFilter === 'COMPLETE' ? styles.activeTextSelected : styles.activeText}      
        onClick={() => {this.filterTasks('COMPLETE')}}>Finished tasks</button>
      

      <div style={styles.taskContainer}>
        
        {this.state.visibleTasks.map(item =>
          <Task
              key={item._id}
              id={item._id}            
              title={item.title}
              date={item.date}
              importance={item.importance}
              isDone={item.isDone}
            />
        )}
       </div> 
      </div>
    );
  }
}
const styles = {
  container: {},
  formContainer: {
    paddingBottom: '64px'
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  formLabelLong: {
    display: 'flex',
    flexDirection: 'column',
    flex: '3',
    marginRight: '32px',    
  },
  formLabelShort: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    marginRight: '32px',    
  },
  buttonAddTask: {
    background: '#F58241',
    padding: '6px 48px',
    borderRadius: '40px',
    maxHeight: '41px',
    lineHeight: '1.7',    
    fontSize: '18px',
    color: 'white',
    fontWeight: '700',
  },
  taskContainer: {
    maxHeight: '800px',
    flexWrap: 'wrap',
    flexDirection: 'column',
    display: 'flex'
  },
  activeText: {
    color: '#000',
    marginRight: '45px',
    fontWeight: '700',
    fontFamily: 'Montserrat',
    fontSize: '18px',
  },
  activeTextSelected: {
    color: '#F58241',
    marginRight: '45px',
    fontWeight: '700',
    fontFamily: 'Montserrat',
    fontSize: '18px',
  },

}
export default App;

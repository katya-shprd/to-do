import React, { Component } from 'react';
import Task from './components/Task';
import { fb } from './api/firebase';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      description: '',
      importance: '',
      tasks: [],
      visibleTasks: []
    }
  }

  componentDidMount() {
    this.getTasksFromDatabase()
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
        this.setState({visibleTasks: this.state.tasks.filter(t => t.isDone )})
        break;
      case 'UNCOMPLETE':
        this.setState({visibleTasks: this.state.tasks.filter(t => t.isDone === false)})
    }
  }

  render() {
    return (
      <div className="App">
      
      <br/>
      <br/>
      <br/>      

      <button onClick={() => {this.filterTasks('ALL')}}>Show all</button>
      <button onClick={() => {this.filterTasks('COMPLETE')}}>Show complete tasks</button>
      <button onClick={() => {this.filterTasks('UNCOMPLETE')}}>Show uncomplete tasks</button>
            
      <br/>
      <br/>      
            
      <form>
        Title
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleInputChange}
          />


        Date
        <input
          type="text"
          value={this.state.date}
          name="date"
          onChange={this.handleInputChange}/>
        
        Importance
          <input
          type="text"
          value={this.state.importance}
          name="importance"
          onChange={this.handleInputChange}/>
         
        <button onClick={this.addTask}>Add Task</button>    
      </form>

      <br/>
      <br/>      

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
    );
  }
}

export default App;

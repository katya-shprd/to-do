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
      tasks: [
        
      ],
      visibleTasks: [
        
      ]
    }
  }

  componentDidMount() {
    // Retrieves tasks from Firebase as an object
    fb.database().ref('/tasks').on('value', (data) => {
        console.log(data.toJSON())
      let tasks = data.toJSON(); // Object with tasks from Firebase
      let tasksArr = Object.values(tasks);
      this.setState({tasks: tasksArr, visibleTasks: tasksArr})
      // Now tasks are saved as an OBJECT and can be used in the app
    })
  }

  renderTaskList = () => {
    let tasks = this.state.visibleTasks.concat(); // Array of tasks
    
    let taskComponents = tasks.map(item =>
        <Task
            key={item.id}
            id={item._id}            
            title={item.title}
            date={item.date}
            importance={item.importance}
            isDone={item.isDone}
          />
    ) // Array of components

    return taskComponents;
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
      importance: this.state.importance || 0,
      isDone: false
    }

    ref.set(newTask)
  
  }

  showComplete = () => {
    let tasks = this.state.tasks.concat();
    let filteredTasks = tasks.filter(item => item.isDone);

    this.setState({
      visibleTasks: filteredTasks
    })
  }

  showUncomplete = () => {
    let tasks = this.state.tasks.concat();
    let filteredTasks = tasks.filter(item => item.isDone === false);

    this.setState({
      visibleTasks: filteredTasks
    })
   
  }
  showAll = () => {
    this.setState({
      visibleTasks: this.state.tasks.concat()
    })
  }
  render() {
    return (
      <div className="App">
      
      <br/>
      <br/>
      <br/>      

      <button onClick={this.showComplete}>Show complete tasks</button>
      <button onClick={this.showUncomplete}>Show uncomplete tasks</button>
      <button onClick={this.showAll}>Show all</button>
            
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

      {this.renderTaskList()}
      
      </div>
    );
  }
}

export default App;

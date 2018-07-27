import React, { Component } from 'react';
import Task from './components/Task';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      description: '',
      importance: '',
      tasks: [
        {id: '1234', title: 'Learn React', date: 'Tomorrow', importance: 2, isDone: true},
        {id: '12345', title: 'Learn Firebase', date: '2 days', importance: 1, isDone: false},
        {id: '123456', title: 'Kiss Chipi', date: 'today', importance: 0, isDone: true}
      ],
      visibleTasks: [
        {id: '1234', title: 'Learn React', date: 'Tomorrow', importance: 2, isDone: true},
        {id: '12345', title: 'Learn Firebase', date: '2 days', importance: 1, isDone: false},
        {id: '123456', title: 'Kiss Chipi', date: 'today', importance: 0, isDone: true}
      ]
    }
  }

  renderTaskList = () => {
    let tasks = this.state.visibleTasks.concat(); // Array of tasks
    
    let taskComponents = tasks.map(item =>
        <Task
            key={item.id}
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
    
    let tasks = this.state.tasks.concat();
    let newTask = {
      title: this.state.title,
      date: this.state.date,
      importance: this.state.importance || 0,
      isDone: false
    }
    tasks.push(newTask);
    
    this.setState({
      tasks: tasks,
      visibleTasks: tasks
    })
  
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

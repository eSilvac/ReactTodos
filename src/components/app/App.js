import './App.css';
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

class App extends Component {
  constructor() {
    super();
    this.myChangeHandler = this.myChangeHandler.bind(this);
    
    this.state = {
      todoList: [],
      newTodo: {
        name: "",
        description: "",
        done: false
      }
    }
  }

  myChangeHandler(event) {
    let newTodo = {...this.state.newTodo};
    newTodo[event.target.name] = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    this.setState({newTodo: newTodo});
  }

  mySubmitHandler(event) {
    event.preventDefault()

    this.setState({
      todoList: this.state.todoList.concat(this.state.newTodo),
      newTodo: {
        name: "",
        description: "",
        done: false
      }
    });
  }

  editTodo(index) {
    const todos = this.state.todoList;

    this.setState({
      todoList: todos.map((task, i) => {
        if (i === index) {
          task.done = !task.done
        }
        return task
      })
    });
  }

  deleteTodo(index) {
    const todos = this.state.todoList;
    
    this.setState({
      todoList: todos.filter((task, i) => i !== index)
    });
  }

  render() {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={6}> 
            <h1 className="text-center mb-3">Todo List</h1>
            <div className="App">
              <Form onSubmit={this.mySubmitHandler.bind(this)}>
                <Form.Group >
                  <Form.Control name="name" onChange={this.myChangeHandler} type="text" placeholder="New Todo Tittle" value={this.state.newTodo.name} />
                </Form.Group>

                <Form.Group>
                  <Form.Control name="description" onChange={this.myChangeHandler} as="textarea" rows="3" placeholder="New todo description" value={this.state.newTodo.description} />
                </Form.Group>

                <Form.Group>
                  <Form.Check name="done" type="checkbox" onChange={this.myChangeHandler} checked={this.state.newTodo.done} label="Completed" />
                </Form.Group>

                <Button variant="success" type="submit">
                  Create
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col>
	    <Table bordered>
	      <thead>
		<tr>
		  <th>Name</th>
		  <th>Description</th>
		  <th></th>
		</tr>
	      </thead>
	      <tbody>
                {this.state.todoList.map((todo, index) =>
                  <tr key={index}>
                    <td>{todo.name}</td>
                    <td>{todo.description}</td>
                    <td className="text-center w-25"> 
                      {todo.done ? (
                        <Button variant="outline-success" onClick={() => this.editTodo(index)}>Complete</Button>
                      ) : (
                        <Button variant="outline-warning" onClick={() => this.editTodo(index)}>Uncomplete</Button>
                      )}
                      <Button variant="danger" className="ml-2" onClick={() => this.deleteTodo(index)}>Delete</Button>
                    </td>
                  </tr> 
                )}
	      </tbody>
	    </Table>  
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;

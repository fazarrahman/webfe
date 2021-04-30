import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions/actions.js'

import AddTodo from './AddTodo.js'
import TodoList from './TodoList.js'

class TodoView extends Component {
   render() {
      const { dispatch, visibleTodos } = this.props
      
      return (
         <div>
            <AddTodo onAddClick = {text =>dispatch(addTodo(text))} />
            <TodoList todos = {visibleTodos}/>
         </div>
      )
   }
}
function select(state) {
   return {
      visibleTodos: state.todos
   }
}
export default connect(select)(TodoView);
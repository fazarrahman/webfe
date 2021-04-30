import React from 'react';
import { getUser, removeUserSession } from '../utils/Common';
import TodoView from './TodoView';
 
function Dashboard(props) {
  const user = getUser();
 
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }
 
  return (
    <div>
      Welcome {user.username}!<br /><br />
      <TodoView></TodoView>
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}
 
export default Dashboard;
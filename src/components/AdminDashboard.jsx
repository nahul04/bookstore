
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Welcome Admin</h1>
      <ul>
        <li><Link to="/admin/books">Manage Books</Link></li>
        <li><Link to="/admin/orders">View Orders</Link></li>
      </ul>
    </div>
  );
}

export default AdminDashboard;

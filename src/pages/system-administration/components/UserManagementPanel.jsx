import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserManagementPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const [users] = useState([
    {
      id: 1,
      name: 'Dr. Ahmad Wijaya',
      email: 'ahmad.wijaya@university.ac.id',
      role: 'faculty',
      status: 'active',
      lastLogin: '2025-09-05T10:30:00Z',
      department: 'Computer Science',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Siti Nurhaliza',
      email: 'siti.nurhaliza@student.university.ac.id',
      role: 'student',
      status: 'active',
      lastLogin: '2025-09-05T09:15:00Z',
      department: 'Information Systems',
      joinDate: '2024-08-20'
    },
    {
      id: 3,
      name: 'Prof. Bambang Sutrisno',
      email: 'bambang.sutrisno@university.ac.id',
      role: 'admin',
      status: 'active',
      lastLogin: '2025-09-05T08:45:00Z',
      department: 'Administration',
      joinDate: '2020-03-10'
    },
    {
      id: 4,
      name: 'Rina Kartika',
      email: 'rina.kartika@student.university.ac.id',
      role: 'student',
      status: 'suspended',
      lastLogin: '2025-09-03T14:20:00Z',
      department: 'Mathematics',
      joinDate: '2024-09-01'
    },
    {
      id: 5,
      name: 'Dr. Indra Permana',
      email: 'indra.permana@university.ac.id',
      role: 'faculty',
      status: 'pending',
      lastLogin: null,
      department: 'Physics',
      joinDate: '2025-09-01'
    }
  ]);

  const roleStats = {
    total: users?.length,
    admin: users?.filter(u => u?.role === 'admin')?.length,
    faculty: users?.filter(u => u?.role === 'faculty')?.length,
    student: users?.filter(u => u?.role === 'student')?.length,
    active: users?.filter(u => u?.status === 'active')?.length,
    pending: users?.filter(u => u?.status === 'pending')?.length,
    suspended: users?.filter(u => u?.status === 'suspended')?.length
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = selectedRole === 'all' || user?.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev?.includes(userId) 
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers?.length === filteredUsers?.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers?.map(user => user?.id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'suspended': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-error bg-error/10';
      case 'faculty': return 'text-primary bg-primary/10';
      case 'student': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatLastLogin = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date?.toLocaleDateString('id-ID');
  };

  return (
    <div className="space-y-6">
      {/* User Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{roleStats?.total}</p>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-error">{roleStats?.admin}</p>
            <p className="text-sm text-muted-foreground">Admins</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{roleStats?.faculty}</p>
            <p className="text-sm text-muted-foreground">Faculty</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{roleStats?.student}</p>
            <p className="text-sm text-muted-foreground">Students</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{roleStats?.active}</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">{roleStats?.pending}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-error">{roleStats?.suspended}</p>
            <p className="text-sm text-muted-foreground">Suspended</p>
          </div>
        </div>
      </div>
      {/* Search and Filters */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search users by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="faculty">Faculty</option>
              <option value="student">Student</option>
            </select>
            
            <Button variant="outline" iconName="Download">
              Export
            </Button>
            
            <Button variant="default" iconName="UserPlus">
              Add User
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers?.length > 0 && (
          <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">
                {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" iconName="Mail">
                  Send Email
                </Button>
                <Button variant="outline" size="sm" iconName="UserX">
                  Suspend
                </Button>
                <Button variant="outline" size="sm" iconName="UserCheck">
                  Activate
                </Button>
                <Button variant="destructive" size="sm" iconName="Trash2">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Users Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="text-left p-4 text-sm font-medium text-foreground">User</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Role</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Department</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Last Login</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr key={user?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers?.includes(user?.id)}
                      onChange={() => handleUserSelect(user?.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-foreground">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
                      {user?.role?.charAt(0)?.toUpperCase() + user?.role?.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user?.status)}`}>
                      {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{user?.department}</td>
                  <td className="p-4 text-sm text-muted-foreground">{formatLastLogin(user?.lastLogin)}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="Edit">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                        More
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search criteria' : 'No users match the selected filters'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementPanel;
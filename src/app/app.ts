
import { Component } from '@angular/core';

type UserRole = 'مدیر سیستم' | 'کاربر عادی' | 'اپراتور';

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  image: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // Search and filter
  searchTerm: string = '';
  selectedRole: string = 'همه نقش‌ها';

  // Form
  showForm: boolean = false;
  editingUser: User | null = null;

  // Selected user
  selectedUser: User | null = null;

  // Users array
  users: User[] = [
    {
      id: 1,
      name: 'فاضل رجبی',
      email: 'fazelrajibi@gmail.com',
      role: 'مدیر سیستم',
      active: true,
      image: 'images/user-1.jpg'
    },
    {
      id: 2,
      name: 'الینا یزدانی',
      email: 'elina@gmail.com',
      role: 'کاربر عادی',
      active: true,
      image: 'images/user-2.jpg'
    },
    {
      id: 3,
      name: 'محمدرضا نجفی',
      email: 'mohammad@company.ir',
      role: 'اپراتور',
      active: false,
      image: 'images/user-3.jpg'
    },
    {
      id: 4,
      name: 'شیما امامی',
      email: 'shima@company.ir',
      role: 'کاربر عادی',
      active: true,
      image: 'images/user-4.jpg'
    }
  ];

  // Filter users
  get filteredUsers(): User[] {
    return this.users.filter(user => {

      const matchesSearch =
        user.name.includes(this.searchTerm) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesRole =
        this.selectedRole === 'همه نقش‌ها' ||
        user.role === this.selectedRole;

      return matchesSearch && matchesRole;
    });
  }

  // Statistics
  get activeUsersCount(): number {
    return this.users.filter(user => user.active).length;
  }

  get inactiveUsersCount(): number {
    return this.users.filter(user => !user.active).length;
  }

  // User avatar initials
  getInitials(name: string): string {
    return name.split(' ').map(part => part[0]).slice(0, 2).join('');
  }

  // Open add form
  openAddForm(): void {
    this.editingUser = null;
    this.showForm = true;
  }

  // Open edit form
  editUser(user: User): void {
    this.editingUser = user;
    this.showForm = true;
  }

  // Close form
  closeForm(): void {
    this.showForm = false;
    this.editingUser = null;
  }

  // Save new user or edited user
  saveUser(
    event: Event,
    name: string,
    email: string,
    role: string
  ): void {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      return;
    }

    const userRole = role as UserRole;

    if (this.editingUser) {

      const editingId = this.editingUser.id;

      const updatedUser: User = {
        id: editingId,
        name: name.trim(),
        email: email.trim(),
        role: userRole,
        active: this.editingUser.active,
        image: this.editingUser.image
      };

      this.users = this.users.map(user =>
        user.id === editingId ? updatedUser : user
      );

      if (this.selectedUser?.id === editingId) {
        this.selectedUser = updatedUser;
      }

    } else {

      const newUser: User = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        role: userRole,
        active: true,
        image: 'images/user-4.jpg'
      };

      this.users = [...this.users, newUser];
    }

    this.closeForm();
  }

  // Toggle active status
  toggleStatus(id: number): void {
    this.users = this.users.map(user =>
      user.id === id
        ? { ...user, active: !user.active }
        : user
    );

    if (this.selectedUser?.id === id) {
      this.selectedUser = this.users.find(user => user.id === id) ?? null;
    }
  }

  // Delete user
  deleteUser(id: number): void {
    const confirmed = window.confirm('آیا از حذف این کاربر مطمئن هستید؟');

    if (!confirmed) {
      return;
    }

    this.users = this.users.filter(user => user.id !== id);

    if (this.selectedUser?.id === id) {
      this.selectedUser = null;
    }
  }

  // Show user details
  viewUser(user: User): void {
    this.selectedUser = user;
  }

  closeDetails(): void {
    this.selectedUser = null;
  }

}

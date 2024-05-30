<template>
  <div>
    <HeaderPage />
    <section id="userAccount">
      <div class="wrapper">
        <div class="user-con">
          <div class="header-container">
            <h2>Manage Users</h2>
            <button @click="toggleAddUserModal" class="btn-primary">
              Add User
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Account Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.user_name }}</td>
                <td>{{ user.full_name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.address }}</td>
                <td>{{ user.account_type }}</td>
                <td>
                  <button @click="editUser(user)" class="btn-edit">Edit</button>
                  <button @click="deleteUser(user.id)" class="btn-delete">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <AddUser
        :visible="showAddUserModal"
        @update:visible="toggleAddUserModal"
        @addUser="addUser"
      />
    </section>
  </div>
</template>

<script>
import AddUser from "./modals/AddUser.vue";
import HeaderPage from "./partials/HeaderPage.vue";
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      showAddUserModal: false,
    };
  },
  components: {
    AddUser,
    HeaderPage,
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    toggleAddUserModal() {
      this.showAddUserModal = !this.showAddUserModal;
    },
    async addUser(newUser) {
      try {
        await axios.post("http://127.0.0.1:8000/api/users", newUser);
        this.fetchUsers();
      } catch (error) {
        console.error("Error adding user:", error);
      }
    },
    editUser(user) {
      console.log("Edit user:", user);
    },
    async deleteUser(userId) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${userId}`);
        this.fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
#userAccounts .wrapper {
  max-width: 1440px;
}
#userAccounts {
  padding: 100px 0;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  padding-top: 100px;
}
.modal {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}
.modal-content h2 {
  margin-bottom: 10px;
}
.modal-content form {
  display: grid;
  gap: 10px;
}
.modal-content label {
  font-weight: bold;
}
.modal-content button {
  margin-top: 10px;
}
.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-edit {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-delete {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  padding: 8px;
  border: 1px solid #ddd;
}

table th {
  background-color: #f0f0f0;
}
</style>

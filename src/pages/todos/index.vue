<template>
  <div>
    <h1>오늘의 할일</h1>
    <button class="btn btn-primary" @click="moveToCreatePage">일정추가</button>
    <input
      v-model="searchText"
      type="text"
      class="form-control"
      placeholder="검색어를 입력하세요"
      @keyup.enter="searchTodos"
    />
    <TodoBasicForm @add-todo="onSubmit" />
    <div style="color: red">{{ error }}</div>
    <div v-if="!todos.length">등록된 일정이 없습니다</div>
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <nav>
      <ul class="pagination justify-content-center">
        <li v-if="currentPage !== 1" class="page-item">
          <a class="page-link" @click="getTodos(currentPage - 1)">Previous</a>
        </li>
        <li
          v-for="btn in numberOfPages"
          class="page-item"
          :key="btn"
          :class="currentPage === btn ? 'active' : ''"
        >
          <a class="page-link" @click="getTodos(btn)">{{ btn }}</a>
        </li>
        <li v-if="currentPage !== numberOfPages" class="page-item">
          <a class="page-link" @click="getTodos(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
</template>

<script>
import { ref, computed, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import TodoList from "@/components/TodoList.vue";
import { useToast } from "@/composables/toast";
import Toast from "@/components/Toast";


export default {
  components: {
    TodoList,
    Toast,
  },
  setup() {
    let error = ref("");
    const router=useRouter();
    const toggle = ref(false);
    const searchText = ref("");
    const todos = ref([]);
    const totalTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const { showToast, toastMessage, toastAlertType, triggerToast, timeout } =
      useToast();
    //watch(()=>{return searchText.value},(current,prev)=>{console.log(current,prev)})
    // watchEffect(() => {
    //   console.log(a.c);
    // });
    watch(searchText, () => {
      time = setTimeout(() => {
        getTodos(1);
      }, 500);
    });
    const searchTodos = () => {
      clearTimeout(time);
      getTodos(1);
    };

    console.log(searchText.value);
    const numberOfPages = computed(() => {
      return Math.ceil(totalTodos.value / limit);
    });
    // const filteredTodos = computed(() => {
    //   if (searchText.value) {
    //     return todos.value.filter((todo) => {
    //       return todo.subject.includes(searchText.value);
    //     });
    //   }
    //   return todos.value;
    // });
    //객체는 주소를 참조하기 때문에
    const getTodos = (btn = currentPage.value) => {
      //page=currentPage.value
      currentPage.value = btn;
      axios
        .get(
          `http://localhost:8080/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${btn}&_limit=${limit}`
        )
        .then((res) => {
          totalTodos.value = res.headers["x-total-count"];
          todos.value = res.data;
          triggerToast("목록가져왔습니다", "info");
        })
        .catch((err) => {
          console.log(err);
          error.value = "일시적으로 오류가 발생했습니다 잠시후 이용해주세요";
          triggerToast("목록못가져왔습니다", "danger");
        });
    };
    getTodos();
    const onSubmit = (todo) => {
      error.value = "";
      axios
        .post("http://localhost:8080/todos", {
          subject: todo.subject,
          completed: todo.completed,
        })
        .then((res) => {
          todos.value.push(res.data.todos);
          getTodos();
        })
        .catch((err) => {
          console.log(err);
          error.value = "일시적으로 오류가 발생했습니다. 잠시후 이용해주세요";
        });
    };

    const deleteTodo = (index) => {
      error.value = "";
      const id = index;
      axios
        .delete("http://localhost:8080/todos/" + id)
        .then(() => {
          getTodos();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const toggleTodo = (index, checked) => {
      console.log("toggleTodo", checked, index);
      const id = index;
      axios
        .patch("http://localhost:8080/todos/" + id, { completed: checked })
        .then(() => {
          getTodos();
          //todos.value[index].completed=checked;
          //console.log("then",todos.value[id].completed)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const moveToCreatePage = () => {
      router.push({
        name:"TodoCreate",
      })
    }

    return {
      getTodos,
      currentPage,
      error,
      numberOfPages,
      //filteredTodos,
      searchText,
      onSubmit,
      todos,
      toggle,
      deleteTodo,
      toggleTodo,
      searchTodos,
      showToast,
      toastMessage,
      toastAlertType,
      timeout,
      triggerToast,
      moveToCreatePage
    };
  },
};
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
.pagination {
  display: flex;
}
.page-item {
  margin: 5px;
}
.page-link {
  background: pink;
  color: black;
}
</style>

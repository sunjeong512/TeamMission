/* 
  할 일 목록을 관리하고 렌더링하는 주요 컴포넌트입니다.
  상태 관리를 위해 `useState` 훅을 사용하여 할 일 목록과 입력값을 관리합니다.
  할 일 목록의 추가, 삭제, 완료 상태 변경 등의 기능을 구현하였습니다.
*/
import React, { useState } from "react";
import TodoItem from "@/components/TodoItem";
import styles from "@/styles/TodoList.module.css";

// TodoList 컴포넌트를 정의합니다.
const TodoList = () => {
  // 상태를 관리하는 useState 훅을 사용하여 할 일 목록과 입력값을 초기화합니다.
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteID, setDeleteID] = useState(0);

  // addTodo 함수는 입력값을 이용하여 새로운 할 일을 목록에 추가하는 함수입니다.
  const addTodo = () => {
    // 입력값이 비어있는 경우 함수를 종료합니다.
    if (input.trim() === "") return;
    // 기존 할 일 목록에 새로운 할 일을 추가하고, 입력값을 초기화합니다.
    // {
    //   id: 할일의 고유 id,
    //   text: 할일의 내용,
    //   completed: 완료 여부,
    // }
    // ...todos => {id: 1, text: "할일1", completed: false}, {id: 2, text: "할일2", completed: false}}, ..
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  // toggleTodo 함수는 체크박스를 눌러 할 일의 완료 상태를 변경하는 함수입니다.
  const toggleTodo = (id) => {
    // 할 일 목록에서 해당 id를 가진 할 일의 완료 상태를 반전시킵니다.
    setTodos(
      // todos.map((todo) =>
      //   todo.id === id ? { ...todo, completed: !todo.completed } : todo
      // )
      // ...todo => id: 1, text: "할일1", completed: false
      todos.map((todo) => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      })
    );
  };

  // deleteTodo 함수는 할 일을 목록에서 삭제하는 함수입니다.
  const deleteTodo = async (id) => {
    // 해당 id를 가진 할 일을 제외한 나머지 목록을 새로운 상태로 저장합니다.
    // setTodos(todos.filter((todo) => todo.id !== id));
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const deleteTry = (id) => {
    setDeleteModal(true);
    setDeleteID(id);
  }


  // 컴포넌트를 렌더링합니다.
  return (
    <div className={styles.container}>
      <h1 className="animate-bounce text-xl mb-4 font-bold underline underline-offset-4 decoration-wavy decoration-[#8b5cf6]">
        Todo List
      </h1>
      {/* 할 일을 입력받는 텍스트 필드입니다. */}
      <input
        type="text"
        // className={styles.itemInput}
        // -- itemInput CSS code --
        // input[type="text"].itemInput {
        //   width: 100%;
        //   padding: 5px;
        //   margin-bottom: 10px;
        // }
        className="w-full p-1 mb-4 border border-[#8b5cf6] rounded-2xl"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {/* 할 일을 추가하는 버튼입니다. */}
      <div class="grid">
        <button
          // className={styles.addButton}
          // -- addButton CSS code --
          // button.addButton {
          //   padding: 5px;
          //   background-color: #0070f3;
          //   color: white;
          //   border: 1px solid #0070f3;
          //   border-radius: 5px;
          //   cursor: pointer;
          // }
          //
          // button.addButton:hover {
          //   background-color: #fff;
          //   color: #0070f3;
          // }
          
          className="shadow-lg shadow-[#8b5cf6]/40 w-40 justify-self-end p-1 mb-10 bg-[#8b5cf6] text-white border border-[#8b5cf6] rounded-2xl hover:bg-white hover:text-[#8b5cf6]"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
    

      {/* 할 일 목록을 렌더링합니다. */}
      <ul>
        {todos.map((todo) => (
              <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => deleteTry(todo.id)}
              // onDelete={() => confirm("정말 삭제하시겠습니까?") && deleteTodo(todo.id)}
            />
        ))}
      </ul>
       
      {deleteModal && (
              <div className="fixed inset-0 w-full bg-opacity-100 border-10 flex flex-col justify-center items-center">
                <div className="shadow-md shadow-[#5b21b6]/20 bg-white border-solid border-2 border-[#8b5cf6] w-96 h-40 flex flex-col justify-center items-center rounded-3xl ">
                  <h2 className="mt-2 mb-6 text-xl font-semibold">정말 삭제하시겠습니까?</h2>
                    <div className="flex">
                      <button className="mr-5 w-32 justify-self-end p-2 mt-1 mb-3 bg-[#8b5cf6] text-white border border-[#8b5cf6] rounded-2xl hover:bg-white hover:text-[#8b5cf6]"
                        onClick={() => {
                          deleteTodo(deleteID);
                          setDeleteModal(false);
                        }}
                      >삭제</button>
                      <button className="w-32 justify-self-end p-1 mt-1 mb-3 bg-[#8b5cf6] text-white border border-[#8b5cf6] rounded-2xl hover:bg-white hover:text-[#8b5cf6]"
                        onClick={() => setDeleteModal(false)}
                      >취소</button>
                    </div>
                </div>
              </div>
            )}
    </div>
  );
};



export default TodoList;


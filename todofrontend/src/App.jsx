import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/Signup",
      element: <Signup />,
    },
    {
      path: "/home",
      element: <Description />,
    },
  ]);
  return (
    <div className=" ">
      <RouterProvider router={router} />
    </div>
  );
}

function Signup() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  return (
    <center>
      <div className="border-2 border-black rounded-md  p-2 m-6   justify-center  w-1/2 place-content-center  bg-red-200">
        <h3>SignUp</h3>

        <div className="border-2 border-black rounded-md  p-2  justify-center w-1/2 ">
          <input
            className="p-2 m-2 border-2 border-black rounded-md"
            type="username"
            placeholder="enter your full name"
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          <br />
          <input
            className="p-2 m-2 border-2 border-black rounded-md"
            type="text"
            placeholder="enter your email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <br />
          <input
            className="p-2 m-2 border-2 border-black rounded-md"
            type="text"
            placeholder="enter your password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button
            className="p-2 m-2 border-2 border-black rounded-md"
            onClick={() => {
              let data = {
                username: username,
                email: email,
                password: password,
              };
              axios
                .post("https://multi-user-todo-backend.vercel.app/signup", data)
                .then((res) => {
                  console.log(res);
                  if (res.status == 200) {
                    navigate("/home", { state: username });
                  }
                });
            }}
          >
            {" "}
            Signup
          </button>
          <h2 class="mt-10 text-center text-2xl font-bold leading-2 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
      </div>
    </center>
  );
}

function Login() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  return (
    <center>
      <div className="border-2 border-black rounded-md  p-2 m-6   justify-center  w-1/2 place-content-center  bg-red-200 ">
        <h3>Login</h3>
        <div className=" border-2 border-black rounded-md  p-2  justify-center w-1/2 ">
          <input
            className="p-2 m-2 border-2 border-black rounded-md"
            type="text"
            placeholder="enter your username "
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            className="p-2 m-2 border-2 border-black rounded-md"
            type="text"
            placeholder="enter your password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />{" "}
        </div>
        <div>
          <button
            className="p-2 m-2 border-2 border-black rounded-md"
            onClick={() => {
              let data = { password, username: username };
              axios
                .post("https://multi-user-todo-backend.vercel.app/login", data)
                .then((res) => {
                  console.log(res);
                  if (res.status == 200) {
                    navigate("/home", { state: username });
                  }
                });
            }}
          >
            Login
          </button>
          <button
            className="p-2 m-2 border-2 border-black rounded-md"
            onClick={() => {
              navigate("/Signup");
            }}
          >
            Signup
          </button>
        </div>
      </div>
    </center>
  );
}

function Description() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const [todod, setDescription] = useState("");
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://multi-user-todo-backend.vercel.app/display",
          {
            username: data,
          }
        );
        setTodoList(response.data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchData();
  }, [data]);

  return (
    <div className="  text-center justify-center border-2 border-black rounded-md m-4 p-2 ">
      <div className="border-2 border-black rounded-md m-4 p-2  text-xl">
        {" "}
        WELCOME! {data}
      </div>
      <div>
        <input
          className="border m-2 border-black p-2 "
          type="text "
          placeholder="todo"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <input
          className="border m-2 border-black p-2 "
          type="text"
          placeholder="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button
          className="border m-2 border-black p-2  bg-slate-400"
          onClick={handleclick}
        >
          add
        </button>
      </div>
      {todoList.map((content, key) => {
        return (
          <div
            className="border-2 border-black rounded-md m-4 p-2  grid grid-flow-col"
            key={key}
          >
            <div>
              {" "}
              {content.todo}
              <br />
              {content.description}
            </div>
            <button
              onClick={() => {
                handledelete(content._id);
              }}
            >
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
  function handleclick() {
    axios
      .post("https://multi-user-todo-backend.vercel.app/add", {
        todo: todo,
        description: todod,
        username: data,
      })
      .then(() => {
        window.location.reload();
      });
  }

  function handledelete(_id) {
    axios
      .post("https://multi-user-todo-backend.vercel.app/delete", {
        id: _id,
        username: data,
      })
      .then(() => {
        window.location.reload();
      });
  }
}

export default App;

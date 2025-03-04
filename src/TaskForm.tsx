import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

// הגדרת מבנה המשימה
interface Task {
  taskName: string;  // שם המשימה
  description: string;  // תיאור המשימה
  completed: boolean;  // אם המשימה הושלמה או לא
}

const TaskForm: React.FC = () => {
  // ניהול המידע של המשימה החדשה
  const [taskData, setTaskData] = useState({
    taskName: "",
    description: "",
  });

  // ניהול המשימות שמאוחסנות במערכת
  const [tasks, setTasks] = useState<Task[]>([]);
  // ניהול המצב של המיון (לפי כל המשימות, הושלמו או לא הושלמו)
  const [filter, setFilter] = useState("all");

  // ✅ טעינת המשימות מה-localStorage בתחילת הקוד
  useEffect(() => {
    // בודק אם יש נתונים שמורים ב-localStorage
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      // אם כן, טוען את המשימות לשימוש
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // שמירה ל-localStorage כאשר המשימות משתנות
  useEffect(() => {
    // כאשר המשימות משתנות, שומר את העדכונים ב-localStorage
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // פונקציה לעדכון שדות הטופס (שם המשימה ותיאור המשימה)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [id]: value,  // מעדכן את המידע המתאים (taskName או description)
    }));
  };

  // פונקציה לשליחת הטופס (שמירה של משימה חדשה)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();  // מונע את הרענון אוטומטי של הדף
    // אם לא נכתב שם משימה או תיאור, לא שולחים את הטופס
    if (taskData.taskName.trim() === "" || taskData.description.trim() === "") return;

    // יצירת משימה חדשה והוספתה למערך המשימות
    const newTasks = [...tasks, { ...taskData, completed: false }];
    setTasks(newTasks);  // מעדכן את המצב של המשימות
    setTaskData({ taskName: "", description: "" });  // מאפס את השדות בטופס
  };

  // פונקציה לעדכון מצב המשימה (לסמן אותה כהושלמה או למחוק אותה)
  const handleTaskAction = (index: number) => {
    setTasks((prevTasks) => {
      // עדכון המצב של המשימה (אם הושלמה, מוחקים אותה, אחרת מסמנים כהושלמה)
      const updatedTasks = prevTasks.map((task, i) => {
        if (i === index) {
          // אם המשימה הושלמה, מוחקים אותה, אחרת מסמנים אותה כהושלמה
          return task.completed ? null : { ...task, completed: true };
        }
        return task;
      }).filter((task): task is Task => task !== null);  // מסנן את המשימות הלא תקינות

      // שומר את המשימות המעודכנות ב-localStorage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  // סינון המשימות לפי המסנן שנבחר
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;  // רק משימות שהושלמו
    if (filter === "notCompleted") return !task.completed;  // רק משימות שלא הושלמו
    return true;  // כל המשימות
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        textAlign: "center",
      }}
    >
      <h2 className="mb-3">Add New Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Task Name: </Form.Label>
          <Form.Control type="text" id="taskName" value={taskData.taskName} onChange={handleChange} required />
        </Form.Group>
        <br />
        <Form.Group className="mb-3">
          <Form.Label>Description: </Form.Label>
          <Form.Control as="textarea" rows={3} id="description" value={taskData.description} onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Task
        </Button>
      </Form>

      {/* תפריט מיון */}
      <div style={{ marginTop: "20px" }}>
        <strong>Sort by :</strong>
        <Button variant={filter === "all" ? "dark" : "outline-dark"} onClick={() => setFilter("all")} size="sm" style={{ margin: "5px" }}>
          all tasks
        </Button>
        <Button variant={filter === "completed" ? "dark" : "outline-dark"} onClick={() => setFilter("completed")} size="sm" style={{ margin: "5px" }}>
          Completed tasks
        </Button>
        <Button variant={filter === "notCompleted" ? "dark" : "outline-dark"} onClick={() => setFilter("notCompleted")} size="sm" style={{ margin: "5px" }}>
          Uncompleted tasks
        </Button>
      </div>

      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {filteredTasks.map((task, index) => (
          <div
            key={index}
            style={{
              border: "2px solid black",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "left",
              boxSizing: "border-box",
              backgroundColor: task.completed ? "#d4edda" : "transparent",
              transition: "background-color 0.3s",
            }}
          >
            <strong>Task Name:</strong> {task.taskName} <br />
            <strong>Description:</strong> {task.description} <br />

            <Button
              variant={task.completed ? "danger" : "outline-success"}
              onClick={() => handleTaskAction(index)}
              size="sm"
              style={{ marginTop: "10px" }}
            >
              {task.completed ? "delete" : "Completed"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskForm;

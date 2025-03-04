import QuoteBox from "./QuoteBox";
import TaskForm from "./TaskForm";

const App: React.FC = () => {
  return (
    <div>
      <QuoteBox /> {/* ✅ מציג את הציטוט בראש הדף */}
      <TaskForm /> {/* ✅ טופס המשימות מתחת לציטוט */}
    </div>
  );
};

export default App;

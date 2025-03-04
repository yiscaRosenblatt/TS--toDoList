import { useState, useEffect } from "react";

const QuoteBox: React.FC = () => {
  // משתנה שמאחסן את הציטוט הנוכחי
  const [quote, setQuote] = useState("");

  // שימוש ב-useEffect כדי לטעון ציטוט אקראי פעם אחת אחרי שהקומפוננטה נטענת
  useEffect(() => {
    // שולח בקשה ל-API לקבלת ציטוט אקראי
    fetch("https://qapi.vercel.app/api/random")
      .then((res) => res.json())  // ממיר את התגובה ל-JSON
      .then((data) => {
        // אם התקבל ציטוט, מעדכן את ה-state עם הציטוט
        setQuote(data.quote || "no quote");  // אם אין ציטוט, מציב "no quote"
      })
      .catch(() => {
        // אם יש שגיאה בעת הטעינה (כמו חיבור אינטרנט לא פעיל), מציב "error"
        setQuote("error");
      });
  }, []);  // [] מציין כי הפונקציה תרוץ פעם אחת אחרי טעינת הקומפוננטה

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",  // מתחיל מהחלק העליון
      alignItems: "center",          // ממקם במרכז אופקית
      height: "100vh",               // גובה מלא של המסך
      textAlign: "center",
      padding: "10px",
      marginBottom: "20px",
      fontStyle: "italic",
      borderBottom: "1px solid gray"
    }}>
      <p>"{quote}"</p>
    </div>
  );
  };
  
export default QuoteBox;

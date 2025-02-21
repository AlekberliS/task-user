
import { ThemeProvider } from "./components/ThemeContext";
import UserManagement from "./components/UserManagment";

function App() {
  return (
    <ThemeProvider>
      <UserManagement />
    </ThemeProvider>
  );
}

export default App;

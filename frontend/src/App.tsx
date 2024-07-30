import Appointment from "./pages/Appointment/Appointment";
import { getToken } from "./queries";

function App() {
  getToken();
  return (
    <>
      <Appointment />
    </>
  );
}

export default App;

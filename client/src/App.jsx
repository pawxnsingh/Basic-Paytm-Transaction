import { RecoilRoot } from "recoil";
import { Dashboard, Signin, Signup, SendMoney } from "./pages/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/send" element={<SendMoney />} />
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    );
};

export default App;

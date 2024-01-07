import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Registration from './Registration/Registration';
import Account from './Account/Account';
import AskPage from './AskPage/AskPage';
import UserQuestions from './UserQuestions/UserQuestions';
import UserQuestionDetails from './UserQuestionDetails/UserQuestionDetails';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Registration />} />
        <Route path="/account" element={<Account />} />
        <Route path="/ask/:categoryId?" element={<AskPage />} />
        <Route path="/user/questions" element={<UserQuestions />} />
        <Route
          path="/user/questions/:userQuestionId"
          element={<UserQuestionDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
};

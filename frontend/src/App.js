import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectPage } from './components/projects/ProjectPage';
import { HomePage } from './components/home/HomePage';
import Header from './components/core/Header';
import { Detail } from './components/detail/Detail';
import Footer from './components/core/Footer';
import ViewerPage from './components/viewer/ViewerPage';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { ProfileUser } from './pages/profile/ProfileUser';
import { ProfileProfessional } from './pages/professionalProfile/ProfileProfessional';
import { AddProject } from './components/addForm/AddProject';
import { EditProject } from './components/editForm/EditProject';
import { MyProjects } from './components/myProjects/MyProjects';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/addForm" element={<AddProject />} />
            <Route path="/editForm" element={<EditProject />} />
            <Route path="/myProjects" element={<MyProjects />} />
            <Route path="projects" element={<ProjectPage />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/viewer" element={<ViewerPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfileUser />} />
            <Route
              path="/professionalProfile/:id"
              element={<ProfileProfessional />}
            />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

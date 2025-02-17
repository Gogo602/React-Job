import React from 'react'
import {
  Route, createBrowserRouter,
  createRoutesFromElements, RouterProvider
} from 'react-router-dom'
import HomePage from './Pages/HomePage';
import MainLayout from './Layout/MainLayout';
import JobsPage from './Pages/JobsPage';
import NotFoundPage from './Pages/NotFoundPage';
import JobPage, {jobLoader} from './Pages/JobPage';
import AddJobPage from './Pages/AddJobPage';
import EditJobPage from './Pages/EditJobPage';


//posting data to the api/server json
const addJob =  async (newJob) => {
  const res = await fetch('/api/jobs', {
    method: 'Post',
    headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify(newJob)
  });
  return;
};

//delete job
const deleteJob = async (id) => {
   const res = await fetch(`/api/jobs/${id}`, {
    method: 'DELETE'
  });
  return;
}

//update job

const updateJob = async (job) => {
  const res = await fetch(`/api/jobs/${job.id}`, {
    method: 'PUT',
    headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify(job)
  });
  return;
};


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />} >
        <Route index element={<HomePage/>} />
        <Route path='/jobs' element={<JobsPage/>} />
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob}/>} />
        <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />
        <Route path='*' element={<NotFoundPage/>} />
       </Route> 
    )
  );
  return <RouterProvider router={router}/>;
};

export default App
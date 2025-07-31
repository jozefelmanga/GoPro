import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import "../../App.css";
import List from "./project/List";
import axios from "axios";
import Tasks from "./project/Tasks";
import Staff from "./project/Staff";
import Swal from "sweetalert2";
import AddTask from "./project/AddTask";
import ConsultTask from "./project/ConsultTask";
import AddProject from "./project/AddProject";
import ConsultProject from "./project/ConsultProject";

function Projects(props,ref) {
  const [content, setContent] = useState(1);
  const [projectId, setProjectId] = useState();
  const [taskToConsult, setTaskToConsult] = useState();

  const childRef=useRef();

  useImperativeHandle(ref, () => ({
    changeProject(page,id) {
      setContent(page);
      setProjectId(id)
    },
    changeTask(page,id,id_projet) {
      setContent(page);
      setTaskToConsult(id)
      setProjectId(id_projet)
    }
  }));

  return (
    <div>
      <div class="component" id="projects">
        <div class="head-title">
          <div class="left">
            <h1>projects</h1>
            <ul class="breadcrumb">
              <li
                onClick={() => {
                  setContent(1);
                }}
              >
                <a href="#" className={content === 1 ? "active" : ""}>
                  projects
                </a>
              </li>
              {(content === 2 || content === 3 || content === 4 || content === 5 || content === 6 || content === 7) && (
                <li>
                  <i class="bx bx-chevron-right"></i>
                </li>
              )}
              {(content === 2 || content === 3|| content === 4 || content === 5 ) && (
                <li
                  onClick={() => {
                    setContent(2);
                  }}
                >
                  <a className={content === 2 ? "active" : ""} href="#">
                    project details
                  </a>
                </li>
              )}
              {(content === 3|| content === 4 || content === 5 ) && (
                <li>
                  <i class="bx bx-chevron-right"></i>
                </li>
              )}
              {content === 3 && (
                <li>
                  <a class="active" href="#">
                    Staff
                  </a>
                </li>
              )}
               {content === 4 && (
                <li>
                  <a class="active" href="#">
                  create a new Task
                  </a>
                </li>
              )}
              {content === 5 && (
                <li>
                  <a class="active" href="#">
                  Task details
                  </a>
                </li>
              )}
              {content === 6 && (
                <li>
                  <a class="active" href="#">
                  Add new project
                  </a>
                </li>
              )}
              {content === 7 && (
                <li>
                  <a class="active" href="#">
                  edit project
                  </a>
                </li>
              )}
              
            </ul>
          </div>
          {content === 2 && (
            <div class="right">
              <a
                href="#"
                class="btn-download"
                onClick={() => {
                  setContent(3);
                }}
              >
                <i class="bx bx-support"></i>
                <span class="text">staff</span>
              </a>
              <a href="#" class="btn-download"  onClick={() => {
                  setContent(4);
                }}>
                <i class="bx bx-plus-circle"></i>
                <span class="text">new task</span>
              </a>
            </div>
          )}
          {content === 1 && (
            <div class="right">
              <a href="#" class="btn-download" onClick={() => {
                  setContent(6);
                }}>
                <i class="bx bx-plus-circle"></i>
                <span class="text">new project</span>
              </a>
            </div>
          )}
          {content === 3 && (
            <div class="right">
              <a href="#" class="btn-download" onClick={()=>childRef.current.chooseUser()}>
                <i class="bx bx-plus-circle"></i>
                <span class="text">add user</span>
              </a>
            </div>
          )}
        </div>
        {content === 1 && (
          <List setContent={setContent} setProjectId={setProjectId} />
        )}
        {content === 2 && (
          <Tasks setContent={setContent} key={projectId} projectId={projectId} setTaskToConsult={setTaskToConsult}/>
        )}
        {content === 3 && (
          <Staff setContent={setContent} projectId={projectId} ref={childRef} />
        )}
        {content === 4 && (
          <AddTask setContent={setContent} projectId={projectId} />
        )}
        {content === 5 && (
          <ConsultTask setContent={setContent} key={taskToConsult} taskToConsult={taskToConsult} />
        )}
        {content === 6 && (
          <AddProject setContent={setContent} />
        )}
        {content === 7 && (
          <ConsultProject setContent={setContent} projectId={projectId} />
        )}
      </div>
    </div>
  );
}

export default forwardRef(Projects);

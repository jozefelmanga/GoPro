import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import "../../App.css";
import List from "./List";
import axios from "axios";
import Tasks from "./Tasks";
import ConsultTask from "./ConsultTask";
import Staff from "./Staff";
import ConsultProject from "./ConsultProject";

function Projects(props,ref) {
  const [projectId, setProjectId] = useState();
  const [taskToConsult, setTaskToConsult] = useState();

  const childRef=useRef();

  useImperativeHandle(ref, () => ({
    changeProject(page,id) {
      props.setitem(page);
      setProjectId(id)
    },
    changeTask(page,id,id_projet) {
      props.setitem(page);
      setTaskToConsult(id)
      setProjectId(id_projet)
    }
  }));

  return (
    <div>
      <div class="component" id="projects">
        <div class="head-title">
          <div class="left">
            <h1>my space</h1>
            <ul class="breadcrumb">
              <li
                onClick={() => {
                  props.setitem(2);
                }}
              >
                <a href="#" className={props.item === 1 ? "active" : ""}>
                  projects
                </a>
              </li>
              {(props.item === 3 || props.item === 4 || props.item === 5 || props.item === 6 || props.item === 7) && (
                <li>
                  <i class="bx bx-chevron-right"></i>
                </li>
              )}
              {(props.item === 3 || props.item === 4|| props.item === 5  ) && (
                <li
                  onClick={() => {
                    props.setitem(3);
                  }}
                >
                  <a className={props.item === 3 ? "active" : ""} href="#">
                    project details
                  </a>
                </li>
              )}
              {( props.item === 4 || props.item === 5 ) && (
                <li>
                  <i class="bx bx-chevron-right"></i>
                </li>
              )}
              {props.item === 5 && (
                <li>
                  <a class="active" href="#">
                    Staff
                  </a>
                </li>
              )}
               {props.item === 4 && (
                <li>
                  <a class="active" href="#">
                  task details
                  </a>
                </li>
              )}
              {props.item === 6 && (
                <li>
                  <a class="active" href="#">
                  project consultation
                  </a>
                </li>
              )}
              {props.item === 7 && (
                <li>
                  <a class="active" href="#">
                  edit project
                  </a>
                </li>
              )}
              
            </ul>
          </div>
          {props.item === 3 && (
            <div class="right">
              <a
                href="#"
                class="btn-download"
                onClick={() => {
                  props.setitem(5);
                }}
              >
                <i class="bx bx-support"></i>
                <span class="text">staff</span>
              </a>
            </div>
          )}
        </div>
        {props.item === 2 && (
          <List setContent={props.setitem} setProjectId={setProjectId} userId={props.userId}/>
        )}
        {props.item  === 3 && (
          <Tasks setContent={props.setitem} key={projectId} projectId={projectId} setTaskToConsult={setTaskToConsult} userId={props.userId}/>
        )}
        {props.item  === 4 && (
          <ConsultTask setContent={props.setitem} key={taskToConsult} taskToConsult={taskToConsult} />
        )} 
         {props.item === 5 && (
          <Staff setContent={props.setitem} projectId={projectId} ref={childRef} />
        )}
        {props.item === 6 && (
          <ConsultProject setContent={props.setitem} projectId={projectId} />
        )}
      </div>
    </div>
  );
}

export default forwardRef(Projects);

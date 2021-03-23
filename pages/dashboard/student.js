
import React, {useState, useEffect} from 'react';
import { Button, Table } from 'antd';
import axios from 'axios';

//1. when click on StudentList on dashboard sidebar, display this page; 
//2. 'Add' button, alert form; 


export default function studentList () {
    const fetchData = () => {
        axios
        .get('https://cms.chtoma.com/swagger/#/Students/StudentsController_update',{
          
        }) 
        .then((res) =>{
          const data = JSON.parse(JSON.stringify(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        })
    };
    
    useEffect (() => {fetchData();});
    const numData = []; 


    const columns = [
    {
        title: 'No.', 
        dataIndex: 'number', 
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Area',
        dataIndex: 'area',
        filters: [
            {
            text: 'China',
            value: 'China',
            },
            {
            text: 'New Zealand',
            value: 'New Zealand',
            },
            {
            text: 'Canada',
            value: 'Canada',
            },
            {
            text: 'Australia',
            value: 'Australia',
            },
        ],
        onFilter: (value, record) => record.area.indexOf(value) === 0,
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Selected Curriculum',
        dataIndex: 'selectedCurriculum',
    },
    {
        title: 'Student Type',
        dataIndex: 'studentType',
        filters: [
            {
            text: 'Developer',
            value: 'Developer',
            },
            {
            text: 'Tester',
            value: 'Tester',
            },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.studentType.indexOf(value) === 0,
    },
    {
        title: 'Join Time',
        dataIndex: 'joinTime',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
    ];

    const data = [
    {
        key: '1',
        number: '1', 
        name: 'John Brown',
        area: 'Canada',
        email: '322@qq.com',
        selectedCurriculum: 'AI',
        studentType: 'FT',
        joinTime: 'Feb-2020',
        action: '',
    },
    {
        key: '2',
        number: '2',
        name: 'Jake Oliver',
        area: 'New Zealand',
        email: 'bala@QqCircleFilled.com',
        selectedCurriculum: 'Data Science',
        studentType: 'FT',
        joinTime: 'Jan-2020',
        action: '',
    },
    {
        key: '3',
        number: '3',
        name: 'Samantha Brown',
        area: 'Australia',
        email: "saturn@space.com",
        selectedCurriculum: 'Testing',
        studentType: 'Tester',
        joinTime: 'June-2019',
        action: '',
    },
    {
        key: '4',
        number: '4',
        name: 'Matt Brice',
        area: 'China',
        email: 'mercury@space.com',
        selectedCurriculum: 'React',
        studentType: 'Developer',
        joinTime: 'Mar-2020',
        action: '',
    },
    {
        key: '5',
        number: '5',
        name: 'James Brice',
        area: 'London',
        email: 'avatar@qq.com',
        selectedCurriculum: 'system testing',
        studentType: 'Tester',
        joinTime: 'Feb-2020',
        action: '',
    },
    {
        key: '6',
        number: '6',
        name: 'Charlie Meghan',
        area: 'Central Park',
        email: 'katara@avatar.com',
        selectedCurriculum: 'Java',
        studentType: 'Developer',
        joinTime: 'Nov-2019',
        action: '',
    },
    ];

    return <Table columns={columns} dataSource={data} />;
}

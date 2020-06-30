import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '../components/LandingPage'
import Home from '../components/dashboard/Home'
import Dashboard from '../components/dashboard/Dashboard'
import AddEmployee from '../components/employee/AddEmployee'
import ListEmployeeDetails from '../components/employee/ListEmployeeDetails'
import UpdateEmployeeInformation from '../components/employee/UpdateEmployeeInformation'
import EmployeeSalary from '../components/employee/EmployeeSalary'
import Register from '../components/register/Register'
import GeneratePayroll from '../components/generatePayroll/GeneratePayroll'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      }, {
        path: '/addEmployee',
        name: 'addEmployee',
        component: AddEmployee
      }, {
        path: '/listEmployeeDetails',
        name: 'listEmployeeDetails',
        component: ListEmployeeDetails
      }, {
        path: '/updateEmployeeInformation/:id',
        component: UpdateEmployeeInformation
      }, {
        path: '/employeeSalary/:id',
        name: 'employeeSalary',
        component: EmployeeSalary
      }, {
        path: '/generatePayroll',
        name: 'generatePayroll',
        component: GeneratePayroll
      }]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

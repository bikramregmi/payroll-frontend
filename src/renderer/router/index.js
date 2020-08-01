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
import Attendance from '../components/employee/Attendance'
import Profile from '../components/company/Profile'
import WelcomePage from '../components/accounting/WelcomePage'
import MainDashboard from '../components/mainDashboard/MainDashboard'
import ADashboard from '../components/accounting/Dashboard'
import AddCompany from '../components/accounting/company/AddCompany'
import ListCompany from '../components/accounting/company/ListCompany'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: '/maindashboard',
      name: 'maindashboard',
      component: MainDashboard
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
        path: '/attendance',
        name: 'attendance',
        component: Attendance
      }, {
        path: '/profile',
        name: 'profile',
        component: Profile
      }, {
        path: '/generatePayroll',
        name: 'generatePayroll',
        component: GeneratePayroll
      }]
    },
    {
      path: '/accounting',
      name: 'accounting',
      component: WelcomePage,
      children: [{
        path: '/ADashboard',
        name: 'ADashboard',
        component: ADashboard
      }, {
        path: '/addCompany',
        name: 'addCompany',
        component: AddCompany
      }, {
        path: '/listCompany',
        name: 'listCompany',
        component: ListCompany
      }]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

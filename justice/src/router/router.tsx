import MainPage from '../components/MainPage/MainPage'
import LoginPage from "../components/LoginPage/LoginPage";
import RegisterPage from "../components/RegisterPage/RegisterPage";
import ExchangeRatesPage from "../components/ExchangeRatesPage/ExchangeRatesPage";


export const privateRoutes = [
    {path: '/', element: <MainPage/>},
    {path: '/login-page', element: <LoginPage/>},
    {path: '/register-page', element: <RegisterPage/>},
    {path: '/exchange-rates-page', element: <ExchangeRatesPage/>},
    // {path: '/profile-page', element: <Profile/>, exact: true},
    // {path: '/currency-exchange', element: <CurrencyExchange/>, exact: true},
    // {path: '/purse-page', element: <PursePage/>, exact: true},
    // {path: '/transactions-page', element: <TransactionsPage/>, exact: true},
    // {path: '/purse-info-page', element: <PurseInfo/>, exact: true}
]

export const publicRoutes = [
    {path: '/', element: <MainPage/>},
    {path: '/login-page', element: <LoginPage/>},
    {path: '/register-page', element: <RegisterPage/>},
    {path: '/exchange-rates-page', element: <ExchangeRatesPage/>},

]
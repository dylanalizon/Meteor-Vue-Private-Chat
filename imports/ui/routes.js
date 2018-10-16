import HomePage from './Pages/HomePageComponent'
import NotFoundPage from './Pages/NotFoundPageComponent'
import ChatPage from './Pages/ChatPageComponent'
import TodoListPage from './Pages/TodoListPageComponent'

const titleDefault = 'Application Meteor par Dylan ALIZON'

const routes = [
    {
        path: '/',
        name: 'homepage',
        component: HomePage,
        meta: {title: titleDefault}
    },
    {
        path: '/chat',
        name: 'chat',
        component: ChatPage,
        meta: {title: 'Chat - '+titleDefault, auth: true, key: 0},
        children: [
            {
                path: '/chat/:username',
                name: 'conversation',
                component: ChatPage,
                meta: {title: 'Chat - '+titleDefault, noUpdateTitle: true, auth: true, key: 1}
            }
        ]
    },
    {
        path: '/todo-list',
        name: 'todolist',
        component: TodoListPage,
        meta: {title: 'Todo List - '+titleDefault}
    },
    {
        path: '*',
        component: NotFoundPage,
        meta: {title: 'Erreur 404 - '+titleDefault}
    }
]

export default routes
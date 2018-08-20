import HomePage from './imports/ui/HomePageComponent'
import NotFoundPage from './imports/ui/NotFoundPageComponent'
import ChatPage from './imports/ui/ChatPageComponent'
import TodoListPage from './imports/ui/TodoListPageComponent'

const titleDefault = 'Application Meteor par Dylan ALIZON'

const routes = [
    {
        path: '/',
        component: HomePage,
        meta: {title: titleDefault}
    },
    {
        path: '/chat',
        component: ChatPage,
        meta: {title: 'Chat - '+titleDefault}
    },
    {
        path: '/todo-list',
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
import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const Conference = lazy(()=>import('../pages/Conference'))
const Updateconf = lazy(()=>import('../pages/Form/Updateconf'))

const coreRoutes = [
  {
    path: '/calendar',
    title: 'تاريخ الفعاليات',
    component: Calendar,
  },
  {
    path: '/update/:id',
    title: 'تعديل المؤتمر',
    component: Updateconf,
  },
  {
    path:'/conference',
    title:'المؤتمرات',
    component:Conference,
  },
  {
    path: '/profile',
    title: 'صفحة المستخدم',
    component: Profile,
  },

  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'الجداول',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'الرسومات',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;

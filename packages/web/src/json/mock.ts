import { PieChartOutlined, AppstoreOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'

const router = [
  {
    key: '1',
    icon: () => h(AppstoreOutlined),
    label: '首页',
    title: '首页',
    children: [
      {
        key: '1-1',
        label: '主页',
        title: '主页',
        path: '/home',
        name: 'home',
        component: 'home'
      }
    ]
  },
  {
    key: '2',
    icon: () => h(PieChartOutlined),
    label: '组件',
    title: '组件',
    children: [
      {
        key: '2-1',
        label: '组件',
        title: '组件',
        children: [
          {
            key: '2-1-1',
            label: '组件',
            title: '组件',
            path: '/component',
            name: 'component',
            component: 'component'
          }
        ]
        // path: '/component',
        // name: 'component',
        // component: 'component'
      }
    ]
  },
  {
    key: '3',
    icon: () => h(InfoCircleOutlined),
    label: '关于',
    title: '关于',
    path: '/about',
    name: 'about',
    component: 'about'
  }
]

export default { router }

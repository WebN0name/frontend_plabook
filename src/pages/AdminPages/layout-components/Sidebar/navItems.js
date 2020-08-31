import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import GradeTwoTone from '@material-ui/icons/GradeTwoTone';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

var iconsMap = {
  BarChartIcon: BarChartIcon,
  CalendarTodayIcon: CalendarTodayIcon,
  ChatIcon: ChatIcon,
  CodeIcon: CodeIcon,
  DashboardIcon: DashboardIcon,
  ErrorIcon: ErrorIcon,
  FolderIcon: FolderIcon,
  DashboardTwoToneIcon: DashboardTwoToneIcon,
  GradeTwoTone: GradeTwoTone,
  ListAltIcon: ListAltIcon,
  LockOpenIcon: LockOpenIcon,
  MailIcon: MailIcon,
  PresentToAllIcon: PresentToAllIcon,
  PeopleIcon: PeopleIcon,
  PersonIcon: PersonIcon,
  ReceiptIcon: ReceiptIcon,
  SettingsIcon: SettingsIcon,
  ViewModuleIcon: ViewModuleIcon
};

export default [
  {
    label: 'Navigation menu',
    content: JSON.parse(
      `[
  {
    "label": "Dashboard",
    "icon": "DashboardTwoToneIcon",
    "content": [
      {
        "label": "Default",
        "description": "This is a dashboard page example built using this template.",
        "to": "/DashboardDefault"
      },
      {
        "label": "Analytics",
        "description": "This is an example dashboard created using build-in elements and components.",
        "to": "/DashboardAnalytics"
      },
      {
        "label": "Sales Management",
        "description": "Example of a Dashboard page built with this UI framework.",
        "to": "/DashboardSales"
      },
      {
        "label": "Reports",
        "description": "This dashboard was created as an example of the flexibility that this UI framework offers.",
        "to": "/DashboardReports"
      },
      {
        "label": "Real Estate",
        "description": "This dashboard example was created using only the available elements and components, no additional styles were written!",
        "to": "/DashboardRealEstate"
      },
      {
        "label": "Server Status",
        "description": "Yet another dashboard built using only the included elements and components.",
        "to": "/DashboardServerStatus"
      },
      {
        "label": "Projects",
        "description": "Example dashboard built for a projects related niche application.",
        "to": "/DashboardProjects"
      },
      {
        "label": "Helpdesk",
        "description": "Dashboard page that could be used for a helpdesk niche application.",
        "to": "/DashboardHelpdesk"
      },
      {
        "label": "Customers",
        "description": "Your application works with customers, then this is the dashboard for you.",
        "to": "/DashboardCustomers"
      },
      {
        "label": "Cryptocurrency",
        "description": "Crypto is the hot stuff right now. Here's a dashboard for it.",
        "to": "/DashboardCryptocurrency"
      },
      {
        "label": "CRM Manager",
        "description": "If you're building a CRM, you can start by using this dashboard example.",
        "to": "/DashboardCrmManager"
      },
      {
        "label": "Content Statistics",
        "description": "Dashboard example with lots of statistics cards.",
        "to": "/DashboardContent"
      }
    ],
    "to": "/DashboardDefault"
  },
  {
    "label": "Students",
    "icon": "PeopleIcon",
    "content": [
      {
        "label": "Calendar",
        "description": "Application example related to calendars and dates.",
        "to": "/ApplicationsCalendar"
      },
      {
        "label": "Chat",
        "description": "Example application that implements a full screen chat.",
        "to": "/ApplicationsChat"
      },
      {
        "label": "Contacts",
        "description": "Manage your contacts in style with this application example.",
        "to": "/ApplicationsContacts"
      },
      {
        "label": "File Manager",
        "description": "Manage your files with a beautiful user interface.",
        "to": "/ApplicationsFileManager"
      },
      {
        "label": "Mail",
        "description": "Mailboxes? No problem, we've got a started application layout for them.",
        "to": "/ApplicationsMail"
      },
      {
        "label": "Projects",
        "description": "Building a projects related application? Start from this layout.",
        "to": "/ApplicationsProjects"
      },
      {
        "label": "App Widgets",
        "description": "Examples of app snippets, like chat, file managers or tasks, that can be integrated in other elements, like card boxes.",
        "to": "/ApplicationsWidgets"
      }
    ],
    "to": "/StudentsQ"
  }
]`,
      (key, value) => {
        if (key === 'icon') {
          return iconsMap[value];
        } else {
          return value;
        }
      }
    )
  }
];

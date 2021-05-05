import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faHeadphones,
  faHome,
  faPlus,
  faShare,
  faShareSquare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const routes = [
  {
    id: 1,
    routeName: "Home",
    route: "/",
    icon: faHome,
  },
  {
    id: 2,
    routeName: "Add Books",
    route: "/addBook",
    icon: faPlus,
  },
  {
    id: 3,
    routeName: "Profile",
    route: "/profile",
    icon: faUser,
  },
];

export const options = [
  {
    id: 1,
    routeName: "Read",
    icon: faBookOpen,
  },
  {
    id: 2,
    routeName: "Listen",

    icon: faHeadphones,
  },
  {
    id: 3,
    routeName: "Share",
    icon: faShareSquare,
  },
];

import { faAddressCard, faBell, faCalendarCheck, faFileLines, faRectangleList, faStar, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBug,
  faCalculator,
  faChartPie,
  faCode,
  faDroplet,
  faGauge,
  faLayerGroup,
  faLocationArrow,
  faPencil,
  faPuzzlePiece,
  faRightToBracket,
  faDumbbell,
  faPlus,
  faListOl,
  faListUl,
  faDatabase,
  faTable,
  faBarsStaggered,
  faPersonWalking,
  faPeopleGroup,
  faChalkboardUser,
  faPersonChalkboard,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import React, { PropsWithChildren } from "react";
import { Badge } from "react-bootstrap";
import SidebarNavGroup from "@/components/Layout/Dashboard/Sidebar/SidebarNavGroup";
import SidebarNavItem from "@/components/Layout/Dashboard/Sidebar/SidebarNavItem";
import { getDictionary } from "@/locales/dictionary";
import { faBuromobelexperte } from "@fortawesome/free-brands-svg-icons";

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props;

  return <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>;
};

export default async function SidebarNav() {
  const dict = await getDictionary();
  return (
    <ul className="list-unstyled">
      <SidebarNavItem icon={faGauge} href="/">
        {dict.sidebar.items.dashboard}
        <small className="ms-auto">
          <Badge bg="info" className="ms-auto">
            NEW
          </Badge>
        </small>
      </SidebarNavItem>
      <SidebarNavItem icon={faCode} href="/pokemons">
        {dict.sidebar.items.sample}
        <small className="ms-auto">
          <Badge bg="danger" className="ms-auto">
            RUTINA
          </Badge>
        </small>
      </SidebarNavItem>
      <SidebarNavTitle>{dict.sidebar.items.crossfit}</SidebarNavTitle>

      <SidebarNavGroup toggleIcon={faBarsStaggered} toggleText={dict.sidebar.items.my_data}>
        <SidebarNavItem icon={faPeopleGroup} href="#">
          {dict.sidebar.items.participants}
        </SidebarNavItem>
        <SidebarNavItem icon={faPersonChalkboard} href="#">
          {dict.sidebar.items.instructors}
        </SidebarNavItem>
        <SidebarNavItem icon={faDumbbell} href="#">
          {dict.sidebar.items.exercises}
        </SidebarNavItem>
        <SidebarNavItem icon={faListUl} href="#">
          {dict.sidebar.items.steps}
        </SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem href="#" icon={faPersonWalking}>
        {dict.sidebar.items.routines}
      </SidebarNavItem>
      <SidebarNavItem href="#" icon={faCalendarCheck}>
        {dict.sidebar.items.programs}
      </SidebarNavItem>

      {/* <SidebarNavTitle>{dict.sidebar.items.components}</SidebarNavTitle>

      <SidebarNavGroup toggleIcon={faDumbbell} toggleText={dict.sidebar.items.base}>
        <SidebarNavItem href="#">{dict.sidebar.items.accordion}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.breadcrumb}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.cards}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.carousel}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.collapse}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.list_group}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.navs}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.pagination}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.popovers}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.progress}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.scrollspy}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.spinners}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.tables}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.tabs}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.tooltips}</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavGroup toggleIcon={faLocationArrow} toggleText={dict.sidebar.items.buttons}>
        <SidebarNavItem href="#">{dict.sidebar.items.buttons}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.buttons_group}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.dropdowns}</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem icon={faChartPie} href="#">
        {dict.sidebar.items.charts}
      </SidebarNavItem>

      <SidebarNavGroup toggleIcon={faFileLines} toggleText={dict.sidebar.items.forms}>
        <SidebarNavItem href="#">{dict.sidebar.items.form_control}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.select}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.checks_and_radios}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.range}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.input_group}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.floating_labels}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.layout}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.validation}</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavGroup toggleIcon={faStar} toggleText={dict.sidebar.items.icons}>
        <SidebarNavItem href="#">{dict.sidebar.items.core_ui_icons}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.core_ui_icons_brand}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.core_ui_icons_flag}</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavGroup toggleIcon={faBell} toggleText={dict.sidebar.items.notifications}>
        <SidebarNavItem href="#">{dict.sidebar.items.alerts}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.badge}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.modals}</SidebarNavItem>
        <SidebarNavItem href="#">{dict.sidebar.items.toasts}</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem icon={faCalculator} href="#">
        {dict.sidebar.items.widgets}
        <small className="ms-auto">
          <Badge bg="info">NEW</Badge>
        </small>
      </SidebarNavItem>
*/}
      <SidebarNavTitle>{dict.sidebar.items.extras}</SidebarNavTitle>

      <SidebarNavGroup toggleIcon={faGear} toggleText={dict.sidebar.items.config}>
        <SidebarNavItem icon={faUser} href="login">
          {dict.sidebar.items.my_account}
        </SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem icon={faFileLines} href="#">
        {dict.sidebar.items.docs}
      </SidebarNavItem>
    </ul>
  );
}

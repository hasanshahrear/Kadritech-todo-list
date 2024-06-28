declare module "react-contextmenu" {
  import * as React from "react";

  interface ContextMenuProps {
    id: string;
    children: React.ReactNode;
  }

  export class ContextMenu extends React.Component<ContextMenuProps> {}

  interface ContextMenuTriggerProps {
    id: string;
    children: React.ReactNode;
    collect?: (props: any) => any;
    disable?: boolean;
    holdToDisplay?: number;
    renderTag?: React.ElementType;
    attributes?: { [key: string]: any };
  }

  export class ContextMenuTrigger extends React.Component<ContextMenuTriggerProps> {}

  interface MenuItemProps {
    attributes?: { [key: string]: any };
    data?: any;
    disabled?: boolean;
    divider?: boolean;
    onClick?: (event: React.MouseEvent, data: any, target: HTMLElement) => void;
    children?: React.ReactNode;
  }

  export class MenuItem extends React.Component<MenuItemProps> {}

  interface SubMenuProps {
    title: React.ReactNode;
    children: React.ReactNode;
    disabled?: boolean;
    hoverDelay?: number;
    rtl?: boolean;
    selected?: boolean;
  }

  export class SubMenu extends React.Component<SubMenuProps> {}
}

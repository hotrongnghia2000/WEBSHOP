import { useState } from "react";

// children là param đặc biệt, nó được truyền bằng cách bọc trong SidebarLinkGroup
// theo đó, ta có activeCondition là một props, children là một function trả về jsx, function này có 2 param là (handleClick, open)
// ta nhận function này từ children và truyền param vào function này, là handleClick và state open
const SidebarLinkGroup = ({ children, activeCondition }) => {
  // khi reload lại trang, chỉ expland 1 cái dropdown thỏa mãn đường dẫn
  const [open, setOpen] = useState(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
};

export default SidebarLinkGroup;

const Navbar = ( {bgColor, object1, object2 } ) => {
  return (
    <nav className={`${bgColor} w-full h-20 p-5 items-center justify-end gap-5 flex sticky top-0 z-10`}>
      {object1}
      {object2}
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { NavbarContentAtom } from '../atoms/navbarAtom/NavbarContentAtom';

export const Navbar = () => {
  return (
    <>
      {/* <nav className='hidden lg:flex gap-12'> */}
      <nav className='hidden  md:flex md:justify-around'>
        <NavbarContentAtom value='Title' />
        <NavbarContentAtom value='Genre' />
        <NavbarContentAtom value='Author' />
        <NavbarContentAtom value='Page' />
        <NavbarContentAtom value='Status' />
      </nav>
    </>
  );
};

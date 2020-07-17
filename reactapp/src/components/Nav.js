import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {Button, UncontrolledPopover, PopoverHeader, PopoverBody, ListGroup} from 'reactstrap'


function Navigation(props) {
  return (
        <div className="navbar">
        <Nav>
          <NavItem>
          <NavLink href="#"><img src="../img/logo.png" width="42" height="36" alt="" loading="lazy" /></NavLink>
          </NavItem>
          <NavItem>
          <NavLink style={{color: 'white'}} href="#">Last release</NavLink>
          </NavItem>
        </Nav>

        <Button href="#" className="ml-auto" id="PopoverLegacy" type="button">{props.numberOfMovies} films</Button>

        <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
        <PopoverHeader>Ma wishlist</PopoverHeader>
        <PopoverBody>
        <ListGroup className='list-group-flush'>
          {props.myWishList}
        </ListGroup>
        </PopoverBody>
      </UncontrolledPopover>
        </div>
  )
}

export {Navigation};
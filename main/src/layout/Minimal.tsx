import React from 'react'
import { Outlet } from 'react-router-dom';

type Props = {
    children?: React.ReactNode;
}

const Minimal = (props: Props) => {
  return (
    <div className='bg-surface font-body text-on-surface antialiased min-h-screen'>
        {props.children ? props.children : <Outlet />}
    </div>
  )
}

export default Minimal
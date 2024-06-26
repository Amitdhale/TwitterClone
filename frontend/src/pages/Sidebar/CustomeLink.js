import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

export default function CustomeLink({children,to,...props}) {
    let resolve = useResolvedPath(to);
    let match = useMatch({path:resolve.pathname,end:true});

  return (
    <div>
        <Link style={{
            textDecoration:'none',
            color:match ? 'var(--twitter-color)' :'black'
        }}
        to={to}
        {...props}
        >{children}
        </Link>
    </div>
  )
}

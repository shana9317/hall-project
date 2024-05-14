// import React from 'react';
// import { Outlet } from 'react-router-dom';

// const NoAppBarLayout = ({ children }) => {
//     return (
//         <div>
//             {children}
//             <Outlet />
//         </div>
//     );
// }

// export default NoAppBarLayout;
import React from 'react';

const NoAppBarLayout = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    );
}

export default NoAppBarLayout;

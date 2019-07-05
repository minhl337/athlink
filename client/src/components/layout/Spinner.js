import React, {Fragment} from "react";
import spinner from './spinner.gif';

export default ()=>(
    <Fragment>
        <img 
            scr={spinner}
            style={{width:'200px', margin:'auto',display:'block'}}
            alt='loading...' 
        />
    </Fragment>
);
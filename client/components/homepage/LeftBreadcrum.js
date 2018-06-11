import React from 'react';
import {Link} from 'react-router-dom';
class LeftBreadcrum extends React.Component {
   render () {
       return (
           <div className="row">
               <div className="col-md-12">
                   <ol className="breadcrumb">
                       <li><Link to="/">Home</Link></li>
                   </ol>
               </div>
           </div>
       )
   }
}
export default LeftBreadcrum;
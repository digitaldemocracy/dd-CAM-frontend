
function NavBar (props) {
  let buttons = Object.keys(props.config).map((row, index) => {
    return (
      <t>
        <button className="btn" onClick={() => props.setFilter(row)}>{row}</button>
        <t>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</t>
      </t>
      
    );
  });
 return (
 <nav>
       <ul>
          <button className="btn" onClick={() => props.setFilter("")}>No Filter</button>
          <t>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</t>
          {buttons}

       </ul>
 </nav>
 );
};

export default NavBar;
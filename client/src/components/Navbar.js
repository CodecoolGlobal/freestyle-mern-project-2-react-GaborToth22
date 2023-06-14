const Navbar = ({updatePage, logOut, users}) => {



    
return (
    <div className="container-fluid fixed-top" id="allNavCont">
        <div className="row" id="nawRow" >
            <div className="col-2 d-flex align-items-center justify-content-center" >
                <div className="navItem" onClick={() => updatePage("home")}>Home</div>
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center" >
                <div  className="navItem" onClick={() => updatePage("newPlanPage")}>New Plan</div>
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center" >
                <div  className="navItem" onClick={() => updatePage("myPlans")}>My Plans</div>
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center" >
                <div  className="navItem" onClick={() => updatePage("aboutUs")}>About Us</div>
            </div>
            <div className="col-2 "></div>
            <div className="col-2 d-flex align-items-center justify-content-center" >
            <div  className="navItem" onClick={() => logOut()}><img src="/images/logout.png" alt="logouticon" id="logoutIcon"></img>{users}</div>
            </div>
        </div>
    </div>
)
}

export default Navbar;
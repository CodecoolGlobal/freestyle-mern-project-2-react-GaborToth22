import './App.css';
import {useState, useEffect, useRef} from "react"
import Navbar from './components/Navbar';
import HomePage from './components/page/HomePage'
import MyPlansPage from './components/page/MyPlansPage';
import NewPlanPage from './components/page/NewPlanPage';
import AboutUsPage from './components/page/AboutUsPage';
import bcrypt from 'bcryptjs';
import SignIn from './components/page/signin';
import Login from './components/page/login';



   
   function App() {
     const [signClick, setSignClick] = useState(false)
     const [logedIn, setlogedIn] = useState("")
     const [page, setPage] = useState("home")
     const [loginedUser, setLogindUser] = useState("")

     const updatePage = (newPage) => {setPage(newPage)};
     const logOut = () => {setlogedIn(""); setLogindUser("")}
     
     //------------ -login function- ----------------------
     const emailInputRef = useRef();
     const passwordInput = useRef();
     
     const getLogindata = async (name) => {
       try {
         let res = await fetch(`http://localhost:3005/api/login/${name}`)
         let data = await res.json()
         console.log(data)
         return data
    } catch (err) {
      console.log(err)
    }
  }

  const loginClick = async (event) => {
    event.preventDefault()
    const email = emailInputRef.current.value;
    const password = passwordInput.current.value;
    const hashedPassword = bcrypt.hashSync(password, 10);
    if(email !== ""){
      let res = await getLogindata(email)
      bcrypt.compare(password, res, function (err, isMatch) {
        if (err) {
          throw err;
        } else if (!isMatch) {
          setlogedIn("false")
        } else {
          setLogindUser(email)
          setlogedIn("true")
        }
      })
    }else{
      setlogedIn("false")
    }
    

  }
  
  useEffect(()=>{
    console.log(loginedUser)
  })


  const signInClick = () => {
    setSignClick(true)
  }

  //-------------------------


  return (
    <div className="App">
      
      {
        logedIn === "true" ? <><Navbar updatePage={updatePage} logOut={logOut} users={loginedUser}/>
        {page === "home" ? <HomePage  users={loginedUser}/>
        : page === "newPlanPage" ? <NewPlanPage users={loginedUser}/>
        : page === "myPlans" ? <MyPlansPage users={loginedUser}/>
        : page === "aboutUs" ? <AboutUsPage users={loginedUser}/>
        : <HomePage/>}</> : logedIn === "false" ? <>
          {
            signClick ?
              <SignIn />
              :
              <div>
                Nem jó a felhasználónév/jelszó
                <Login clickEvent={loginClick}
                  refEmail={emailInputRef}
                  refPassword={passwordInput}
                  sigClick={signInClick} />
              </div>

          }</> :
          <>
            {
              signClick ?
                <SignIn />
                :
                <Login clickEvent={loginClick}
                  refEmail={emailInputRef}
                  refPassword={passwordInput}
                  sigClick={signInClick} />
            }
          </>

      }


    </div>
  );
}

export default App;

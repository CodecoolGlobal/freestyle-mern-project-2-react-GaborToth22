import Button from "../button";
import TextInput from "../textInput";
import { useEffect, useRef, useState } from 'react'
import bcrypt from 'bcryptjs';
import App from "../../App";

const SignIn = () => {
    const emailInputRef = useRef();
    const passwordInputOne = useRef();
    const passwordInputTwo = useRef();
    const [passChekc, setPassChekc] = useState("");
    const [signInCheck, setsignInCheck] = useState(false)
    const [signInOK, setSignInOK] = useState("")
    const [usernames, setUsernames] = useState([])
    const [usedUsername, setUsedUsername] = useState([])
    const [usernamCheck, setUsernamCheck] = useState(null)

    const postSigninData = async (sendData) => {
        try {
            let res = await fetch('http://localhost:3005/api/signin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendData),
            })
            let data = await res.json()
            console.log(data)
            setSignInOK("true")
        } catch (err) {
            console.log(err)
            setSignInOK("false")
        }
    }

    const fetchAllUsername = () => {
        return fetch('http://localhost:3005/api/signin/').then((res) => res.json())
    }


    const sendForm = (event) => {
        event.preventDefault()
        const passwordOne = passwordInputOne.current.value
        const passwordTwo = passwordInputTwo.current.value
        const username = emailInputRef.current.value
        if (passwordOne.length === 0) {

            setPassChekc("short")
        } else if (passwordOne === passwordTwo) {

            const hashedPass = bcrypt.hashSync(passwordOne, 10)
            setPassChekc("")
            let sending = { useName: username, pass: hashedPass }
            if (usedUsername.includes(username)) {
                console.log('valami')
                setUsernamCheck(false)
            } else {
                setUsernamCheck(true)
                postSigninData(sending)
            }

        } else {

            setPassChekc("notMatch")
        }



    }
    useEffect(() => {
        fetchAllUsername().then(
            (usedUsernames) => {
                setUsedUsername(usedUsernames)
                console.log(usedUsernames)
            })

    }, [])

    useEffect(() => {

        console.log(usernamCheck)

    })

    useEffect(() => {
        fetch('http://localhost:3005/api/signin')
            .then(res => res.json())
            .then(res => { setUsernames(res) })
            .catch(err => console.log(err))
    }, [passChekc])

    useEffect(() => {
        if (signInOK === "true") {
            console.log("asdf")
            setTimeout(() => {
                setSignInOK("")
                setsignInCheck(true)
            }, 2000)
        } else if (signInOK === "false") {
            setTimeout(() => {
                setSignInOK("")
            }, 2000)
        }
    }, [signInOK])


    const backClick = () => {
        setsignInCheck(true)
    }

    const userName = (event) => {
        event.preventDefault();
        console.log("asd")
        //console.log(emailInputRef.current.value)
    }

    return (
        <>
            {
                signInCheck ? <App /> :
                    <>
                        {
                            signInOK === "true" ? <>Regisztráció sikeres! Jelentkezzen be a főoldalon!</> : signInOK === "false" ?
                                <>
                                    <>Regisztrációja sikertelen próbálja újra!</>
                                    {
                                        passChekc === "short" ? <>Jelszó túl rövid</> : passChekc === "notMatch" ? <>Jelszó nem eggyezik meg!</> : <></>
                                    }
                                    {
                                        usernamCheck === true? <>Asd</> : <>A felhasználónév már foglalt!</>
                                    }
                                    <form //onSubmit={(event)=>sendForm(event)}
                                    >
                                        <div className="signinContent">
                                            
                                            <h5>Username</h5>
                                            <TextInput onChange={() => userName()}
                                                placeholderContent={"username"}
                                                rel={emailInputRef}
                                                name="username"
                                            />
                                        </div>
                                        <div className="signinContent">
                                            <h5>Password</h5>
                                            <TextInput placeholderContent={"password"} rel={passwordInputOne} name="pass" type={"password"}
                                            />
                                            <h5>Password again</h5>
                                            <TextInput placeholderContent={"password"} rel={passwordInputTwo} name="passagain" type={"password"}
                                            />
                                        </div>

                                        <Button content={"send"} onClick={(event) => sendForm(event)} type={"submit"}
                                        />
                                    </form>
                                    <div id="backLogin"> <Button content={"Back to Login"} onClick={() => backClick()} /></div>

                                </> :
                                <>
                                    {
                                        passChekc === "short" ? <>Jelszó túl rövid</> : passChekc === "notMatch" ? <>Jelszó nem eggyezik meg!</> : <></>
                                    }
                                    <form>
                                        <div className="signinContent">
                                            <h5>Username</h5>
                                            <TextInput placeholderContent={"username"} rel={emailInputRef}
                                            />
                                        </div>
                                        <div className="signinContent">
                                            <h5>Password</h5>
                                            <TextInput placeholderContent={"password"} rel={passwordInputOne} type={"password"}
                                            />
                                            <h5>Password again</h5>
                                            <TextInput placeholderContent={"password"} rel={passwordInputTwo} type={"password"}
                                            />
                                        </div>

                                        <Button content={"send"}
                                            onClick={(event) => sendForm(event)}
                                            type={"submit"}
                                        />
                                    </form>
                                    <div id="backLogin"> <Button content={"Back to Login"} onClick={() => backClick()} /></div>
                                </>
                        }

                    </>
            }


        </>
    )
}

export default SignIn;
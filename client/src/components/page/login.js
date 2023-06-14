import Button from "../button";
import TextInput from "../textInput";


const Login = ({ clickEvent, refEmail, refPassword, sigClick }) => {
   

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <div className="loginHeader"><h2>Log in</h2></div>
                        <div className="loginContainer">
                            <form>
                            <div className="loginContent">
                                <h5>Username</h5>
                                <TextInput placeholderContent={"username"} rel={refEmail}
                                />
                            </div>
                            <div className="loginContent">
                                <h5>Password</h5>
                                <TextInput placeholderContent={"password"} type="password" rel={refPassword}
                                />
                            </div>

                            <Button content={"login"} onClick={(event)=>clickEvent(event)} type={"submit"}
                            />
                            </form>
                           
                        </div>
                    </div>
                    <div className="col-2">
                        <div id="loginOr">or</div>
                    </div>
                    <div className="col-5">
                        <div className="loginHeader"><h2>Sign up</h2></div>
                        <div className="signContainer">
                            <div className="signContent">
                                <h5>Wellcome in our app!</h5>
                            </div>
                            <div className="signContent">
                                <h5>You can sign up <div id="signHere" onClick={sigClick}>here</div>.</h5>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login;
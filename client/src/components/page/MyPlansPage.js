import { useEffect, useState } from "react";

const MyPlansPage = ({ users }) => {

    const getuserData = (username) => {
        return fetch(`http://localhost:3005/api/logedInUser/${username}`).then((res) => res.json())
    }

    const [userdata, setUserData] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            getuserData(users).then((res) => {
                setUserData(res)
                console.log(res)
            })
        }, 4000)

    }, [])

    useEffect(() => {
        console.log(userdata)
        if (userdata !== null) {
            userdata[0].exsercises.map(exserciseTemplate => {
                console.log(exserciseTemplate.title)
                exserciseTemplate.exsercise.map((exsercise, i) => {
                    console.log(exsercise.name)
                    console.log(exsercise.values)
                })

            })
        }

    })
    return (
        <div className="container-fluid" id="myPlansCardsC">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10" >
                    {
                        userdata === null ? <div className="Loading" /> : userdata[0].exsercises.length === 0 ? <div id="emptyExList">Create your plan!</div> :

                            <div id="myExCardContainer">
                                {

                                    userdata[0].exsercises.map(exserciseTemplate => {
                                        return <div className="myExserciseCard">
                                            <div className="myExCTitle"><h2>{exserciseTemplate.title}</h2></div>
                                            <div className="innerMyExC">
                                                {
                                                    exserciseTemplate.exsercise.map((exsercise, i) => {
                                                        return <div className="container-fluid">
                                                            <div className="row">
                                                                <div className="col-3">
                                                                    <span>{exsercise.values[0]} X {exsercise.values[1]}</span>
                                                                </div>
                                                                <div className="col-9 innerExCard">
                                                                    {exsercise.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                    }
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    )
}

export default MyPlansPage;
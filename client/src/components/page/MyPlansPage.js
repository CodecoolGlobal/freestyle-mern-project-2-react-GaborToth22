import { useEffect, useState } from "react";

const MyPlansPage = ({ users }) => {

    const getuserData = (username) => {
        return fetch(`http://localhost:3005/api/logedInUser/${username}`).then((res) => res.json())
    }

    const [userdata, setUserData] = useState(null)

    useEffect(() => {
        getuserData(users).then((res) => {
            setUserData(res)
            console.log(res)
        })
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
                <div className="col-1">1</div>
                <div className="col-10" >
                    <div id="myExCardContainer">
                        {
                            userdata === null ? <></> :
                                userdata[0].exsercises.map(exserciseTemplate => {
                                    return <div className="myExserciseCard">
                                        <div>{exserciseTemplate.title}</div>
                                        <div>
                                            {
                                                exserciseTemplate.exsercise.map((exsercise, i) => {
                                                    return <><div>{exsercise.name}</div> <div>{exsercise.values[0]} X {exsercise.values[1]}</div></>
                                                })
                                            }
                                        </div>
                                    </div>
                                })
                        }
                    </div>
                </div>
                <div className="col-1">3</div>
            </div>
        </div>
    )
}

export default MyPlansPage;
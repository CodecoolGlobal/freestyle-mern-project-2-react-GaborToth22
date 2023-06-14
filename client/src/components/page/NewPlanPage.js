import { useEffect, useState } from "react";
import SearchExercise from "./SearchExercise"



const NewPlanPage = ({ users }) => {

  const patchExsercises = async (username, exsercise) => {
    try {
      const res = await fetch(`http://localhost:3005/api/exsercise/${username}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(exsercise)
      })
      let data = await res.json()
    } catch (err) {
      console.log(err)
    }

  }

  const findUser = async (username) => {
    try {
      const res = await fetch(`http://localhost:3005/api/logedInUser/${username}`)
      let data = await res.json()
      return data
    } catch (err) {
      console.log(err)
    }

  }


  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [search, setSearch] = useState("")
  const [selectedExercises, setSelectedExercises] = useState([])
  const [userData, setUserData] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", {
      method: 'GET',
      url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
      headers: {
        'X-RapidAPI-Key': '2c3e6dd434msh3b91c84b02da8c0p1d9e58jsn8dad30d84c8b', //2c3e6dd434msh3b91c84b02da8c0p1d9e58jsn8dad30d84c8b
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    })
      .then(res => res.json())
      .then(bodyParts => {
        setBodyParts(bodyParts);
        console.log(bodyParts);
        findUser(users).then((res) => {
          setUserData(res)
        })
      })
      .catch(err => console.log(err))
  }, [])

  const handleSearch = () => {
    if (search) {
      fetch("https://exercisedb.p.rapidapi.com/exercises", {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises',
        headers: {
          'X-RapidAPI-Key': '2c3e6dd434msh3b91c84b02da8c0p1d9e58jsn8dad30d84c8b', //2c3e6dd434msh3b91c84b02da8c0p1d9e58jsn8dad30d84c8b
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      })
        .then(res => res.json())
        .then(exercises => {
          let searchValue = exercises.filter((exercise) => exercise.name.toLowerCase().includes(search)
            || exercise.target.toLowerCase().includes(search)
            || exercise.equipment.toLowerCase().includes(search)
            || exercise.bodyPart.toLowerCase().includes(search));
          console.log(searchValue);
          setSearch("")
          setExercises(searchValue);

        })
        .catch(err => console.log(err))
    }
  }

  console.log(exercises);

  const handleBodyPartClick = (bodyPart) => {
    fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
      method: 'GET',
      url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
      headers: {
        'X-RapidAPI-Key': '2c3e6dd434msh3b91c84b02da8c0p1d9e58jsn8dad30d84c8b', //2c3e6dd434msh3b91c84b02da8c0p1d9e58jsn8dad30d84c8b
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    })
      .then(res => res.json())
      .then(bodyParts => {
        setExercises(bodyParts);
        console.log(bodyParts);
      })
      .catch(err => console.log(err))
  }
  const handleExerciseClick = (name) => { 
    if(selectedExercises === null){
      console.log('asd')
      setSelectedExercises([name]);
    }else{
      console.log('vava')
      setSelectedExercises((selectedExercises) => [...selectedExercises, name]);
    }
     }
  const handleRemove = (name) => { setSelectedExercises(selectedExercises.filter((exercise) => exercise !== name)); };
     useEffect(()=>{
      console.log(selectedExercises)
     })

  useEffect(() => {
    if(loading){
      setTimeout(() => {
        setSelectedExercises(null)
        setLoading(false)
      }, 2000)
    }
    
  }, [submitted])
  //Form function

  const sendForm = (e) => {
    e.preventDefault()
    let db = []
    let pre = [];
    let counter = 0
    let data = document.querySelectorAll('.newPlan-exercise input');
    data.forEach((val, i) => {
      counter++
      pre.push(val.value)
      if (counter === 2) {
        db.push(pre)
        pre = []
        counter = 0
      }
      console.log(selectedExercises)
    })
    console.log(e.target.title.value)
    let titleValue = ""
    if (e.target.title.value === "") {
      titleValue = "default"
    } else {
      titleValue = e.target.title.value
    }
    let res =
    {
      title: titleValue,
      exsercise: []
    }

    selectedExercises.forEach((value, i) => {
      res.exsercise.push({
        name: value,
        values: db[i]
      })
    })
    const updateUser = userData
    updateUser[0].exsercises = [...updateUser[0].exsercises, res]
    console.log(updateUser)
    patchExsercises(users, updateUser).then(
      (res) => {
        console.log(res)
      }
    )
    setLoading(true)
    setSubmitted(true)
  }

  return (
    <div>
      <div className="container-fluid" id="exercises">
        <div className="row">
          <div className="col-1" ></div>
          {bodyParts.map((bodypart) => <div className="col-1" key={bodypart} onClick={() => handleBodyPartClick(bodypart)}><div className="allEx">{bodypart}</div></div>)}
          <div className="col-1"></div>
        </div>
      </div>

      <div className="container-fluid" id="exercisesSearch">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-3"></div>
          <div className="col-3"></div>
          <div className="col-3"><SearchExercise setSearch={setSearch} search={search} handleSearch={handleSearch} /></div>
        </div>
      </div>
      <div className="container-fluid" id="exercisesRes">
        <div className="row">
          <div className="col-6"><div id="newPlan">NEW WORKOUT
            {
              loading ? <div className="Loading" /> : <><form onSubmit={(e) => sendForm(e)}>
              <div id="formScroll">
                <input name="title" placeholder="add workout name"></input>
                {selectedExercises === null ? <div>Your plan saved!</div> :
                 selectedExercises.length !== 0 ? 
                 selectedExercises.map((exercise, i) => (<div key={i} className="newPlan-exercise">
                  <input type="number" className="input" min="1" defaultValue={1}></input>X<input type="number" className="input" min="1" defaultValue={1}></input><span className="exercise-name">{exercise}</span>
                  <button onClick={() => handleRemove(exercise)} className="remove-button">Remove</button></div>))
                : <></>
                }
              </div>
              <div id="exFormButton"><button type="submit">SEND</button></div>
            </form></>
            }
            
          </div>
          </div>
          <div className="col-3">{exercises.map((exercise, i) => { if (i % 2 === 0) { return <div key={i}><img className="exImg" src={exercise.gifUrl} alt="pic" onClick={() => handleExerciseClick(exercise.name)} /><div className="exTextTarget">{exercise.target}</div><div className="exText"><h4>{exercise.name}</h4></div></div> } })}</div>
          <div className="col-3">{exercises.map((exercise, i) => { if (i % 2 !== 0) { return <div key={i}><img className="exImg" src={exercise.gifUrl} alt="pic" onClick={() => handleExerciseClick(exercise.name)} /><div className="exTextTarget">{exercise.target}</div><div className="exText"><h4>{exercise.name}</h4></div></div> } })}</div>
        </div>
      </div>
    </div>
  )
}

export default NewPlanPage;
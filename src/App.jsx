import { Person, Button } from "./components/First"
import { useState,useEffect } from "react"

export default function App() {


  const [clickJ, setClickJ] = useState(0);
  const [clickD, setClickD] = useState(0);

  function handleSetClickJ() {
    setClickJ(clickJ + 1);
  }

  useEffect(()=>{console.log(clickJ)})

  return (
    <>
      <div className="flex justify-center mt-10 mx-30">
        <Person nombre="Javier" edad="33" bgColor="bg-amber-500" click={clickJ}/>

        <Person
          nombre="Dayan" edad="25" bgColor="bg-amber-400" click={clickD}/>

        <Person nombre="Karla" edad="28" bgColor="bg-amber-300"/>

      </div>

      <div className="flex gap-50 justify-center mt-5">
        <Button text={"Javier"} bgColor={"bg-amber-500"} onClick={handleSetClickJ}></Button>

        <Button
          text="Dayan"
          bgColor={"bg-amber-400"}
          onClick={() => setClickD(clickD + 1)}
        />
        <Button
          text="Karla"
          bgColor={"bg-amber-300"}
          onClick={() => alert('Avanzando...')}
        />


      </div>

    </>
  )
}
//quiero que te estudies los Componentes, Estados, Hooks principales y la relacion entre ellos
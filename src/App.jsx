import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {
  //state de pacientes
  const[pacientes, setPacientes] = useState([]);
  //state para edicion
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const obtenerLS = ()=>{
     const pacientesLS = JSON.parse(localStorage.getItem("pacientes")) ?? []; 
      setPacientes(pacientesLS);
    } 
    obtenerLS();

  }, []);

  useEffect(() => {
    console.log("componente listo o algo cambio en pacientes");
    //obtener los pacientes del localStorage
    localStorage.setItem("pacientes", JSON.stringify(pacientes));

  }, [pacientes])


  //useEffect para detectar cuando el state de pacientes cambia
  const eliminarPaciente=(id) => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(pacientesActualizados);
  }

  return (
    /*franmeg  <></> */
    <div className="container mx-auto mt-20">
     <Header/>
     <div className="mt-12 md:flex">
      
      <Formulario
      //pasar el state de pacientes
        pacientes={pacientes}
        //pasar el setPacientes
        setPacientes={setPacientes}

        paciente={paciente}
        setPaciente={setPaciente}
        
      />
      <ListadoPacientes
      //pasar el state de pacientes
        pacientes={pacientes}
        setPaciente={setPaciente}
        eliminarPaciente={eliminarPaciente}

      />
     </div>
     
    </div>  
  )
}

export default App

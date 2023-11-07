import { useState, useEffect } from "react";
import Error from "./Error";


const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  //state para validar
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }

  }, [paciente])



  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }

  const handleSumit = (e) => {
    //evitar que se recargue la pagina
    e.preventDefault();
    //validar formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      console.log("hay campos vacios");
      setError(true);
      return;

    }
    setError(false);

    //crear objeto de paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,

    }
    if (paciente.id) {
      //editar el registro 
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id ===
        paciente.id ? objetoPaciente : pacienteState);
      //actualizar el state
      setPacientes(pacientesActualizados);
      //limpiar el state
      setPaciente({});

    } else {
      //nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    console.log(objetoPaciente);

    //reiniciar el formulario
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");



  }


  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold ">Administralos</span>
      </p>
      <form
        onSubmit={handleSumit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        {error && <Error>Todos los campos son obligatorios</Error>}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota </label>
          <input id="mascota" type="text" placeholder="Nombre de la Mascota" className="border-2 w-full p-2 mt-2 placeholder:border-x-gray-400 rounded-md "
            value={nombre}
            //eventos de react
            onChange={(e) => setNombre(e.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input id="propietario" type="text" placeholder="Nombre del Propietario" className="border-2 w-full p-2 mt-2 placeholder:border-x-gray-400 rounded-md "
            value={propietario}
            //eventos de react
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
          <input id="email" type="email" placeholder="Email Contacto Propietario" className="border-2 w-full p-2 mt-2 placeholder:border-x-gray-400 rounded-md "
            //eventos de react
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
          <input id="alta" type="date" className="border-2 w-full p-2 mt-2 placeholder:border-x-gray-400 rounded-md "
            //eventos de react
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
          < textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder:border-x-gray-400 rounded-md "
            placeholder="Describe los Sintomas"
            //eventos de react
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}

          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-color"
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}

        />


      </form>
    </div>
  )

}


export default Formulario;


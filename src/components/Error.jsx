
const Error = ({children}) => {
  return (
    <div 
    className="bg-red-800 border-1-4 border-black text-white p-3 mb-3 text-center rounded-md font-bold uppercase">
    <p>{children} </p>
    </div>
  );
}

export default Error;

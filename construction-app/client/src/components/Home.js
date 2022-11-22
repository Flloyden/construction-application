import { useNavigate } from "react-router-dom";
import CheckWarranties from "./CheckWarranties";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className='p-7 text 2x1 font-semibold flex-1 h-screen'>
      <div className='justify-between flex gap-4'>
        <div className='border-2 border-gray-800  p-4 shadow-md flex rounded-md align-middle items-center justify-center w-1/5'><p><span className='font-bold'>Kommande jobb:</span> 26</p></div>
        <div className='border-2 border-gray-800 p-4 shadow-md flex rounded-md align-middle items-center justify-center w-1/5'><p><span className='font-bold'>Avslutade jobb:</span> 26</p></div>
        <div className='border-2 border-gray-800 p-4 shadow-md flex rounded-md align-middle items-center justify-center w-1/5'><p><span className='font-bold'>Antal kunder:</span> 26</p></div>
        <div className='border-2 border-gray-800 p-4 shadow-md flex rounded-md align-middle items-center justify-center w-1/5'><p><span className='font-bold'>Antal garantier:</span> 26</p></div>
        <div className='border-2 border-gray-800 p-4 shadow-md flex rounded-md align-middle items-center justify-center w-1/5'><p><span className='font-bold'>Antal semesterdagar:</span> 26</p></div>
      </div>
      <div className='grid grid-cols-2 gap-4 h-2/4 mt-4'>
        <div className='border-2 border-gray-800 shadow-md rounded-md'>
          <div className='flex w-full h-2/4 border-b-2 align-middle items-center justify-center hover:bg-gray-800 duration-300 hover:cursor-pointer hover:text-white'>Pågående jobb</div>
          <div className='flex w-full h-2/4 align-middle items-center justify-center hover:bg-gray-800  duration-300 hover:cursor-pointer hover:text-white'>Kommande jobb</div>
        </div>
        <div className='border-2 border-gray-800 shadow-md rounded-md align-middle items-center justify-center w-full h-full'>
          <CheckWarranties />
        </div>
      </div>
      <div className='mt-4 justify-between flex gap-4 text-white h-1/4'>
        <button className='bg-gray-800 rounded-md w-1/3 hover:opacity-80 duration-200'>Semester</button>
        <button className='bg-gray-800 rounded-md w-1/3 hover:opacity-80 duration-200' onClick={() => navigate("/skapakund")}>Ny kund</button>
        <button className='bg-gray-800 rounded-md w-1/3 hover:opacity-80 duration-200' onClick={() => navigate("/skapagaranti")}>Ny garanti</button>
      </div>
    </div>
  )
}

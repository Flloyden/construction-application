import { useState } from "react";
import CheckWarranties from "./CheckWarranties";
import Semester from "./Semester";
import CheckUpcomingWork from "./CheckUpcomingWork";
import CheckOngoingWork from "./CheckOngoingWork";
import AddCustomer from "./AddCustomer";
import AddWaranty from "./AddWarranty";

export default function Home() {
  const [isSemesterOpen, setIsSemesterOpen] = useState(false);
  const [newCustomerModalOpen, setNewCustomerModalOpen] = useState(false);
  const [newWarrantyModalOpen, setNewWarrantyModalOpen] = useState(false);

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
          <div className='flex w-full h-2/4 border-b-2 align-middle items-center justify-center hover:bg-gray-800 duration-300 hover:cursor-pointer hover:text-white'>
          <CheckOngoingWork/>
          </div>
          <div className='flex w-full h-2/4 align-middle items-center justify-center hover:bg-gray-800  duration-300 hover:cursor-pointer hover:text-white'>
          <CheckUpcomingWork />
          </div>
        </div>
        <div className='border-2 border-gray-800 shadow-md rounded-md align-middle items-center justify-center w-full h-full'>
          <CheckWarranties />
        </div>
      </div>
      <div className='mt-4 justify-between flex gap-4 text-white h-1/4'>
        <button className='bg-gray-800 rounded-md w-1/3 hover:opacity-80 duration-200' onClick={() => {setIsSemesterOpen(true)}}>Lägg in semester</button>
        <button className='bg-gray-800 rounded-md w-1/3 hover:opacity-80 duration-200' onClick={() => setNewCustomerModalOpen(true)}>Skapa ny kund</button>
        <button className='bg-gray-800 rounded-md w-1/3 hover:opacity-80 duration-200' onClick={() => setNewWarrantyModalOpen(true)}>Skapa ny garanti</button>
      </div>
      {isSemesterOpen && (
        <Semester
          setIsSemesterOpen={setIsSemesterOpen}
        />
      )}
      {newCustomerModalOpen && (
        <AddCustomer setIsModalOpen={setNewCustomerModalOpen} />
      )}
      {newWarrantyModalOpen && (
        <AddWaranty setIsModalOpen={setNewWarrantyModalOpen} />
      )}
    </div>
  )
}

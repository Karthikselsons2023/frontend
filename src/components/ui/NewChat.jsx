import React from 'react'
import { PencilLine } from 'lucide-react';

const NewChat = () => {
  
  return (
    <div className={`mycolorbg absolute top-[-70px] right-0 p-2 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out m-4`}>
      <PencilLine size={20} className='text-white size-6'/>
    </div>
  );
}

export default NewChat


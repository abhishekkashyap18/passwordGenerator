import { useState , useCallback, useEffect , useRef} from 'react'


function App() {
   const [length , setLength] = useState(8);
   const [number , setNumber] = useState(false);
   const [specialCharater , setSpecialCharacter] = useState(false);
   const [password , setPassword] = useState("");

  //  useRef hook
  const passwordRef = useRef(null);

  //  generating Random text 
  let passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; 

    if(number) str+="0123456789";
    if(specialCharater) str+="!@#$%^&*_+={}[]~`";

    for (let i = 1; i <= length; i++) {
      let char =  Math.floor(Math.random() * str.length + 1);
      
      pass += str.charAt(char);
       
    }
    setPassword(pass);


  } , [length , number , specialCharater , setPassword]);
 

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(()=>{
    passwordGenerator()
  }, [length , number , specialCharater, passwordGenerator ]);


  return (
    
     <div className=' w-full h-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
      <h1 className=' text-white text-center'>Password Generator</h1>
     <div className=' flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text" 
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      ref={passwordRef}
      readOnly
      />
      <button onClick={copyPasswordToClipBoard } className=' outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-500 active:bg-red-700'>copy</button>
     </div>

     <div className=' flex text-sm gap-x-2'>
      <div className='flex items-center ga[-x-1'>
        <input 
        type="range" 
        min={6}
        max={100}
        value={length}
        className=' cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label>length:{length}</label>

        
      </div>
      <div className='flex items-center gapx1]'>
      <input 
        type="checkbox" 
        className=' cursor-pointer'
         defaultChecked={number}
         id='numberInput'
        onChange={()=>{
          setNumber((prev)=>!prev);
        }}
        />
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className='flex items-center gapx1]'>
      <input 
        type="checkbox" 
        className=' cursor-pointer'
         defaultChecked={specialCharater}
         id='charInput'
        onChange={()=>{
          setSpecialCharacter((prev)=>!prev);
        }}
        />
        <label htmlFor="charInput">specialCharacter</label>
      </div>
     </div>

     </div>
     
  )
}

export default App

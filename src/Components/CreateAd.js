import React,{useState} from "react";
import { ethers } from "ethers";

const CreateAd = (props) => {
   
        const MigrationAdContract =  new ethers.Contract(props.contract, props.abi, props.provider);
   
    const [formInput, updateFormInput] = useState({size:0,reward:0 });
    const createMigrationAd = () => {
        let options = {value: ethers.utils.parseEther(formInput.reward)}
        MigrationAdContract.createMigrationAd(formInput.size, options );
    }
    return (
        <div className="flex flex-row justify-center">
      <div
          className=" flex pb-12"
          style={{ margin: '0 auto' }}
        >
      <input 
          placeholder="Migration Size"
          className="mt-8 border rounded p-4"
          style={{flex:1,display:"flex", width:"75%",marginLeft:"15px"}}
          onChange={e => updateFormInput({ ...formInput, size: e.target.value })}
        />
        <input
          placeholder="filcoin Reward"
          className="mt-2 border rounded p-4"
          style={{flex:1,display:"flex", width:"75%",marginLeft:"15px"}}
          onChange={e => updateFormInput({ ...formInput, reward: e.target.value })}
        />
           <button onClick={()=> {createMigrationAd()}}  className="font-bold mt-4 btn-info btn mx-5 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create Migration Ad
        </button>
      </div>
      </div>
    )
}
export default CreateAd;
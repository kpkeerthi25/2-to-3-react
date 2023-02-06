import React,{useEffect, useState} from "react";
import { ethers } from "ethers";
import AdTile from "./AdTile";

const Ad = (props) => {
    
    const [ads, setAds] = useState();
    useEffect(()=> {
        const MigrationAdContract =  new ethers.Contract(props.contract, props.abi, props.provider);
        MigrationAdContract.get_myAds().then((data)=>setAds(data));
        console.log("ad screen")
    },[])
    return (
            <div class="row row-cols-1 m-4">
            {
               ads && ads.map((data)=>(
                  <AdTile data={data}
                            />
                ))
             
        }
          </div>
    )
}

export default Ad;
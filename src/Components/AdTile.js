import React, { useState } from "react";
import useDrivePicker from "react-google-drive-picker";
import axios from "axios";

const AdTile = (props) => {
    const [openPicker, data, authResponse] = useDrivePicker();
    const [fileids,setFileIds] = useState('');
    const handleOpenPicker = () => {
        openPicker({
            clientId: "",
            developerKey: "",
            viewId: "DOCS",
            supportDrives: true,
            multiselect: true,
            viewMimeTypes: true,
            callbackFunction: (data) => { data.docs.map((i)=>{setFileIds(i.id)}) }
            // customViews: customViewsArray, // custom view
        });
    };

    const callMigrationEndpoint = async(url) =>{
        console.log(url);
        axios.get(url,{headers: {"Access-Control-Allow-Origin": "*"}}).then(console.log("hit endpoint completed"))
        .catch(err=> console.log(err));
    }

    const [authUrl, setAuthUrl] = useState('');
    return (
        <div class="px-3 py-4">
            <div class={`col card ${!props.data.isRewardClaimed ? 'border-warning' : 'border-success'}`} style={{ maxWidth: "50%" }} >
                <h5 class="card-header b">Ad #{parseInt(props.data.adId, 16)}</h5>
                <div class="card-body">
                    <p> Approx Size: {Number(props.data.size)} Mb</p>
                    <p> Reward: {Number(props.data.reward) / 10 ** 18} </p>
                    <p > isAddClaimed : {Number(props.data.providerId) == 0 ? "false" : Number(props.data.providerId)}</p>
                    {
                        props.data.isRewardClaimed ? (
                            <div>
                                <p> dealId : {Number(props.data.dealId)}</p>
                                <p> pieceCid: {props.data.cid}
                                </p>
                            </div>
                        ) : <div></div>
                    }
                    {
                        Number(props.data.providerId) != 0 && !props.data.isRewardClaimed  ? (
                            <div>
                                {
                                    fileids.length==0?
                                    <button className="font-bold btn-info btn mx-5 "  onClick={() => handleOpenPicker()}>Select files</button>:
                                    <p>fileId: {fileids}</p>
                                }
                                <p>authUrl: {props.data.authUrl}</p>
                                <button className="font-bold btn-info btn mx-5 " onClick={()=>{callMigrationEndpoint(props.data.authUrl)} }> submit </button>
                            </div>
                        ) : <div></div>
                    }

                </div>
            </div>
        </div>

    )
}

export default AdTile;
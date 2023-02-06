import React, { useState, useEffect } from 'react'
import CustomNavbar from './Navbar'
import { Route, BrowserRouter as Router, Link, Routes } from 'react-router-dom'
import Ad from './Ad'
import CreateAd from './CreateAd'
import MigrationAdABI from '../Contracts/MigrationAd.json'
import { ethers } from "ethers";
import useDrivePicker from "react-google-drive-picker";
import { useGoogleLogin } from '@react-oauth/google';
import { Axios } from 'axios';

const Home = () => {
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGoogleAuth, setGoogleAuth] = useState(null);
  const MigrationAdContract = '0xe7500654f949D1e5C0254f1DE04fdb5863A14f91'


  useEffect(() => {
    if (signer != null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    console.log("isAuth triggered ::" + isAuthenticated)
  }, [signer]);

  const login = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    setSigner(signer);
    setProvider(provider);
    console.log(signer);
  }

  const logout = async () => {
    setSigner(null);
  }

  const googleLogin = useGoogleLogin({
    onSuccess: codeResponse => {console.log(codeResponse);setGoogleAuth(codeResponse.code)},
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/drive.readonly'
  });

  const [openPicker, data, authResponse] = useDrivePicker();
  const [user, setUser] =  useState(null);
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: "",
      developerKey: "",
      viewId: "DOCS",
      supportDrives: true,
      multiselect: true,
      viewMimeTypes: true,
      callbackFunction: (data) => {console.log(data); setUser(data);}
      // customViews: customViewsArray, // custom view
    });
  };

  return (
    <div>
      <div>
        <CustomNavbar
          isAuthenticated={isAuthenticated}
          login={login}
          logout={logout}  //TODO
          key={isAuthenticated}
        />
      </div>


      <div>
        <Router>
          <div>
            <nav className="px-3 " style={{ marginBottom: '30px' }}>
              <div className="flex mt-4 ">
                <Link to={{ pathname: '/' }}>
                  <a className="mx-4 text-info ">Home</a>
                </Link>
                <Link to={{ pathname: '/create' }}>
                  <a className="mx-4 text-info">Create Ad</a>
                </Link>
                <Link to={{ pathname: '/view' }}>
                  <a className="mx-4 text-info">view Ads</a>
                </Link>
                <Link to={{ pathname: '/search' }}>
                  <a className="mx-4 text-info">search Ad</a>
                </Link>
              </div>
            </nav>
            <hr></hr>
          </div>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <div>
                    <h1>logged in </h1>
                  </div>
                ) : (
                  <div>
                    <h1>not logged in</h1>
                  </div>
                )
              }
            />
            <Route
              path="/create"
              element={
                isAuthenticated ? (
                  <CreateAd contract={MigrationAdContract}  abi= {MigrationAdABI} provider ={signer}/>
                ) : (
                  <div>
                    <h1>not logged in</h1>{' '}
                  </div>
                )
              }
            />
            <Route
              path="/view"
              element={
                isAuthenticated ? (
                  <Ad contract={MigrationAdContract}  abi= {MigrationAdABI} provider ={signer}/>
                ) : (
                  <div>
                    <h1>not logged in</h1>{' '}
                  </div>
                )
              }
            />
            {/* <Route
              path="/search"
              element={
                isAuthenticated ? (
                  <SearchTrade add={user.get('ethAddress')}/>
                ) : (
                  <div>
                    <h1>not logged in</h1>{' '}
                  </div>
                )
              }
            /> */}
          </Routes>

        </Router>
      </div>
    </div>
  )
}

export default Home

import React, {useState} from 'react';
import { create } from 'ipfs-http-client';

function Manufacturer() {
  
    const [ipfsHash, setIpfsHash] = useState('');
  const [file, setFile] = useState(null);

  const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadToIPFS = async () => {
    if (!file) return;

    try {
      const result = await ipfs.add(file);
      setIpfsHash(result.cid.toString());
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadToIPFS}>Upload to IPFS</button>
      {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
    </div>
  );
}

export default Manufacturer 

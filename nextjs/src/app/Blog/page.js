"use client"
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [croppedImage, setCroppedImage] = useState('');
  const imageRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageLoaded = (image) => {
    imageRef.current = image;
  };

  const handleCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef.current,
        crop,
        'newFile.jpeg'
      );
      setCroppedImage(croppedImageUrl);
      setImage(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toDataURL('image/jpeg', (url) => {
        resolve(url);
      });
    });
  };

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, description, image }),
    });
    const newUser = await res.json();
    setUsers([...users, newUser]);
    setId('');
    setName('');
    setDescription('');
    setImage('');
    setSrc(null);
    setCroppedImage('');
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.description}</p>
            {user.image && (
              <Image width={60} height={60} src={user.image} alt={user.name} style={{ maxWidth: '100px' }} />
            )}
          </li>
        ))}
      </ul>
      <h2>Add a New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ID"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={handleImageLoaded}
            onComplete={handleCropComplete}
            onChange={(newCrop) => setCrop(newCrop)}
          />
        )}
        {croppedImage && (
          <div>
            <h3>Preview:</h3>
            <Image src={croppedImage} alt="Cropped Image" width={200} height={200} />
          </div>
        )}
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

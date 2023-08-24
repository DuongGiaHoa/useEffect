import React, {useEffect, useState} from 'react';
import axios from "axios";

const getPhotos = async (page) => {
  try {
    const response = await
      axios.get(`https://picsum.photos/v2/list?page=${page}&limit=10`);
    return response.data
  } catch (error) {
    console.log(error);
  }
}

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [nextPage, setNextPage] = useState(1);

  const handleLoadMorePhotos = async () => {
    const images = await getPhotos(nextPage);
    const newPhotos = [...photos, ...images]
    setPhotos(newPhotos);
    setNextPage(nextPage + 1);
  };

  useEffect(() => {
    handleLoadMorePhotos();
  }, []);

  return (
    <div>
      <div className='grid grid-cols-4 gap-5 p-5'>
        {
          photos.length > 0 && photos.map((item, index) => (
            <div
              key={item.id}
              className='p-3 bg-white shadow-md rounded-lg'>
              <img
                src={item.download_url}
                alt={item.author}
                className='w-full h-[200px] object-cover rounded-lg'/>

            </div>
          ))
        }
      </div>
      <div className='text-center'>
        <button onClick={handleLoadMorePhotos} className='inline-block px-8 py-4 bg-pink-300 text-white'>
          Load more
        </button>
      </div>
    </div>
  );
};

export default Photos;

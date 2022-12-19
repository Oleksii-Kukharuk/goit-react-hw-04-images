import { useState, useEffect } from 'react';
import { ImageGalleryItem } from 'components/ImageGallery/ImageGalleryItem/ImageGalleryItem';

import { getImeges } from 'services/Api/Api';
import { GalleryList } from './ImageGallery.styled';
import { Vortex } from 'react-loader-spinner';
import { Button } from 'components/Button/Button';
import { toast } from 'react-toastify';

export const ImageGallery = ({ searchQuery, onSelect }) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await getImeges(searchQuery, page);
        if (data.totalHits === 0) {
          toast('нема зображень, спробуй ще');
        }
        const totalPages = Math.round(data.total / 12);
        setPages(totalPages);
        setData(prevData => [...prevData, ...data.hits]);
      } catch (error) {
        setError('от халепа, додаток впав');
      } finally {
        setIsLoading(false);
      }
    }

    if (searchQuery) {
      fetchData();
      onQueryChange();
    }
  }, [searchQuery, page]);

  const onQueryChange = query => {
    setPage(1);
    setData([]);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      <GalleryList className="gallery">
        {data.map(({ webformatURL, largeImageURL, id }) => {
          return (
            <ImageGalleryItem
              key={id}
              smallImg={webformatURL}
              bigImg={largeImageURL}
              onSelect={onSelect}
            ></ImageGalleryItem>
          );
        })}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </GalleryList>
      {page < pages && <Button onClick={loadMore}></Button>}
      {isLoading && (
        <Vortex
          visible={true}
          height="300"
          width="300"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={['yellow', 'blue', 'yellow', 'blue', 'blue', 'yellow']}
        />
      )}
    </>
  );
};

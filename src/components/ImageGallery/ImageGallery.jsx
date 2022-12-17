import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGallery/ImageGalleryItem/ImageGalleryItem';

import { getImeges } from 'services/Api/Api';
import { GalleryList } from './ImageGallery.styled';
import { Vortex } from 'react-loader-spinner';
import { Button } from 'components/Button/Button';
import { toast } from 'react-toastify';

export class ImageGallery extends Component {
  state = {
    page: 1,
    pages: 0,
    data: [],
    isLoading: false,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const { page } = this.state;

    if (prevProps.searchQuery !== searchQuery) {
      this.setState({ page: 1, data: [] });
    }
    if (prevProps.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const data = await getImeges(searchQuery, page);
        if (data.totalHits === 0) {
          toast('нема зображень, спробуй ще');
        }
        const totalPages = Math.round(data.total / 12);
        this.setState({ pages: totalPages });
        this.setState(prevState => ({
          data: [...prevState.data, ...data.hits],
        }));
      } catch (error) {
        this.setState({ error: 'от халепа, додаток впав' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { error, isLoading, page, pages } = this.state;
    return (
      <>
        <GalleryList className="gallery">
          {this.state.data.map(({ webformatURL, largeImageURL, id }) => {
            return (
              <ImageGalleryItem
                key={id}
                smallImg={webformatURL}
                bigImg={largeImageURL}
                onSelect={this.props.onSelect}
              ></ImageGalleryItem>
            );
          })}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </GalleryList>
        {page < pages && <Button onClick={this.loadMore}></Button>}
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
  }
}

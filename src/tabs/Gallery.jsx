import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

import { Blocks } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export class Gallery extends Component {
  state = {
    gallery: [],
    query: '',
    page: 1,
    isVisible: false,
    error: '',
    isEmpty: false,
    isLoading: false,
  };

  getData = query => {
    this.setState({
      query,
      gallery: [],
      isVisible: false,
      page: 1,
      error: '',
      isEmpty: false,
    });
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      ImageService.getImages(query, page)
        .then(data => {
          if (data.photos.length === 0) {
            this.setState({ isEmpty: true });
            return;
          }
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...data.photos],
            isVisible: page < Math.ceil(data.total_results / data.per_page),
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(this.setState({ isLoading: false }));
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <>
        <SearchForm onSearch={this.getData} />
        {this.state.error && (
          <Text textAlign="center">
            ❌ Something went wrong - {this.state.error}
          </Text>
        )}
        {this.state.isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        <Blocks
          visible={this.state.isLoading}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
        <Grid>
          {this.state.gallery.map(image => {
            return (
              <GridItem key={image.id}>
                <CardItem color={image.avg_color}>
                  <img src={image.src.large} alt={image.alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>

        {this.state.isVisible && (
          <Button onClick={this.onLoadMore}>Load more</Button>
        )}
      </>
    );
  }
}

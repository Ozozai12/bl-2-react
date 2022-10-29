import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    gallery: [],
    query: '',
    page: 1,
  };

  getData = query => {
    this.setState({ query });
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query) {
      ImageService.getImages(query, page).then(data =>
        this.setState({ gallery: data.photos })
      );
    }
  }

  render() {
    return (
      <>
        <SearchForm onSearch={this.getData} />
        <Text />
        <Grid>
          <GridItem>
            <CardItem></CardItem>
          </GridItem>
        </Grid>
        <Button />
      </>
    );
  }
}

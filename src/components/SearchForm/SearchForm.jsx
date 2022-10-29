import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    query: '',
  };

  onHandleChange = event => {
    this.setState({ query: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSearch(this.state.query);
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.onSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          onChange={this.onHandleChange}
        />
      </SearchFormStyled>
    );
  }
}

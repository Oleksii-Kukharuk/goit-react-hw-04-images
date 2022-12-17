import React from 'react';
import { toast } from 'react-toastify';
import {
  SearchbarStyled,
  SearchForm,
  SearchButton,
  ButtonLabel,
  SearchInput,
} from './Searchbar.styled';

export class Searchbar extends React.Component {
  state = {
    querySearch: '',
  };

  onInputChange = e => {
    this.setState({ querySearch: e.target.value.toLowerCase() });
  };

  onInputSubmit = e => {
    e.preventDefault();

    if (this.state.querySearch.trim() === '') {
      toast.error('Пустий запит??!?! Серйозно??!');
      return;
    }

    this.props.onSubmit(this.state.querySearch);

    this.setState({ querySearch: '' });
  };

  render() {
    return (
      <SearchbarStyled>
        <SearchForm className="form" onSubmit={this.onInputSubmit}>
          <SearchButton type="submit" className="button">
            <ButtonLabel className="button-label">Search</ButtonLabel>
          </SearchButton>

          <SearchInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputChange}
            value={this.state.querySearch}
          />
        </SearchForm>
      </SearchbarStyled>
    );
  }
}
